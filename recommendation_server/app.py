from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise.dump import dump, load
from flask_cors import CORS, cross_origin
import json
import os
from dotenv import load_dotenv

script_dir = os.path.dirname(os.path.abspath(__file__))

root_dir = os.path.abspath(os.path.join(script_dir, '..'))

env_file_path = os.path.join(root_dir, '.env')

load_dotenv(env_file_path)

MONGO_URL = os.environ.get('MONGO_URL')


app = Flask(__name__)
CORS(app)


client = MongoClient(MONGO_URL)
db = client['test']
blogs_collection = db['blogs']
users_collection = db['users']

def get_blog_ids(user_id, page=1, page_size=10):
    loaded_model_tuple = load('model.dump')
    loaded_model = loaded_model_tuple[1]

    all_items = set(str(item['_id']) for item in blogs_collection.find())
    unrated_items = list(all_items)
    
    predictions = [(item_id, loaded_model.predict(user_id, item_id).est) for item_id in unrated_items]
    
    sorted_predictions = sorted(predictions, key=lambda x: x[1], reverse=True)
    
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    paginated_predictions = sorted_predictions[start_index:end_index]
    
    response = {'user_id': str(user_id), 'top_recommendations': []}
    for item_id, rating in paginated_predictions:
        response['top_recommendations'].append({'item_id': str(item_id), 'rating': rating})

    print(response)
    
    return json.dumps(response)


def train_model():
    user_item_rating_data = []

    for user in users_collection.find():
        user_id = str(user['_id'])
        user_interests = user.get('myInterests', [])
        following = user.get('following', [])
        articles_read = user.get('readArticles', [])
        articles_wrote = user.get('blogs', [])

        for blog in blogs_collection.find():
            item_id = str(blog['_id'])
            rating = 0

            if item_id in articles_read:
                rating += 1
            if item_id in articles_wrote:
                rating += 2
            if blog.get('tags') and any(tag in user_interests for tag in blog['tags']):
                rating += 0.5
            if item_id in following:
                rating += 0.5
            rating += blog.get('views', 0) * 0.1
            rating += blog.get('likesCount', 0) * 0.5

            user_item_rating_data.append({'user_id': user_id, 'item_id': item_id, 'rating': rating})

    reader = Reader(rating_scale=(0, 10))
    data = Dataset.load_from_df(pd.DataFrame(user_item_rating_data), reader)
    trainset, _ = train_test_split(data, test_size=0.2)
    model = SVD()
    model.fit(trainset)
    model_dump_file = 'model.dump'
    dump(model_dump_file, algo=model)
    return jsonify({'message': 'Model trained successfully'})

app = Flask(__name__)

@app.route('/get_blog_ids', methods=['GET'])
@cross_origin()
def get_blog_ids_route():
    user_id = request.args.get('user_id')
    page = request.args.get('page')
    page_size = request.args.get('page_size')
    if not user_id:
        return jsonify({'error': 'User ID parameter is missing'}), 400
    return get_blog_ids(user_id, int(page), int(page_size))

@app.route('/train_model', methods=['get'])
def train_model_route():
    return train_model()

if __name__ == '__main__':
    app.run(debug=True)

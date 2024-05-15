# BlogMinds

BlogMind where user can write blog using AI, as user type AI will suggest content to user, cover image is generated using ai, other images are also generated based on the content user can embed them into their article if they wish

for future, we are thinking of a chatbot also that chat with user to give information about our website

## Features

### AI-Powered Content Creation
- **AI Image Generation**: Generate stunning AI images directly within the editor by providing prompts.
- **Text Completion**: As you type, AI suggests content to help you craft your blog posts efficiently.
- **Sentence Completion**: Select any text and use AI to complete the sentence seamlessly.

### Enhanced Editing and Management
- **Drag and Drop Images**: Easily drag and drop images into your articles for a smooth editing experience.
- **Asset Folder**: Keep all your images safe and organized in the cloud with full Create, Read, Update, and Delete (CRUD) functionality.

### User Engagement and Interaction
- **Trending Section**: Discover the most interacted blogs in the trending section on the blog page.
- **Interactive Blog Page**: Each blog page supports comments and likes to foster community interaction.

### Advanced Search and Navigation
- **Search Functionality**: Effortlessly search for blogs and users to find the content you're interested in.
- **Infinite Scroll**: Enjoy a seamless browsing experience with infinite scroll on the blog page.

### Performance
- **Fast Performance**: Experience a really fast and responsive website, ensuring smooth navigation and interaction.

## Installation

To run BlogMind locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/aslezar/BlogMinds.git
    ```

2. Set Environment Variables:

    Create a file named `.env` in the root directory, and copy the contents from the `.env.example` provided in the repository folder. Customize the variables as needed.
    Explanation of each variable is provided in the .env.example itself.

    ```bash
    cp .env.example .env
    ```

    Create a file named `.env` in the client directory, and copy the contents from the `.env.example` provided in the repository folder. Customize the variables as needed.
    Explanation of each variable is provided in the .env.example itself.

    ```bash
    cp client/.env.example client/.env
    ```

3. Install server dependencies:

    ```bash
    npm install
    ```

4. Seed the Database with sample data using:

    ```bash
    npm run seeder
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

    The server will start on the default port 8000. If you change the default port, update it also in the `./client/src/api/index.ts`

6. Navigate to the client directory:

    ```bash
    cd client
    ```

7. Install client dependencies:

    ```bash
    npm install
    ```

8. Start the frontend:

    ```bash
    npm run dev
    ```

    The frontend will start on the default port 5173.

9. Open your browser and go to `http://localhost:5173` to experience BlogMind.

By following these steps, you'll have both the server and frontend components of BlogMind up and running locally. Setting environment variables ensures proper configuration of the server.

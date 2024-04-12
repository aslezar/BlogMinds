FROM node:20.12.0-alpine

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./
COPY client/package*.json ./client/

RUN npm install

# Copy app source code
COPY . .

RUN npm run seeder

# Exports
EXPOSE 8000

CMD ["npm","run","dev","&&","cd","client","&&","npm","run","dev"]
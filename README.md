[![CodeQL](https://github.com/igorradovanov/socket-sphere/actions/workflows/codeql.yml/badge.svg)](https://github.com/igorradovanov/socket-sphere/actions/workflows/codeql.yml)

# 🚀 Socket Sphere 🚀

## Real-Time Chat Application

This is a real-time chat application built with Express.js and Socket.IO.

## 📚 Features 📚

- Real-time communication
- Activity Detection
- Chat Groups
- Reply with AI
- AI Comprehension

## 🛠️ Setup 🛠️

1. Clone this repository: `git clone https://github.com/igorradovanov/socket-sphere.git`
2. Navigate into the directory: `cd socket-sphere`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open your browser and navigate to `http://localhost:3500`

## 📝 Usage 📝

Once the server is running, you can connect to it with any web browser. When a user connects or disconnects, a message will be logged to the console.

## 📖 Technologies Used 📖

- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [Helmet.js](https://helmetjs.github.io/)

## 🐳 Docker Setup 🐳

If you have Docker installed, you can use it to run the application in a containerized environment. Here are the steps:

1. Build the Docker image: `docker build -t socket-sphere .`
2. Run the Docker container: `docker run -p 3500:3500 socket-sphere`

The application will be accessible at `http://localhost:3500`.

Note: The `-t` flag in the `docker build` command is used to name the image, and the `-p` flag in the `docker run` command is used to map the port of the application inside the Docker container (3500) to a port on your machine (also 3500 in this case).



## 📄 License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

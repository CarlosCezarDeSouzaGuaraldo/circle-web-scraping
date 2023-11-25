# Circle Web Scraping

## Overview

Circle Web Scraping is a TypeScript-based web scraping service designed to automate specific actions on a website. It utilizes Puppeteer, a headless browser automation tool, to navigate through pages, interact with elements, and capture screenshots during the web scraping process.

### Video about the web scraping realised by the system
(upcoming)

## Getting Started

### Prerequisites

Before running the project, ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone git@github.com:CarlosCezarDeSouzaGuaraldo/circle-web-scraping.git
    ```
2. Navigate to the project directory:
    ```bash
    cd circle-web-scraping
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file using `template.env` as a reference and configure the required environment variables.

### Project Structure
* `src/`: Contains the source code of the web scraping service.
* `config/`: Holds configuration files, including the .env file.
* `assets/`: Stores generated screenshots.

### API Documentation

Visit the Swagger UI documentation at [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) when your server is running. This interactive interface allows you to interact with the API and understand how to make requests.

### Usage

Start the server in development mode:
```bash
npx nodemon --watch 'src/**/*.ts' --exec 'ts-node' server.ts
```
> This command uses **nodemon** to watch for changes in TypeScript files and automatically restarts the server.

The server will be running at http://localhost:3000 by default. You can make a GET request to the following endpoint:

* `http://localhost:3000/api/v1/web-scraping-checkout`

You can use your browser or any other tool capable of making HTTP requests to interact with the web scraping service.

```bash
# Example using cURL
curl http://localhost:3000/api/v1/web-scraping-checkout
```

###### Expected Response

If the request is made successfully, you can expect this kind of following JSON response:

```json
{
	"status": 200,
	"statusMessage": "success",
	"message": "Web scraping was successful.",
	"screenshot": {
		"file": "screenshot-2023-11-25-13h45m48s.png",
		"path": "assets/screenshots/screenshot-2023-11-25-13h45m48s.png"
	}
}
```

### Screenshot taken by system
(upcoming)

### Contributing

Feel free to contribute to the project by opening issues, submitting pull requests, or providing feedback.

Happy Web Scraping! :smile:

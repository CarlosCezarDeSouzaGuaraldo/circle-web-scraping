import swaggerUi from 'swagger-ui-express';
import path from 'path';
import config from './src/config/config'
import YAML from 'yamljs';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'API documentation for your project',
    },
    servers: [
        {
            url: `http://${config.HOST}:${config.PORT}`, // Update with your server URL
            description: 'Development server',
        },
    ],
};

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

export default {
    swaggerServe: swaggerUi.serve,
    swaggerSetup: swaggerUi.setup(swaggerDocument)
};

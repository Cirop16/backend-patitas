import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/adoptme';

if (!MONGO_URI) {
    console.error('Error: La variable MONGO_URI no está definida');
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB correctamente'))
.catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API AdoptMe',
            version: '1.0.0',
            description: 'Documentación de la API AdoptMe'
        },
    },
    apis: [`${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
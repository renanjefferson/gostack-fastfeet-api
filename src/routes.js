import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymenController from './app/controllers/DeliverymenController';

import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);

routes.put('/recipient/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', DeliverymenController.store);
routes.get('/deliverymen', DeliverymenController.index);
routes.post('/deliverymen/:id', DeliverymenController.update);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

export default routes;

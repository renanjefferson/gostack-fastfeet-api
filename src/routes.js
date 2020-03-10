import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymenController from './app/controllers/DeliverymenController';

import OrderController from './app/controllers/OrderController';

import FileController from './app/controllers/FileController';

import OpenDeliveriesController from './app/controllers/OpenDeliveriesController';

import CompletedDeliveriesController from './app/controllers/CompletedDeliveriesController';

import StartDeliveryController from './app/controllers/StartDeliveryController';

import EndDeliveryController from './app/controllers/EndDeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.put(
  '/deliveryman/:deliverymanId/start/:deliveryId/deliveries',
  StartDeliveryController.update
);

routes.put(
  '/deliveryman/:deliverymanId/end/:deliveryId/deliveries',
  upload.single('file'),
  EndDeliveryController.update
);

routes.get(
  '/deliveryman/:deliverymanId/deliveries/open',
  OpenDeliveriesController.show
);

routes.get(
  '/deliveryman/:deliverymanId/deliveries/completed',
  CompletedDeliveriesController.show
);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);

routes.put('/recipient/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', DeliverymenController.store);
routes.get('/deliverymen', DeliverymenController.index);
routes.put('/deliverymen/:id', DeliverymenController.update);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;

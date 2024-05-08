import express, { Router } from 'express';
import { createItem, readItems, updateItem, deleteItem } from '../controllers/itemsController';

const itemsRouter: Router = express.Router();

itemsRouter.post('/', createItem);
itemsRouter.get('/', readItems);
itemsRouter.put('/:id', updateItem);
itemsRouter.delete('/:id', deleteItem);

export default itemsRouter;
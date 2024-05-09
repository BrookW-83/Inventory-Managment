import express from 'express';
import { createShelf, readShelves, updateShelf, deleteShelf } from '../controllers/shelfController';

const shelfRouter = express.Router(); 

shelfRouter.post('/', createShelf);
shelfRouter.get('/', readShelves);
shelfRouter.put('/:id', updateShelf);
shelfRouter.delete('/:id', deleteShelf)

export default shelfRouter;
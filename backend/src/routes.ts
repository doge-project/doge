import { Router } from 'express';
import authMiddleware from './middleware/auth';
import {
  deleteAnimal,
  getAnimals,
  getAnimalsTipo,
  getAnimalsPaginated,
  getAnimalData,
  createAnimal,
  updateAnimal
} from './controllers/AnimalController';
import { register, authenticate } from './controllers/UserController';

const routes = Router();


routes.get('/getAnimals', getAnimals);
routes.get('/getAnimals/:tipo', getAnimalsTipo);
routes.get('/getAnimalsPaginated', getAnimalsPaginated);
routes.get('/getAnimalData/:id', getAnimalData);
routes.post('/register', register);
routes.post('/login', authenticate);

routes.post('/test', (req, res) => { //TODO: remove
  return res.json(req.body);
});

routes.use(authMiddleware); //! everything below this command requires auth header
routes.delete('/deleteAnimal/:id', deleteAnimal);
routes.post('/createAnimal', createAnimal);
routes.put('/updateAnimal/:id', updateAnimal);

export default routes;

/** TODO:
 * Split routes into folders
 * validate received json's
*/

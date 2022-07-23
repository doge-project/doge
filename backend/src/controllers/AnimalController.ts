import AnimalModel from '@models/Animal';
import { Request, Response } from 'express';

const Animal = AnimalModel;

export async function getAnimals(req: Request, res: Response) {
  const animals = await Animal.find();
  return res.json(animals);
}
export async function getAnimalsTipo(req: Request, res: Response) {
  const animals = await Animal.find({ tipo: req.params.tipo });
  return res.json(animals);
}
export async function getAnimalsPaginated(req: Request, res: Response) { //FIXME:
  //const { page = 1 } = req.query;

  //const animals = await Animal.paginate({}, { page, limit: 10 }); //TODO:
  const animals = await Animal.find();
  return res.json(animals);
}
export async function getAnimalData(req: Request, res: Response) {
  const animal = await Animal.findById(req.params.id);
  return res.json(animal);
}
export async function createAnimal(req: Request, res: Response) {
  const animal = await Animal.create(req.body);
  return res.json(animal);
}
export async function updateAnimal(req: Request, res: Response) {
  const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //? 'new: true' -> mongoose returns the updated doc
  return res.json(animal);
}
export async function deleteAnimal(req: Request, res: Response) {
  await Animal.findByIdAndRemove(req.params.id);
  return res.send();
}

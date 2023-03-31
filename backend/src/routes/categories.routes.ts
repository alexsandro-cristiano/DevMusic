import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ erro: "Category Already exists!" });
  }

  categoriesRepository.create({ name, description });
  response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.listAll();
  response.json(all);
});

export { categoriesRoutes };
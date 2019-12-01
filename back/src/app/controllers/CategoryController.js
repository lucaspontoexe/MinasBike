import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the category already exists
    const categoryAlreadyExists = await Category.findOne({
      where: { name: req.body.name },
    });
    if (categoryAlreadyExists) {
      return res.status(400).json({ error: 'category already exists' });
    }

    const category = await Category.create(req.body);
    return res.json(category);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the new category already exists
    const { name, description } = req.body;

    const categoryAlreadyExists = await Category.findOne({
      where: { name: req.body.name },
    });
    if (categoryAlreadyExists) {
      return res.status(400).json({ error: 'category already exists' });
    }
    const { id } = req.params;
    const category = await Category.findByPk(id);

    await category.update(req.body);

    return res.json({
      id,
      name,
      description,
    });
  }

  async delete(req, res) {
    const category = await Category.findByPk(req.params.id);

    await category.destroy();

    return res.json({ message: 'category deleted' });
  }
}

export default new CategoryController();

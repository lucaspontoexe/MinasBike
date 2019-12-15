import * as Yup from 'yup';
import { Op } from 'sequelize';
import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    // get by id
    const { id } = req.params;
    if (id) {
      try {
        const category = await Category.findOne({ where: { id } });
        return res.json(category);
      } catch (error) {
        return res.status(400).json({ error: 'invalid request parameters' });
      }
    }

    // get by field value. (returns a getAll if no queryParams are passed)
    const { name, description } = req.query;
    const queryParams = [];
    if (name) {
      queryParams.push({ name });
    }
    if (description) {
      queryParams.push({ description });
    }

    try {
      const category = await Category.findAll({
        where: { [Op.and]: queryParams },
      });
      return res.json(category);
    } catch (error) {
      return res.status(400).json({ error: 'invalid parameters' });
    }
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
    // check if the category already exists, and create
    const { name, description } = req.body;

    const categoryAlreadyExists = await Category.findOne({
      where: { name },
    });
    if (categoryAlreadyExists) {
      return res.status(400).json({ error: 'category already exists' });
    }

    const category = await Category.create({ name, description });
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
      where: { name },
    });
    if (categoryAlreadyExists) {
      return res.status(400).json({ error: 'category already exists' });
    }

    // check if id is valid and update
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      await category.update({ name, description });
      return res.json({
        id,
        name,
        description,
      });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }

  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      await category.destroy();
      return res.json({ message: 'category deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }
}

export default new CategoryController();

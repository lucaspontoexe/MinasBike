import * as Yup from 'yup';
import { Op } from 'sequelize';
import Product from '../models/Product';
import Category from '../models/Category';
import Provider from '../models/Provider';

class ProductController {
  async index(req, res) {
    // get by id
    const { id } = req.params;
    if (id) {
      try {
        const product = await Product.findOne({ where: { id } });
        return res.json(product);
      } catch (error) {
        return res.status(400).json({ error: 'invalid request parameters' });
      }
    }

    // get by field value. (returns a getAll if no queryParams are passed)
    const {
      name,
      brand,
      price,
      price_cost,
      code,
      quantity_per_unity,
      unity,
      id_provider,
      id_category,
    } = req.query;
    const queryParams = [];
    if (name) {
      queryParams.push({ name });
    }
    if (brand) {
      queryParams.push({ brand });
    }
    if (price) {
      queryParams.push({ price });
    }
    if (price_cost) {
      queryParams.push({ price_cost });
    }
    if (code) {
      queryParams.push({ code });
    }
    if (quantity_per_unity) {
      queryParams.push({ quantity_per_unity });
    }
    if (unity) {
      queryParams.push({ unity });
    }
    if (id_provider) {
      queryParams.push({ id_provider });
    }
    if (id_category) {
      queryParams.push({ id_category });
    }

    try {
      const product = await Product.findAll({
        where: { [Op.and]: queryParams },
      });
      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: 'invalid query parameters' });
    }
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      brand: Yup.string().required(),
      price: Yup.number().required(),
      price_cost: Yup.number().required(),
      code: Yup.number().required(),
      quantity_per_unity: Yup.number().required(),
      unity: Yup.string().required(),
      id_category: Yup.number().required(),
      id_provider: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the product already exists
    const {
      name,
      brand,
      price,
      price_cost,
      code,
      quantity_per_unity,
      unity,
      id_provider,
      id_category,
    } = req.body;

    const productAlreadyExists = await Product.findOne({
      where: { name },
    });
    if (productAlreadyExists) {
      return res.status(400).json({ error: 'product already exists' });
    }

    // check if provider and category exists
    if (!(await Provider.findByPk(id_provider))) {
      return res
        .status(400)
        .json({ error: 'selected provider does not exists' });
    }
    if (!(await Category.findByPk(id_category))) {
      return res
        .status(400)
        .json({ error: 'selected category does not exists' });
    }

    const product = await Product.create({
      name,
      brand,
      price,
      price_cost,
      code,
      quantity_per_unity,
      unity,
      id_provider,
      id_category,
    });
    return res.json(product);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string(),
      brand: Yup.string(),
      price: Yup.number(),
      price_cost: Yup.number(),
      code: Yup.number(),
      quantity_per_unity: Yup.number(),
      unity: Yup.string(),
      id_category: Yup.number(),
      id_provider: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the product already exists
    const {
      name,
      brand,
      price,
      price_cost,
      code,
      quantity_per_unity,
      unity,
      id_provider,
      id_category,
    } = req.body;

    if (name) {
      const productAlreadyExists = await Product.findOne({
        where: { name },
      });
      if (productAlreadyExists) {
        return res.status(400).json({ error: 'product already exists' });
      }
    }

    // check if provider and category exists
    if (id_provider) {
      if (!(await Provider.findByPk(id_provider))) {
        return res
          .status(400)
          .json({ error: 'selected provider does not exists' });
      }
    }
    if (id_category) {
      if (!(await Category.findByPk(id_category))) {
        return res
          .status(400)
          .json({ error: 'selected category does not exists' });
      }
    }

    // update
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (name) {
        await product.update({ name });
      }
      if (brand) {
        await product.update({ brand });
      }
      if (price) {
        await product.update({ price });
      }
      if (price_cost) {
        await product.update({ price_cost });
      }
      if (code) {
        await product.update({ code });
      }
      if (quantity_per_unity) {
        await product.update({ quantity_per_unity });
      }
      if (unity) {
        await product.update({ unity });
      }
      if (id_provider) {
        await product.update({ id_provider });
      }
      if (id_category) {
        await product.update({ id_category });
      }

      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      return res.json({ message: 'product deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }
}

export default new ProductController();

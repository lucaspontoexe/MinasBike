import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import Provider from '../models/Provider';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll();
    return res.json(products);
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
    const productAlreadyExists = await Product.findOne({
      where: { name: req.body.name },
    });
    if (productAlreadyExists) {
      return res.status(400).json({ error: 'product already exists' });
    }

    // check if provider and category exists
    const { id_category, id_provider } = req.body;
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

    const product = await Product.create(req.body);
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
    if (req.body.name) {
      const productAlreadyExists = await Product.findOne({
        where: { name: req.body.name },
      });
      if (productAlreadyExists) {
        return res.status(400).json({ error: 'product already exists' });
      }
    }

    // check if provider and category exists
    const { id_category, id_provider } = req.body;

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

    const { id } = req.params;
    const product = await Product.findByPk(id);

    const {
      name,
      brand,
      price,
      price_cost,
      code,
      quantity_per_unity,
      unity,
    } = await product.update(req.body);

    return res.json({
      id,
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
  }

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(400).json({ error: 'product do not exists' });
    }

    await product.destroy();

    return res.json({ message: 'product deleted' });
  }
}

export default new ProductController();

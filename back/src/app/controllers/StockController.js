import * as Yup from 'yup';
import { Op } from 'sequelize';
import Stock from '../models/Stock';
import Product from '../models/Product';

class StockController {
  async index(req, res) {
    // get by id
    const { id } = req.params;
    if (id) {
      try {
        const stock = await Stock.findOne({ where: { id } });
        return res.json(stock);
      } catch (error) {
        return res.status(400).json({ error: 'invalid request parameters' });
      }
    }

    // get by field value. (returns a getAll if no queryParams are passed)
    const { restock, id_product } = req.query;
    const queryParams = [];
    if (restock) {
      queryParams.push({ restock });
    }
    if (id_product) {
      queryParams.push({ id_product });
    }

    try {
      const stock = await Stock.findAll({
        where: { [Op.and]: queryParams },
      });
      return res.json(stock);
    } catch (error) {
      return res.status(400).json({ error: 'invalid query parameters' });
    }
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      current_qty: Yup.number().required(),
      minimum_qty: Yup.number().required(),
      maximum_qty: Yup.number().required(),
      restock: Yup.boolean().required(),
      id_product: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the stock already exists
    const {
      id_product,
      current_qty,
      minimum_qty,
      maximum_qty,
      restock,
    } = req.body;

    if (await Stock.findOne({ where: { id_product } })) {
      return res
        .status(400)
        .json({ error: 'stock for the selected product already exists' });
    }

    // check if the product exists
    if (!(await Product.findByPk(id_product))) {
      return res.status(400).json({ error: 'selected product not found' });
    }

    const stock = await Stock.create({
      current_qty,
      minimum_qty,
      maximum_qty,
      restock,
      id_product,
    });
    return res.json(stock);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      current_qty: Yup.number(),
      minimum_qty: Yup.number(),
      maximum_qty: Yup.number(),
      restock: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the product and stock already exists
    const { id } = req.params;
    const { current_qty, minimum_qty, maximum_qty, restock } = req.body;

    // check if id is valid and update
    try {
      const stock = await Stock.findByPk(id);
      if (current_qty) {
        await stock.update({ current_qty });
      }
      if (minimum_qty) {
        await stock.update({ minimum_qty });
      }
      if (maximum_qty) {
        await stock.update({ maximum_qty });
      }
      if (restock) {
        await stock.update({ restock });
      }
      return res.json(stock);
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }

  async delete(req, res) {
    try {
      const stock = await Stock.findByPk(req.params.id);
      await stock.destroy();
      return res.json({ message: 'stock deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }
}

export default new StockController();

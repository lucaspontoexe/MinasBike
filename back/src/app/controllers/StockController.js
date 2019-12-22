import * as Yup from 'yup';
import Stock from '../models/Stock';
import Product from '../models/Product';

class StockController {
  async index(req, res) {
    const stocks = await Stock.findAll();
    return res.json(stocks);
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
    const { id_product } = req.body;

    if (await Stock.findOne({ where: { id_product } })) {
      return res
        .status(400)
        .json({ error: 'stock for the selected product already exists' });
    }

    // check if the product exists
    if (!(await Product.findByPk(id_product))) {
      return res.status(400).json({ error: 'selected product not found' });
    }

    const stock = await Stock.create(req.body);
    return res.json(stock);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      current_qty: Yup.number(),
      minimum_qty: Yup.number(),
      maximum_qty: Yup.number(),
      restock: Yup.boolean(),
      id_product: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the product and stock already exists
    const { id_product } = req.body;
    const { id } = req.params;

    if (id_product) {
      if (!(await Product.findByPk(id_product))) {
        return res.status(400).json({ error: 'selected product not found' });
      }

      if (await Stock.findOne({ where: { id_product } })) {
        if (!(id === id_product)) {
          return res
            .status(400)
            .json({ error: 'stock for the selected product already exists' });
        }
      }
    }

    const stock = await Stock.findByPk(id);

    const {
      current_qty,
      minimum_qty,
      maximum_qty,
      restock,
    } = await stock.update(req.body);

    return res.json({
      id,
      current_qty,
      minimum_qty,
      maximum_qty,
      restock,
      id_product,
    });
  }

  async delete(req, res) {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) {
      res.status(400).json({ error: 'stock do not exists' });
    }

    await stock.destroy();
    return res.json({ message: 'stock deleted' });
  }
}

export default new StockController();

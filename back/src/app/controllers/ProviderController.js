import * as Yup from 'yup';
import { Op } from 'sequelize';
import Provider from '../models/Provider';
import Location from '../models/Location';

class ProviderController {
  async index(req, res) {
    // get by id
    const { id } = req.params;
    if (id) {
      try {
        const provider = await Provider.findOne({ where: { id } });
        return res.json(provider);
      } catch (error) {
        return res.status(400).json({ error: 'invalid request parameters' });
      }
    }

    // get by field value. (returns a getAll if no queryParams are passed)
    const { name, contact_name, email, phone, id_location } = req.query;
    const queryParams = [];
    if (name) {
      queryParams.push({ name });
    }
    if (contact_name) {
      queryParams.push({ contact_name });
    }
    if (email) {
      queryParams.push({ email });
    }
    if (phone) {
      queryParams.push({ phone });
    }
    if (id_location) {
      queryParams.push({ id_location });
    }

    try {
      const provider = await Provider.findAll({
        where: { [Op.and]: queryParams },
      });
      return res.json(provider);
    } catch (error) {
      return res.status(400).json({ error: 'invalid query parameters' });
    }
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      contact_name: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.number().required(),
      id_location: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the Provider already exists
    const { name, contact_name, email, phone, id_location } = req.body;

    const providerAlreadyExists = await Provider.findOne({
      where: { name },
    });
    if (providerAlreadyExists) {
      return res.status(400).json({ error: 'Provider already exists' });
    }
    // check the location

    if (!(await Location.findByPk(id_location))) {
      return res.status(400).json({ error: 'no location for this selection' });
    }

    const provider = await Provider.create({
      name,
      contact_name,
      email,
      phone,
      id_location,
    });
    return res.json(provider);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      name: Yup.string(),
      contact_name: Yup.string(),
      email: Yup.string(),
      phone: Yup.number(),
      id_location: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the new Provider already exists
    const { name, contact_name, email, phone, id_location } = req.body;

    if (name) {
      const providerAlreadyExists = await Provider.findOne({
        where: { name },
      });
      if (providerAlreadyExists) {
        return res.status(400).json({ error: 'Provider already exists' });
      }
    }

    // check the location
    if (!(await Location.findByPk(id_location))) {
      return res.status(400).json({ error: 'no location for this selection' });
    }

    try {
      const { id } = req.params;
      const provider = await Provider.findByPk(id);

      if (name) {
        await provider.update({ name });
      }
      if (contact_name) {
        await provider.update({ contact_name });
      }
      if (email) {
        await provider.update({ email });
      }
      if (phone) {
        await provider.update({ phone });
      }
      if (id_location) {
        await provider.update({ id_location });
      }

      return res.json(provider);
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }

  async delete(req, res) {
    try {
      const provider = await Provider.findByPk(req.params.id);
      await provider.destroy();
      return res.json({ message: 'category deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }
}

export default new ProviderController();

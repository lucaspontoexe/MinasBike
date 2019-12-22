import * as Yup from 'yup';
import { Op } from 'sequelize';
import Location from '../models/Location';

class LocationController {
  async index(req, res) {
    // get by id
    const { id } = req.params;
    if (id) {
      try {
        const location = await Location.findOne({ where: { id } });
        return res.json(location);
      } catch (error) {
        return res.status(400).json({ error: 'invalid request parameters' });
      }
    }

    // get by field value. (returns a getAll if no queryParams are passed)
    const { city, state } = req.query;
    const queryParams = [];
    if (city) {
      queryParams.push({ city });
    }
    if (state) {
      queryParams.push({ state });
    }

    try {
      const location = await Location.findAll({
        where: { [Op.and]: queryParams },
      });
      return res.json(location);
    } catch (error) {
      return res.status(400).json({ error: 'invalid query parameters' });
    }
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the location already exists
    const { city, state } = req.body;
    const locationAlreadyExists = await Location.findOne({
      where: { city },
    });
    if (locationAlreadyExists) {
      return res.status(400).json({ error: 'location already exists' });
    }

    const location = await Location.create({ city, state });
    return res.json(location);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      city: Yup.string(),
      state: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the new location already exists
    const { city, state } = req.body;

    if (city) {
      const locationAlreadyExists = await Location.findOne({
        where: { city },
      });
      if (locationAlreadyExists) {
        return res.status(400).json({ error: 'location already exists' });
      }
    }

    // set the fields and update
    try {
      const { id } = req.params;
      const location = await Location.findByPk(id);
      if (city) {
        await location.update({ city });
      }
      if (state) {
        await location.update({ state });
      }
      return res.json(location);
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }

  async delete(req, res) {
    try {
      const location = await Location.findByPk(req.params.id);
      await location.destroy();
      return res.json({ message: 'location deleted' });
    } catch (error) {
      return res.status(400).json({ error: 'invalid request parameters' });
    }
  }
}

export default new LocationController();

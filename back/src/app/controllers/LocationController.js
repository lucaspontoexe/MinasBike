import * as Yup from 'yup';
import Location from '../models/Location';

class LocationController {
  async index(req, res) {
    const locations = await Location.findAll();
    return res.json(locations);
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
    const locationAlreadyExists = await Location.findOne({
      where: { city: req.body.city },
    });
    if (locationAlreadyExists) {
      return res.status(400).json({ error: 'location already exists' });
    }

    const location = await Location.create(req.body);
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

    const locationAlreadyExists = await Location.findOne({
      where: { city: req.body.city },
    });
    if (locationAlreadyExists) {
      return res.status(400).json({ error: 'location already exists' });
    }
    const { id } = req.params;
    const location = await Location.findByPk(id);

    await location.update(req.body);

    return res.json({
      id,
      city,
      state,
    });
  }

  async delete(req, res) {
    const location = await Location.findByPk(req.params.id);

    if (!location) {
      res.status(400).json({ error: 'location do not exists' });
    }

    await location.destroy();

    return res.json({ message: 'location deleted' });
  }
}

export default new LocationController();

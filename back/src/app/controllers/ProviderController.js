import * as Yup from 'yup';
import Provider from '../models/Provider';
import Location from '../models/Location';

class ProviderController {
  async index(req, res) {
    const providers = await Provider.findAll();
    return res.json(providers);
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
    const providerAlreadyExists = await Provider.findOne({
      where: { name: req.body.name },
    });
    if (providerAlreadyExists) {
      return res.status(400).json({ error: 'Provider already exists' });
    }
    // check the location

    if (!(await Location.findByPk(req.body.id_location))) {
      return res.status(400).json({ error: 'no location for this selection' });
    }

    const provider = await Provider.create(req.body);
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
        where: { name: req.body.name },
      });
      if (providerAlreadyExists) {
        return res.status(400).json({ error: 'Provider already exists' });
      }
    }

    // check the location
    if (!(await Location.findByPk(id_location))) {
      return res.status(400).json({ error: 'no location for this selection' });
    }

    const { id } = req.params;
    const provider = await Provider.findByPk(id);

    await provider.update(req.body);

    return res.json({
      id,
      name,
      contact_name,
      email,
      phone,
      id_location,
    });
  }

  async delete(req, res) {
    const provider = await Provider.findByPk(req.params.id);

    if (!provider) {
      res.status(400).json({ error: 'provider do not exists' });
    }

    await provider.destroy();
    return res.json({ message: 'Provider deleted' });
  }
}

export default new ProviderController();

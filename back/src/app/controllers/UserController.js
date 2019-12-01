import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: 'no users' });
    }
  }

  async store(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(4)
        .required(),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the user email already exists
    const userAlreadyExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userAlreadyExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    // check all the fields requirements
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      password_confirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid fields' });
    }

    // check if the new user email already exists
    const user = await User.findByPk(req.userId);
    const { email, old_password, password } = req.body;

    if (email) {
      if (email !== user.email) {
        const userAlreadyExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (userAlreadyExists) {
          return res.status(400).json({ error: 'user already exists' });
        }
      }
    }

    // checks password
    try {
      if (password && !(await user.checkPassword(old_password))) {
        return res.status(401).json({ error: 'password does not match' });
      }
    } catch (error) {
      return res.status(400).json({ error: 'missing fields' });
    }

    const { id, nome } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
    });
  }
}

export default new UserController();

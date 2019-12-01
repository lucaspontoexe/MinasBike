import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: 'any existing user' });
    }
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const { email, old_password, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'user already exists' });
      }
    }

    if (password && !(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: 'password does not match' });
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

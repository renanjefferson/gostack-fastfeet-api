import * as Yup from 'yup';
import Deliverymen from '../models/Deliverymen';
import File from '../models/File';

class DeliverymenController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const deliverymanExist = await Deliverymen.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(400).json({ error: 'Entregador já existe.' });
    }

    const { id, name, email } = await Deliverymen.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverymen = await Deliverymen.findAll({
      attributes: ['id', 'name', 'email'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ deliverymen });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const deliveryman = await Deliverymen.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não existe.' });
    }

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const deliveryman = await Deliverymen.findByPk(req.params.id);

    await deliveryman.destroy();

    return res.json({ message: 'Entregador removido.' });
  }
}

export default new DeliverymenController();

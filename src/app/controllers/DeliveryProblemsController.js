import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliverymen from '../models/Deliverymen';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblems.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      where: {
        description: {
          [Op.ne]: null,
        },
      },
    });

    return res.json({ problems });
  }

  async show(req, res) {
    const { deliveryId } = req.params;

    const deliveryProblem = await DeliveryProblems.findByPk(deliveryId);

    if (!deliveryProblem) {
      return res
        .status(401)
        .json({ error: 'Encomenda com problema não foi encontrada.' });
    }

    return res.json({ deliveryProblem });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { deliveryId } = req.params;
    const { description } = req.body;

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(401).json({ error: 'Encomenda não foi encontrada' });
    }

    const problem = await DeliveryProblems.create({
      description,
      delivery_id: deliveryId,
    });

    return res.json({ problem });
  }

  async delete(req, res) {
    const { problemId } = req.params;

    const deliveryProblem = await DeliveryProblems.findByPk(problemId);

    if (!deliveryProblem) {
      return res
        .status(401)
        .json({ error: 'Encomenda com problema não foi encontrada.' });
    }

    const order = await Order.findByPk(deliveryProblem.delivery_id);

    const deliveryman = await Deliverymen.findByPk(order.deliveryman_id);

    await order.update({
      canceled_at: new Date(),
    });

    order.save();

    await Queue.add(CancellationMail.key, { order, deliveryman });

    return res.json({ message: 'Encomenda cancelada.' });
  }
}

export default new DeliveryProblemsController();

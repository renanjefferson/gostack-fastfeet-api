import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import Deliverymen from '../models/Deliverymen';
import Order from '../models/Order';

import OrderMail from '../jobs/OrderMail';
import Queue from '../../lib/Queue';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Destinatário não foi encontrado' });
    }

    const deliveryman = await Deliverymen.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Entregador não foi encontrado' });
    }

    const order = await Order.create({ recipient_id, deliveryman_id, product });

    await Queue.add(OrderMail.key, { recipient, deliveryman, product });

    return res.json({ order });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const orders = await Order.findAll({
      attributes: ['id', 'recipient_id', 'deliveryman_id', 'product'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'postcode', 'street', 'number', 'city', 'state'],
        },
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json({ orders });
  }
}
export default new OrderController();

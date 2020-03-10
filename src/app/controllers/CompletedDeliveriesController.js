import { Op } from 'sequelize';
import Deliverymen from '../models/Deliverymen';
import Order from '../models/Order';

class CompletedDeliveriesController {
  async show(req, res) {
    const { page = 1 } = req.query;

    const { deliverymanId } = req.params;

    const deliveryman = await Deliverymen.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Entregador não foi encontrado.' });
    }

    const orders = await Order.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      where: {
        canceled_at: null,
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.ne]: null,
        },
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json({ orders });
  }
}

export default new CompletedDeliveriesController();

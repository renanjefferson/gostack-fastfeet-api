import Deliverymen from '../models/Deliverymen';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class OpenDeliveriesController {
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
        deliveryman_id: deliverymanId,
        canceled_at: null,
        end_date: null,
      },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'recipient_id',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postcode',
          ],
        },
      ],
    });

    return res.json({ orders });
  }
}

export default new OpenDeliveriesController();

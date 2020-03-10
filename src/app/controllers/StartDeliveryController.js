import * as Yup from 'yup';
import { Op } from 'sequelize';

import {
  parseISO,
  getHours,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Deliverymen from '../models/Deliverymen';
import Order from '../models/Order';

class StartDeliveryController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação.' });
    }

    const { start_date } = req.body;
    const { deliverymanId, deliveryId } = req.params;

    const deliveryman = await Deliverymen.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Entregador não foi encontrado.' });
    }

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(401).json({ error: 'Encomenda não foi encontrada.' });
    }

    const startDate = parseISO(start_date);
    const hourDate = getHours(startDate);

    if (!(isAfter(hourDate, 8) && isBefore(hourDate, 18))) {
      return res
        .status(401)
        .json({ error: 'Só é possível retirar das 8h às 18h.' });
    }

    const countDelivery = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });

    if (countDelivery > 5) {
      return res.status(401).json({
        error: 'Não é possível retirar mais de 5 encomendas por dia.',
      });
    }

    await delivery.update(req.body);

    return res.json({ delivery });
  }
}

export default new StartDeliveryController();

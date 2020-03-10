import Deliverymen from '../models/Deliverymen';
import Order from '../models/Order';
import File from '../models/File';

class EndDeliveryController {
  async update(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const deliveryman = await Deliverymen.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Entregador não foi encontrado.' });
    }

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(401).json({ error: 'Encomenda não foi encontrada.' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'Você deve enviar a imagem da assinatura.' });
    }

    const { filename: path, originalname: name } = req.file;

    const file = await File.create({ path, name });

    await delivery.update({
      end_date: new Date(),
      signature_id: file.id,
    });

    return res.json({ delivery });
  }
}
export default new EndDeliveryController();

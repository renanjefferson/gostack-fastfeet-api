import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .min(6)
        .required(),
      complement: Yup.string().min(30),
      state: Yup.string(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .result(400)
        .json({ error: 'Valide todos os campos obrigatórios.' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      postcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      postcode,
    });
  }
}

export default new RecipientController();

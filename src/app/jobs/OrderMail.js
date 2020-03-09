import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { recipient, deliveryman, product } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'order',
      context: {
        deliveryman_name: deliveryman.name,
        recipient_name: recipient.name,
        recipient_postcode: recipient.postcode,
        recipient_street: recipient.street,
        recipient_number: recipient.number,
        recipient_city: recipient.city,
        recipient_state: recipient.state,
        product,
      },
    });
  }
}

export default new OrderMail();

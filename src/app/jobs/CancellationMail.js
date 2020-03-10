import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliveryman, order } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Novo cancelamento',
      template: 'cancellation',
      context: {
        deliveryman: deliveryman.name,
        order_id: order.id,
      },
    });
  }
}

export default new CancellationMail();

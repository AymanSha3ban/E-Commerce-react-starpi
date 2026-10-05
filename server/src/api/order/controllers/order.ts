import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to create an order');
    }

    const { data } = ctx.request.body;

    try {
      const newOrder = await strapi.documents('api::order.order').create({
        data: {
          ...data,
          user: user.documentId,
        },
        status: 'published',
        populate: ['order_items.product', 'user']
      });
      
      // In Strapi 5, standard controller response format:
      return { data: newOrder };
    } catch (err: any) {
      return ctx.badRequest('Order creation failed', { error: err.message });
    }
  }
}));

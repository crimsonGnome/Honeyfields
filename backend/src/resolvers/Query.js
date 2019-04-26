const { forwardTo } = require('prisma-binding');
const { hasPermission, loggedIn } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  event: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  ordersConnection: forwardTo('db'),
  eventsConnection: forwardTo('db'),
  filters: forwardTo('db'),
  events: forwardTo('db'),
  me(parent, args, ctx, info) {
    //Check if there is a current user id
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    //Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    //Check if user jas permisson to query all Users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSOINUPDATE']);
    //Query All Users
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    //make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error(`You aren't logged in! `);
    }
    //query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    //Check if they have the persmisions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN'
    );

    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error(`You can't see this buddd`);
    }
    //return this order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    loggedIn(ctx.request.userId);
    if (ctx.request.user.adminView === true) {
      return ctx.db.query.orders({}, info);
    }

    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  },
  ordersConnectionUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.ordersConnection(
      {
        where: { user: { id: userId } }
      },
      info
    );
  }
};

module.exports = Query;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission, loggedIn } = require('../utils');
const stripe = require('../stripe');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    if (!args.price) {
      let update = await ctx.db.query.item({ where: { id: args.id } });
      delete update.id;
      const item = await ctx.db.mutation.createItem(
        {
          data: {
            //Making a relatiponship between data and user (propigate MONGODB)
            ...update,
            image: {
              set: args.image
            },
            largeImage: {
              set: args.largeImage
            },
            user: {
              connect: {
                id: ctx.request.userId
              }
            },
            description: args.orderFormat,
            recurringItem: false,
            customOrder: true
          }
        },
        info
      );
      return item;
    }
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          //Making a relatiponship between data and user (propigate MONGODB)
          ...args,
          image: {
            set: args.image
          },
          largeImage: {
            set: args.largeImage
          },
          user: {
            connect: {
              id: ctx.request.userId
            }
          }
        }
      },
      info
    );
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    //Amdin Authentication
    //Check to see if user is logged in
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //Get updates
    const updates = { ...args };
    //remove the ID
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    //Amdin Authentication
    //Check to see if user is logged in
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    const where = { id: args.id };
    //find item

    if (!ownsItem && !hasPermissions) {
      throw new Error(`You don't have permission to do that!`);
    }

    //Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    //Lowercase their email
    args.email = args.email.toLowerCase();
    //Hash password
    const password = await bcrypt.hash(args.password, 10);
    //create User
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    //create the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //We set a JWT as a cookie or response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    });
    //Finally return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    //check if there is a user
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    //Check password if correct
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    //generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    //Set the cookie wiht athe token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    });
    //Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Gooodbye!' };
  },
  async requestReset(parent, args, ctx, info) {
    //check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    //set reset token
    const randomBytesPromisfied = promisify(randomBytes);
    const resetToken = (await randomBytesPromisfied(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    //email them reset token
    const mailRes = await transport.sendMail({
      from: 'joseph.eggers.dev@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Link',
      html: makeANiceEmail(
        `Your Password Reset Token is here! \n\n <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click here to Reset</a>`
      )
    });

    //Return the message
    return { message: 'Thanks!' };
  },
  async resetPassword(parent, args, ctx, info) {
    //Check if passwords match
    if (args.password !== args.confirm) {
      throw new Error('Your passwords do not match');
    }
    //Check if its a legit reset token and Check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error('this token is either invalid or expired');
    }

    //Hash new password
    const password = await bcrypt.hash(args.password, 10);
    //Save new Password and remove old reset fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    //Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    //Set the JWT
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    //rerurn new user
    return updatedUser;
  },
  async updatePermissions(parent, args, ctx, info) {
    //Amdin Authentication
    //Check to see if user is logged in
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    //Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    //Make sure the users are signed in
    const { userId } = ctx.request;
    loggedIn(userId);
    //Query the users currrent cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id }
      }
    });
    //Check if the item is already in their cart
    if (existingCartItem) {
      throw new Error('this item is already in your cart');
      //No recurring Items
      // return ctx.db.mutation.updateCartItem(
      //   {
      //     where: { id: existingCartItem.id },
      //     data: { quantity: existingCartItem.quantity + 1 }
      //   },
      //   info
      // );
    }
    //Icrement by one or createa fersh cart Item
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          item: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    //Find the Cart Item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id
        }
      },
      `{id, user {id}}`
    );
    //Make sure theres an item
    if (!cartItem) throw new Error('No CartItem Found!');
    //Make sure they own the cart Item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('Cheetin huhhh');
    }
    //Delete item
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id }
      },
      info
    );
  },
  async createOrder(partent, args, ctx, info) {
    //Query the current User and make sure they are signed in\
    const { userId } = ctx.request;
    if (!userId)
      throw new Error('YOu must be signed in to complete this order');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `
    {
      id 
      name 
      email
      shippingAddress 
      cart {
        id 
        quantity 
        item {title price id description image largeImage recurringItem}
      }
    }`
    );
    //recaclculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );

    //Create the stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token
    });
    //Update Items to sold
    let orderItemsId = user.cart.map(cartItem => {
      if (cartItem.item.recurringItem === false) {
        return cartItem.item.id;
      }
      return `nullId`;
    });
    orderItemsId = orderItemsId.filter(id => id !== 'nullId');
    await ctx.db.mutation.updateManyItems({
      data: { sold: true },
      where: {
        id_in: orderItemsId
      }
    });

    //Create the CartItems to Order Items
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        image: {
          set: cartItem.item.image
        },
        largeImage: {
          set: cartItem.item.largeImage
        },
        quantity: cartItem.quantity,
        user: { connect: { id: userId } }
      };
      delete orderItem.recurringItem;
      delete orderItem.id;
      return orderItem;
    });

    //Create the order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        userName: user.name,
        shippingAddress: user.shippingAddress,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    });
    //Clean up the users caert, delete cartITems - for just that user, th
    // const cartItemIds = user.cart.map(cartItem => cartItem.id);
    // await ctx.db.mutation.deleteManyCartItems({
    //   where: { id_in: cartItemIds }
    // });
    //Clean up all Users Carts with this item (No Recurring Items)
    const cartItemIds = user.cart.map(cartItem => cartItem.item.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: { item: { id_in: cartItemIds } }
    });

    //Return the Order to the client
    return order;
  },
  async createFilter(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //Create Filter
    const filter = await ctx.db.mutation.createFilter(
      {
        data: {
          ...args
        }
      },
      info
    );
    return filter;
  },
  async updateFilter(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    //query the current user
    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //Create Filter
    const filter = await ctx.db.mutation.updateFilter(
      {
        data: {
          filter: args.filter
        },
        where: {
          id: args.id
        }
      },
      info
    );
    return filter;
  },
  async deleteFilter(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    //Delete it
    return ctx.db.mutation.deleteFilter({ where: { id: args.id } }, info);
  },
  async updateUser(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN']);

    const adminView = await ctx.db.mutation.updateUser(
      {
        data: {
          adminView: args.adminView
        },
        where: {
          id: ctx.request.user.id
        }
      },
      info
    );

    return adminView;
  },
  async createEvent(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //Create Filter
    const Event = await ctx.db.mutation.createEvent(
      {
        data: {
          ...args
        }
      },
      info
    );
    return Event;
  },
  async updateEvent(parent, args, ctx, info) {
    //Amdin Authentication
    //Check to see if user is logged in
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    //Get updates
    const updates = { ...args };
    //remove the ID
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateEvent(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteEvent(parent, args, ctx, info) {
    //Amdin Authentication
    //Check to see if user is logged in
    loggedIn(ctx.request.userId);
    //query the current user

    //Check if the user has permission to create search Filter
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    const where = { id: args.id };
    //find item

    //Delete it
    return ctx.db.mutation.deleteEvent({ where }, info);
  },
  async updateShipping(parent, args, ctx, info) {
    loggedIn(ctx.request.userId);
    const updates = { ...args };
    //remove the ID
    delete updates.id;
    const user = await ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );

    return user;
  }
};

module.exports = Mutations;

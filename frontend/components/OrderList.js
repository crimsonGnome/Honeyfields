import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import { perPage } from '../config';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Pagination, { ALL_ORDERS_QUERY, ORDERS_QUERY } from './Pagination';
import User from './User';
import { Center } from './styles/BodyLayout';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY($skip: Int = 0, $first: Int= ${perPage} ) {
    orders(first: $first, skip:$skip,orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;

  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));

  @media (${props => props.theme.phoneView}) {
    grid-template-columns: 1fr;
    margin-right: 5vw;
  }
`;

class OrderList extends Component {
  render() {
    return (
      <Center>
        <User>
          {({ data: { me } }) => (
            <Query
              query={USER_ORDERS_QUERY}
              variables={{
                skip: this.props.page * perPage - perPage
              }}
            >
              {({ data: { orders }, loading, error }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <Error error={error} />;
                return (
                  <div>
                    {me.permissions.includes('ADMIN') ? (
                      <>
                        <Query query={ALL_ORDERS_QUERY}>
                          {({ data: { ordersConnection } }) => (
                            <h2>
                              You have {ordersConnection.aggregate.count}
                              Toatal Orders
                            </h2>
                          )}
                        </Query>
                        <Pagination orders="admin" page={this.props.page} />
                      </>
                    ) : (
                      <>
                        <Query query={ORDERS_QUERY}>
                          {({ data: { ordersConnectionUser } }) => (
                            <h2>
                              You have {ordersConnectionUser.aggregate.count}{' '}
                              Orders
                            </h2>
                          )}
                        </Query>
                        <Pagination orders="orders" page={this.props.page} />
                      </>
                    )}

                    <OrderUl>
                      {orders.map(order => (
                        <OrderItemStyles key={order.id}>
                          <Link
                            href={{
                              pathname: '/order',
                              query: { id: order.id }
                            }}
                          >
                            <a>
                              <div className="order-meta">
                                <p>
                                  {order.items.reduce(
                                    (a, b) => a + b.quantity,
                                    0
                                  )}{' '}
                                  Items
                                </p>
                                <p>{order.items.length} Products</p>
                                <p>
                                  {formatDistance(order.createdAt, new Date())}
                                </p>
                                <p>{formatMoney(order.total)}</p>
                              </div>
                              <div className="images">
                                {order.items.map(item => (
                                  <img
                                    key={item.id}
                                    src={item.image[0]}
                                    alt={item.title}
                                  />
                                ))}
                              </div>
                            </a>
                          </Link>
                        </OrderItemStyles>
                      ))}
                    </OrderUl>
                    {me.permissions.includes('ADMIN') ? (
                      <Pagination orders="admin" page={this.props.page} />
                    ) : (
                      <Pagination orders="orders" page={this.props.page} />
                    )}
                  </div>
                );
              }}
            </Query>
          )}
        </User>
      </Center>
    );
  }
}

export default OrderList;

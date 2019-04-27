import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import { perPage, portPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection(
      where: {
        AND: [{ customOrder: false }, { sold: false }, { recurringItem: false }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
const EVENTS_QUERY = gql`
  query EVENTS_QUERY {
    eventsConnection {
      aggregate {
        count
      }
    }
  }
`;
const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    ordersConnectionUser {
      aggregate {
        count
      }
    }
  }
`;
const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    ordersConnection {
      aggregate {
        count
      }
    }
  }
`;
const PAGINATION_QUERY_PORTFOLIO = gql`
  query PAGINATION_QUERY_PORTFOLIO {
    itemsConnection(where: { AND: [{ customOrder: false }, { sold: true }] }) {
      aggregate {
        count
      }
    }
  }
`;

const PAGINATION_QUERY_SEARCH = gql`
  query PAGINATION_QUERY_SEARCH($filter: String!) {
    itemsConnection(
      where: {
        OR: [{ title_contains: $filter }, { description_contains: $filter }]
        AND: [{ customOrder: false }, { sold: false }, { recurringItem: false }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
const PAGINATION_QUERY_SEARCH_PORTFOLIO = gql`
  query PAGINATION_QUERY_SEARCH_PORTFOLIO($filter: String!) {
    itemsConnection(
      where: {
        OR: [{ title_contains: $filter }, { description_contains: $filter }]
        AND: [{ customOrder: false }, { sold: true }, { recurringItem: false }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const PAGINATION_QUERY_SEARCH_CUSTOM = gql`
  query PAGINATION_QUERY_SEARCH_CUSTOM($filter: String!) {
    itemsConnection(
      where: {
        OR: [{ title_contains: $filter }, { description_contains: $filter }]
        AND: { recurringItem: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const PAGINATION_QUERY_CUSTOM_ORDERS = gql`
  query PAGINATION_QUERY_CUSTOM_ORDERS {
    itemsConnection(
      where: {
        recurringItem: true
        AND: [{ customOrder: false }, { sold: false }]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
const Pagination = props => {
  let paginationQuery = PAGINATION_QUERY;
  let filter;
  let typeQuery = 'items';
  if (props.filter) {
    filter = props.filter;
    paginationQuery = PAGINATION_QUERY_SEARCH;
  }
  if (props.portfolio) {
    switch (props.portfolio) {
      case 'portfolio':
        paginationQuery = PAGINATION_QUERY_PORTFOLIO;
        break;

      default:
        filter = props.portfolio;
        paginationQuery = PAGINATION_QUERY_SEARCH_PORTFOLIO;
    }
  }
  if (props.custom) {
    typeQuery = 'custom';
    switch (props.custom) {
      case 'recurringItem':
        paginationQuery = PAGINATION_QUERY_CUSTOM_ORDERS;
        break;

      default:
        filter = props.custom;
        paginationQuery = PAGINATION_QUERY_SEARCH_CUSTOM;
    }
  }
  if (props.events) {
    typeQuery = 'events';
    paginationQuery = EVENTS_QUERY;
  }
  if (props.orders) {
    switch (props.orders) {
      case 'admin':
        typeQuery = 'orders';
        paginationQuery = ALL_ORDERS_QUERY;
        break;

      default:
        typeQuery = 'userOrders';
        paginationQuery = ORDERS_QUERY;
    }
  }
  return (
    <Query query={paginationQuery} variables={{ filter: filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        let count = 4;

        switch (typeQuery) {
          case 'events':
            count = data.eventsConnection.aggregate.count;
            break;
          case 'orders':
            count = data.ordersConnection.aggregate.count;
            break;
          case 'userOrders':
            count = data.ordersConnectionUser.aggregate.count;
            break;

          default:
            count = data.itemsConnection.aggregate.count;
            console.log(count);
        }
        let pages = Math.ceil(count / perPage);
        if (props.portfolio) {
          pages = Math.ceil(count / portPage);
        }
        const page = props.page;

        return (
          <PaginationStyles data-test="pagination">
            <Head>
              <title>
                Honeyfeilds {page} of {pages}
              </title>
            </Head>
            {filter ? (
              <Link
                prefetch
                href={{
                  pathname: typeQuery,
                  query: { page: page - 1, filter: filter }
                }}
              >
                <a className="prev" aria-disabled={page <= 1}>
                  <i className="fas fa-arrow-left" /> Prev
                </a>
              </Link>
            ) : (
              <Link
                prefetch
                href={{
                  pathname: typeQuery,
                  query: { page: page - 1 }
                }}
              >
                <a className="prev" aria-disabled={page <= 1}>
                  <i className="fas fa-arrow-left" /> Prev
                </a>
              </Link>
            )}

            <p>
              Page {page} of
              <span className="totalPages">{pages}</span>
            </p>
            <p>{count} Items Total</p>
            {filter ? (
              <Link
                prefetch
                href={{
                  pathname: typeQuery,
                  query: { page: page + 1, filter: filter }
                }}
              >
                <a className="next" aria-disabled={page >= pages}>
                  Next
                  <i className="fas fa-arrow-right" />
                </a>
              </Link>
            ) : (
              <Link
                prefetch
                href={{
                  pathname: typeQuery,
                  query: { page: page + 1 }
                }}
              >
                <a className="next" aria-disabled={page >= pages}>
                  Next
                  <i className="fas fa-arrow-right" />
                </a>
              </Link>
            )}
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
export { ALL_ORDERS_QUERY };
export { ORDERS_QUERY };

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Custom';
import Pagination from './Pagination';
import { perPage } from '../config';
import FilterList from './FilterList';
import { Body, Center, ItemList } from './styles/BodyLayout';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int= ${perPage} ) {
    items(where: {recurringItem: true}, first: $first, skip:$skip, orderBy:createdAt_DESC ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const FILTER_ITEMS_QUERY = gql`
  query FILTER_ITEMS_QUERY($filter: String!, $skip: Int = 0, $first: Int= ${perPage} ) {
    items(where: { OR: [{ title_contains: $filter }, { description_contains: $filter }], AND: {recurringItem: true}}, first: $first, skip:$skip, orderBy:createdAt_DESC ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    let ItemsQuery = ALL_ITEMS_QUERY;

    if (this.props.filter) {
      ItemsQuery = FILTER_ITEMS_QUERY;
    }

    return (
      <Body className="body">
        <FilterList custom="recurringItem" className="sd" />
        <Center className="main">
          <Pagination
            custom={this.props.filter || 'recurringItem'}
            page={this.props.page}
          />

          <Query
            query={ItemsQuery}
            // fetchPolicy="network-only"
            // refetch(); (fetches all the caches)
            variables={{
              skip: this.props.page * perPage - perPage,
              filter: this.props.filter
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              if (!data || data.items.length === 0) return <p>no data</p>;

              return (
                <ItemList>
                  {data.items.map(item => (
                    <Item item={item} key={item.id} />
                  ))}
                </ItemList>
              );
            }}
          </Query>
          <Pagination
            custom={this.props.filter || 'recurringItem'}
            page={this.props.page}
          />
        </Center>
      </Body>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };

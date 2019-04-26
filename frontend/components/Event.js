import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Body, Center, InnerFilter, FilterOverlay } from './styles/BodyLayout';
import { perPage } from '../config';
import styled from 'styled-components';
import EventItem from './EventItem';
import Pagination from './Pagination';

const ALL_EVENT_QUERY = gql`
query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int= ${perPage} ) {
  events( first: $first, skip:$skip, orderBy: createdAt_DESC) {
    id
    title
    description
    image
  }
}
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
`;

class Event extends Component {
  render() {
    return (
      <Body>
        <FilterOverlay>
          <InnerFilter />
        </FilterOverlay>
        <Center>
          <Pagination events="events" page={this.props.page} />
          <Query
            query={ALL_EVENT_QUERY}
            variables={{
              skip: this.props.page * perPage - perPage,
              filter: this.props.filter
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data) return <p>no data</p>;
              if (error) return <p>Error: {error.message}</p>;

              return (
                <ItemList>
                  {data.events.map(item => (
                    <EventItem item={item} key={item.id} />
                  ))}
                </ItemList>
              );
            }}
          </Query>
          <Pagination events="events" page={this.props.page} />
        </Center>
      </Body>
    );
  }
}

export default Event;
export { ALL_EVENT_QUERY };

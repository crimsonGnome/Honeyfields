import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination';
import { portPage } from '../config';
import FilterList from './FilterList';
import { Body, Center, ItemList } from './Items';
import { ViewImagePort } from './ImageGalleryPort';
import ViewImageStyles from './styles/ViewImageStyles';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${portPage}) {
    items(
      where: { AND: [{ customOrder: false }, { sold: true }] }
      first: $first
      skip: $skip
      orderBy: createdAt_DESC
    ) {
      id
      title
      description
      image
      largeImage
    }
  }
`;

const FILTER_ITEMS_QUERY = gql`
  query FILTER_ITEMS_QUERY($filter: String!, $skip: Int = 0, $first: Int= ${portPage} ) {
    items(where: { OR: [{ title_contains: $filter }, { description_contains: $filter }], AND: [{ customOrder: false }, { sold: true }]}, first: $first, skip:$skip, orderBy:createdAt_DESC ) {
      id
      title
      description
      image
      largeImage
    }
  }
`;
function randomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}
const randomItemGen = () => {
  let h = 1;
  let v = 1;
  if (randomNumber(5) % 2) {
    h = randomNumber(4);
    v = randomNumber(4);
  }
  const itemClass = `item h${h} v${v}`;
  return itemClass;
};
class Items extends Component {
  render() {
    let ItemsQuery = ALL_ITEMS_QUERY;

    if (this.props.filter) {
      ItemsQuery = FILTER_ITEMS_QUERY;
    }
    return (
      <Body className="body">
        <FilterList custom="portfolio" className="sd" />
        <Center className="main">
          {this.props.filter ? (
            <Pagination portfolio={this.props.filter} page={this.props.page} />
          ) : (
            <Pagination portfolio="portfolio" page={this.props.page} />
          )}
          <Query
            query={ItemsQuery}
            // fetchPolicy="network-only"
            // refetch(); (fetches all the caches)
            variables={{
              skip: this.props.page * portPage - portPage,
              filter: this.props.filter
            }}
          >
            {({ data, error, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <ViewImageStyles className="port">
                  <section className="gallery">
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                    {data.items.map(item => (
                      <ViewImagePort
                        item={item}
                        key={item.id}
                        classItem={randomItemGen()}
                      />
                    ))}
                  </section>
                </ViewImageStyles>
              );
            }}
          </Query>
          {this.props.filter ? (
            <Pagination portfolio={this.props.filter} page={this.props.page} />
          ) : (
            <Pagination portfolio="portfolio" page={this.props.page} />
          )}
        </Center>
      </Body>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
export { FILTER_ITEMS_QUERY };

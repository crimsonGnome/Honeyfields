import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FilterOverlay, InnerFilter } from './styles/Filter.Styles';

const FITLER_LIST = gql`
  query FITLER_LIST {
    filters(orderBy: createdAt_DESC) {
      id
      filter
    }
  }
`;

const FilterList = props => {
  let pathname = '/index';
  if (props.custom) {
    let filter = props.custom;
    switch (filter) {
      case 'recurringItem':
        pathname = '/custom';
        break;

      default:
        pathname = '/portfolio';
    }
  }
  return (
    <FilterOverlay>
      <div className="shell">
        <InnerFilter>
          <Filter pathname={pathname} />
        </InnerFilter>
      </div>
    </FilterOverlay>
  );
};

class Filter extends Component {
  state = {
    airaControl: false
  };

  handleChange = () => {
    const val = this.state.ariaControl;
    this.setState({ ariaControl: !val });
  };

  render() {
    const pathname = this.props.pathname;
    return (
      <Query query={FITLER_LIST}>
        {({ data, error }) => {
          if (error) return <p>Error: {error.message}</p>;
          console.log(data.filters);
          return (
            <>
              {this.state.ariaControl && (
                <>
                  <button onClick={this.handleChange} aria-controls="menu-list">
                    <span className="close">×</span>
                  </button>
                  <div
                    className="filter"
                    aria-expanded={this.state.ariaControl}
                  >
                    <h2 aria-expanded={this.state.ariaControl}>
                      Search Filter List
                    </h2>
                    <ul
                      className="filterStyles"
                      aria-expanded={this.state.ariaControl}
                    >
                      {data.filters.map(item => (
                        <li key={item.id}>
                          <Link
                            prefetch
                            href={{
                              pathname: pathname,
                              query: { filter: item.filter }
                            }}
                          >
                            <a>{item.filter}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              {!this.state.ariaControl && (
                <>
                  <button onClick={this.handleChange} aria-controls="menu-list">
                    <span className="open">Filters ☰</span>
                  </button>
                  <div
                    className="filter"
                    aria-expanded={this.state.ariaControl}
                  >
                    <h2 aria-expanded={this.state.ariaControl}>
                      Search Filter List
                    </h2>
                    <ul
                      className="filterStyles"
                      aria-expanded={this.state.ariaControl}
                    >
                      {data.filters.map(item => (
                        <li key={item.id}>
                          <Link
                            prefetch
                            href={{
                              pathname: pathname,
                              query: { filter: item.filter }
                            }}
                          >
                            <a>{item.filter}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default FilterList;
export { FITLER_LIST };

import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import { FITLER_LIST } from './FilterList';
import FilterDeleteButton from './FilterDeleteButton';
import FilterAddButton from './FilterAddButton';
import gql from 'graphql-tag';
import SickButton from './styles/SickButton';
import styled from 'styled-components';

const Filterlayout = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  grid-gap: 10px;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  label input {
    width: 100%;
    font-size: 1.5rem;
  }

  button {
    background: ${props => props.theme.honeyButton};
    color: white;
  }
`;

const Filter = props => (
  <Query query={FITLER_LIST}>
    {({ data, loading, error }) => (
      <>
        <Error error={error} />

        <ol>
          {data.filters.map(filter => (
            <FilterCRUD key={filter.id} filter={filter} />
          ))}
          <FilterAddButton />
        </ol>
      </>
    )}
  </Query>
);
const UPDATE_FILTER_LIST = gql`
  mutation updateFilter($filterId: ID!, $filter: String!) {
    updateFilter(id: $filterId, filter: $filter) {
      id
      filter
    }
  }
`;

class FilterCRUD extends Component {
  state = {
    filter: this.props.filter.filter,
    EditView: false
  };
  handleChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };
  updateAndCloseEdit = updateFilter => {
    let val = !this.state.EditView;
    this.setState({ EditView: val }, updateFilter);
  };
  openEdit = () => {
    this.setState({ EditView: true });
  };

  render() {
    const filt = this.props.filter;
    return (
      <>
        {this.state.EditView === false ? (
          <Filterlayout>
            <div>{filt.filter}</div>
            <button onClick={this.openEdit}>
              <i className="fas fa-pencil-alt" />
            </button>
            <FilterDeleteButton id={filt.id}>&times;</FilterDeleteButton>
          </Filterlayout>
        ) : (
          <Mutation
            mutation={UPDATE_FILTER_LIST}
            variables={{
              filterId: this.props.filter.id,
              filter: this.state.filter
            }}
          >
            {(updateFilter, { loading, error }) => (
              <Filterlayout>
                <Error error={error} />
                <label htmlFor={`${filt.id}-filter-${filt.filter}`}>
                  <input
                    id={`${filt.id}-filter-${filt.filter}`}
                    type="text"
                    defaultValue={this.state.filter}
                    onChange={this.handleChange}
                  />
                </label>

                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={e => this.updateAndCloseEdit(updateFilter)}
                >
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </Filterlayout>
            )}
          </Mutation>
        )}
      </>
    );
  }
}

export default Filter;
export { Filterlayout };

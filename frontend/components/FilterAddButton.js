import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FITLER_LIST } from './FilterList';
import Error from './ErrorMessage';
import SickButton from './styles/SickButton';
import { Filterlayout } from './FilterCRUD';

const ADD_FILTER_MUTATION = gql`
  mutation ADD_FILTER_MUTATION($filter: String!) {
    createFilter(filter: $filter) {
      id
    }
  }
`;

class FilterAddButton extends Component {
  state = {
    newfilter: ''
  };
  handleChange = e => {
    this.setState({ newfilter: e.target.value });
  };
  createFilterFunc = async (e, createFilter) => {
    e.preventDefault();
    await createFilter({ $fitler: this.state.newfilter });
    document.getElementById('newFilter').value = '';
  };

  render() {
    return (
      <Mutation
        mutation={ADD_FILTER_MUTATION}
        variables={{
          filter: this.state.newfilter
        }}
        refetchQueries={[{ query: FITLER_LIST }]}
      >
        {(createFilter, { loading, error }) => (
          <>
            <h4>New Filter</h4>
            <Filterlayout>
              <Error error={error} />

              <label htmlFor="newFilter">
                <input
                  id="newFilter"
                  type="text"
                  value={this.state.filter}
                  onChange={this.handleChange}
                />
              </label>

              <SickButton
                type="button"
                disabled={loading}
                onClick={e => this.createFilterFunc(e, createFilter)}
              >
                Updat{loading ? 'ing' : 'e'}
              </SickButton>
            </Filterlayout>
          </>
        )}
      </Mutation>
    );
  }
}

export default FilterAddButton;

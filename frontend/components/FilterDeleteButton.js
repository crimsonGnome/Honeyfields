import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FITLER_LIST } from './FilterList';

const DELETE_FILTER_MUTATION = gql`
  mutation DELETE_FILTER_MUTATION($id: ID!) {
    deleteFilter(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    //read cache
    const data = cache.readQuery({ query: FITLER_LIST });
    console.log(data, payload);
    data.filters = data.filters.filter(
      filter => filter.id !== payload.data.deleteFilter.id
    );
    cache.writeQuery({ query: FITLER_LIST, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_FILTER_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delelte this?')) {
                deleteItem().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;

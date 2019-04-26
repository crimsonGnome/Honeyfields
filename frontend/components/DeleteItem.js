import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';
import { ALL_EVENT_QUERY } from './Event';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DELETE_EVENT_MUTATION = gql`
  mutation DELETE_EVENT_MUTATION($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    //read cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );

    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  updateEvent = (cache, payload) => {
    //read cache
    const data = cache.readQuery({ query: ALL_EVENT_QUERY });
    console.log(data, payload);
    data.events = data.events.filter(
      event => event.id !== payload.data.deleteEvent.id
    );

    cache.writeQuery({ query: ALL_EVENT_QUERY, data });
  };
  render() {
    let DeleteQuery = DELETE_ITEM_MUTATION;
    let update = this.update;
    if (this.props.event) {
      update = this.updateEvent;
      DeleteQuery = DELETE_EVENT_MUTATION;
    }
    return (
      <Mutation
        mutation={DeleteQuery}
        variables={{ id: this.props.id }}
        update={update}
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

import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_EVENT_QUERY = gql`
  query SINGLE_EVENT_QUERY($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      description
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  mutation UPDATE_EVENT_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateEvent(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

class UpdateItem extends Component {
  state = {};
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateEvent = async (e, updateEventMutation) => {
    e.preventDefault();

    const res = await updateEventMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    Router.push({
      pathname: '/events'
    });
  };
  render() {
    return (
      <Query
        query={SINGLE_EVENT_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.event) return <p>No Event Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_EVENT_MUTATION} variables={this.state}>
              {(updateEvent, { loading, error }) => (
                <Form onSubmit={e => this.updateEvent(e, updateEvent)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor=" title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="title"
                        required
                        defaultValue={data.event.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        type="number"
                        id="description"
                        name="description"
                        placeholder="description"
                        required
                        defaultValue={data.event.description}
                        onChange={this.handleChange}
                      />
                    </label>

                    <button type="submit">
                      Sav{loading ? 'ing' : 'e'} Changes
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };

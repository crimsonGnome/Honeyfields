import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';

import User from './User';
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
  <User>
    {({ data: { me } }) => (
      <>
        <h5>Shipping Address</h5>
        <ul>
          {me && (
            <>
              <FilterCRUD key={me.id} id={me.id} item={me.name} update="name" />
              <FilterCRUD
                key={me.id}
                id={me.id}
                item={me.shippingAddress}
                update="shipping"
              />
            </>
          )}

          {!me && ''}
        </ul>
      </>
    )}
  </User>
);
const UPDATE_NAME = gql`
  mutation updateShipping($filterId: ID!, $filter: String!) {
    updateShipping(id: $filterId, name: $filter) {
      id
      name
    }
  }
`;
const UPDATE_SHIPPING_ADDRESS = gql`
  mutation updateShipping($filterId: ID!, $filter: String!) {
    updateShipping(id: $filterId, shippingAddress: $filter) {
      id
      shippingAddress
    }
  }
`;

class FilterCRUD extends Component {
  state = {
    filter: this.props.item,
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
    let ShippingUpdate = UPDATE_SHIPPING_ADDRESS;
    if (this.props.update === 'name') {
      ShippingUpdate = UPDATE_NAME;
    }
    const filt = this.props.item;
    const id = this.props.id;
    return (
      <>
        {this.state.EditView === false ? (
          <Filterlayout>
            <div>{filt}</div>
            <button onClick={this.openEdit}>
              <i className="fas fa-pencil-alt" />
            </button>
          </Filterlayout>
        ) : (
          <Mutation
            mutation={ShippingUpdate}
            variables={{
              filterId: id,
              filter: this.state.filter
            }}
          >
            {(updateFilter, { loading, error }) => (
              <Filterlayout>
                <Error error={error} />
                <label htmlFor={`${id.id}-filter-${filt}`}>
                  <input
                    id={`${filt.id}-filter-${filt}`}
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

import React, { Component } from 'react';
import User from './User';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Filter from './FilterCRUD';
import { Buttons } from './styles/ItemStyles';

const ADMIN_VIEW_MUTATION = gql`
  mutation updateUser($adminView: Boolean) {
    updateUser(adminView: $adminView) {
      id
      adminView
      permissions
    }
  }
`;

const AdminView = props => (
  <User>
    {({ data: { me } }) => {
      return (
        <>
          <Buttons>
            <Admin me={me} />
            <h3>Admin Pages</h3>
            <div className="filter">
              <Filter />
            </div>

            <h3>Admin Pages</h3>
            <hr />
            <div className="buttonList">
              <Link href="/sell">
                <a>Sell Page</a>
              </Link>

              <Link href="/orders">
                <a>Orders Page</a>
              </Link>

              <Link href="/permissions">
                <a>Permissions Page</a>
              </Link>

              <Link href="/uploadEvent">
                <a>Upload Event</a>
              </Link>
            </div>
          </Buttons>
        </>
      );
    }}
  </User>
);

class Admin extends Component {
  state = {
    adminView: this.props.me.adminView
  };

  handleChange = updateUser => {
    let val = !this.state.adminView;
    this.setState({ adminView: val }, updateUser);
  };

  render() {
    return (
      <Mutation
        mutation={ADMIN_VIEW_MUTATION}
        variables={{
          adminView: this.state.adminView
        }}
        refetchQueries={CURRENT_USER_QUERY}
      >
        {(updateUser, { loading, error }) => (
          <>
            {error && <Error error={error} />}
            <label htmlFor="adminView">
              Admin View
              <input
                disabled={loading}
                id="adminView"
                name="adminView"
                type="checkbox"
                checked={this.state.adminView}
                onChange={e => this.handleChange(updateUser)}
              />
            </label>
          </>
        )}
      </Mutation>
    );
  }
}

export default AdminView;
export { Admin };
export { ADMIN_VIEW_MUTATION };

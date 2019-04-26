import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      shippingAddress

      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
      adminView
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };

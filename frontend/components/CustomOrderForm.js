import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import { ADD_TO_CART_MUTATION } from './AddToCart';
import { CURRENT_USER_QUERY } from './User';
import FeltView from './ImageGalleryPort';
import { SingleItemStyles } from './SingleItem';
import ViewImage from './ViewImages';
import Error from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import { CustomTitle } from './styles/Title';

const felt = [
  {
    image:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/v1552947498/honeyFields/vqu9bctjhgwmlh45mora.jpg',
    largeImage:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/c_scale,q_auto,w_1000/v1552947498/honeyFields/vqu9bctjhgwmlh45mora.jpg',
    key: 'felt1'
  },
  {
    image:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/v1552947945/honeyFields/icoeoilqyun3mwuq4fs5.jpg',
    largeImage:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/c_scale,q_auto,w_1000/v1552947945/honeyFields/icoeoilqyun3mwuq4fs5.jpg',
    key: 'felt2'
  },
  {
    image:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/v1552948434/honeyFields/jdgaeuhz3mv9ocvcp5yc.jpg',
    largeImage:
      'https://res.cloudinary.com/dct3rrzhx/image/upload/c_scale,q_auto,w_1000/v1552948434/honeyFields/jdgaeuhz3mv9ocvcp5yc.jpg',
    key: 'felt3'
  }
];

const CREATE_CUSTOM_ITEM_MUTATION = gql`
  mutation CREATE_CUSTOM_ITEM_MUTATION(
    $id: ID!
    $orderFormat: String!
    $image: [String]
    $largeImage: [String]
  ) {
    createItem(
      id: $id
      orderFormat: $orderFormat
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      image
      largeImage
      title
      description
      price
      orderFormat
    }
  }
`;

const CustomItemFrame = props => (
  <Query
    query={SINGLE_ITEM_QUERY}
    variables={{
      id: props.id
    }}
  >
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.item) return <p>No Item Found for ID</p>;
      console.log(data.item);
      return <CustomItem id={props.id} data={data} />;
    }}
  </Query>
);

class CustomItem extends Component {
  state = {
    image: this.props.data.item.image,
    largeImage: this.props.data.item.largeImage,
    fontImage: '/static/lavanderia.gif'
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, updateItemMutation, addToCart) => {
    e.preventDefault();
    let res;
    if (this.state.font) {
      let orderFormat = `${this.state.orderFormat} /\n/ Font: ${
        this.state.font
      }`;
      res = await updateItemMutation({
        variables: {
          id: this.props.id,
          orderFormat: orderFormat,
          image: this.state.image,
          largeImage: this.state.largeImage
        }
      });
    } else {
      res = await updateItemMutation({
        variables: {
          id: this.props.id,
          orderFormat: this.state.orderFormat
        }
      });
    }

    const data = await addToCart({
      variables: {
        id: res.data.createItem.id
      }
    });
    Router.push({
      pathname: '/index'
    });
  };
  onChange = e => {
    const { value } = e.target;
    this.setState({ fontImage: `/static/${value}.gif`, font: value });
  };

  render() {
    const data = this.props.data;
    return (
      <SingleItemStyles>
        <ViewImage
          image={data.item.image}
          largeImage={data.item.largeImage}
          description={data.item.title}
        />
        <div className="details">
          <CustomTitle>{data.item.title}</CustomTitle>
          <p>{data.item.description}</p>
          <OrderItemStyles>
            <div className="images">
              {felt.map(item => (
                <FeltView
                  key={item.key}
                  image={item.image}
                  largeImage={item.largeImage}
                />
              ))}
            </div>
          </OrderItemStyles>
          <Mutation
            mutation={ADD_TO_CART_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          >
            {(addToCart, { loading }) => (
              <Mutation
                mutation={CREATE_CUSTOM_ITEM_MUTATION}
                variables={this.state}
              >
                {(updateItem, { error }) => (
                  <Form
                    onSubmit={e => this.updateItem(e, updateItem, addToCart)}
                  >
                    <Error error={error} />

                    <fieldset disabled={loading} aria-busy={loading}>
                      <img className="font" src={this.state.fontImage} />
                      <label htmlFor="Font">
                        <select
                          onChange={e => {
                            e.persist();
                            this.onChange(e);
                          }}
                        >
                          <option value="lavanderia">Lavanderia</option>
                          <option value="almibar">Almibar</option>
                          <option value="brusher">Brusher</option>
                          <option value="dessertMenuScript">
                            Dessert Menu Script
                          </option>
                          <option value="weekdayScript">Weekday Script</option>
                          <option value="sophia">Sophia</option>
                          <option value="sanelma">Sanelma</option>
                          <option value="alexBrush">Alex Brush</option>
                        </select>
                      </label>
                      <label htmlFor="orderFormat">
                        Order Form
                        <textarea
                          type="number"
                          id="orderFormat"
                          name="orderFormat"
                          placeholder="orderFormat"
                          required
                          defaultValue={data.item.orderFormat}
                          onChange={this.handleChange}
                        />
                      </label>
                      <button disabled={loading} type="submit">
                        Add{loading ? 'ing' : ''} Item
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            )}
          </Mutation>
        </div>
      </SingleItemStyles>
    );
  }
}

export default CustomItemFrame;
export { CREATE_CUSTOM_ITEM_MUTATION };

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Router from 'next/router';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import FeltStyles from './styles/FeltStyles';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: [String]
    $largeImage: [String]
    $sold: Boolean
    $recurringItem: Boolean
    $orderFormat: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
      sold: $sold
      recurringItem: $recurringItem
      orderFormat: $orderFormat
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    orderFormat: '',
    image: [],
    largeImage: [],
    price: 0,
    sold: false,
    recurringItem: false
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (type === 'checkbox') {
      val = name === 'sold' ? !this.state.sold : !this.state.recurringItem;
    }
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'honeyFields');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dct3rrzhx/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();
    //console.log(file);
    let image = [...this.state.image];
    let largeImage = [...this.state.image];
    image.push(file.secure_url);
    largeImage.push(file.eager[0].secure_url);

    this.setState({
      image: image,
      largeImage: largeImage
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              //Stop the form from submiting
              e.preventDefault();
              //call The mutation
              const res = await createItem();
              //Change them to single item page
              console.log(res);
              Router.push({
                pathname: '/product',
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor=" file">
                file
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                <FeltStyles>
                  <div className="images">
                    {this.state.image.map(item => (
                      <img key={item} src={item} alt="item preview" />
                    ))}
                  </div>
                </FeltStyles>
              </label>
              <label htmlFor=" title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="sold">
                Sold
                <input
                  id="sold"
                  name="sold"
                  type="checkbox"
                  checked={this.state.sold}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="recurringItem">
                Recurring Item
                <input
                  id="recurringItem"
                  name="recurringItem"
                  type="checkbox"
                  checked={this.state.recurringItem}
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
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="orderFormat">
                Order Format
                <textarea
                  type="number"
                  id="orderFormat"
                  name="orderFormat"
                  placeholder="orderFormat"
                  required
                  value={this.state.orderFormat}
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };

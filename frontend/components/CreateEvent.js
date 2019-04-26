import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Router from 'next/router';
import Error from './ErrorMessage';

const CREATE_EVENT_MUTATION = gql`
  mutation CREATE_EVENT_MUTATION(
    $title: String!
    $description: String!
    $image: String
  ) {
    createEvent(title: $title, description: $description, image: $image) {
      id
    }
  }
`;

class CreateEvent extends Component {
  state = {
    title: '',
    description: '',
    image: ''
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    let val = type === 'number' ? parseFloat(value) : value;
    if (type === 'checkbox') {
      val = name === 'sold' ? !this.state.sold : !this.state.recurringItem;
      this.setState({ [name]: val });
    } else {
      this.setState({ [name]: val });
    }
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
    this.setState({
      image: file.secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_EVENT_MUTATION} variables={this.state}>
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
                pathname: '/item',
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
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
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

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateEvent;
export { CREATE_EVENT_MUTATION };

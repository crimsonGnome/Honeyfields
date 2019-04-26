import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import DeleteItem from './DeleteItem';
import User from './User';

export default class portItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image[0]} alt={item.title} />}
        <Title>
          <Link
            href={{
              pathname: '/product',
              query: { id: item.id }
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <p>{item.description}</p>

        <div className="buttonList">
          <User>
            {({ data: { me } }) => (
              <>
                {me &&
                  (me.adminView ? (
                    <>
                      <Link
                        href={{
                          pathname: 'update',
                          query: { id: item.id }
                        }}
                      >
                        <a>
                          Edit <i className="fas fa-pencil-alt" />
                        </a>
                      </Link>
                      <DeleteItem id={item.id}>Delete This Item</DeleteItem>
                    </>
                  ) : (
                    ''
                  ))}

                {!me && ''}
              </>
            )}
          </User>
        </div>
      </ItemStyles>
    );
  }
}

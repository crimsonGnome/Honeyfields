import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import User from './User';

export default class Item extends Component {
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
        <PriceTag>{formatMoney(item.price)}</PriceTag>
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
                    <AddToCart id={item.id} />
                  ))}
                {!me && (
                  <Link href="signup">
                    <a>Please Sign Up to Add to Cart 🛒</a>
                  </Link>
                )}
              </>
            )}
          </User>
        </div>
      </ItemStyles>
    );
  }
}

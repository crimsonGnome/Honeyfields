import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import DeleteItem from './DeleteItem';
import User from './User';

export default class EventItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && (
          <img className="event" src={item.image} alt={item.title} />
        )}
        {item.title && (
          <Title>
            <a>{item.title}</a>
          </Title>
        )}

        <p className="event">{item.description}</p>

        <div className="buttonList">
          <User>
            {({ data: { me } }) => (
              <>
                {me &&
                  (me.adminView ? (
                    <>
                      <Link
                        href={{
                          pathname: 'updateEvent',
                          query: { id: item.id }
                        }}
                      >
                        <a>
                          Edit <i className="fas fa-pencil-alt" />
                        </a>
                      </Link>
                      <DeleteItem id={item.id} event="events">
                        Delete This Item
                      </DeleteItem>
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

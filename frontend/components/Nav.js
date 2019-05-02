import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import styled from 'styled-components';
import { TOGGLE_CART_MUTATION } from './Cart';
import CartCount from './CartCount';
import { Component } from 'react';

const Logo = styled.h1`
  display: grid;
  @font-face {
    font-family: 'honeyFields';
    src: url('/static/ValsdayScript-DEMO.ttf');
  }
  align-self: center;
  font-size: 7rem;
  margin: 1rem;
  position: relative;
  line-height: 1;
  z-index: 2;
  transform: skew(-7deg);

  a,
  a .logo {
    text-shadow: 2px 2px rgba(38, 29, 26, 0.5), 4px 4px 8px rgba(0, 9, 114);
    text-transform: none;
    color: white;
    font-family: 'honeyFields';
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
  @media (${props => props.theme.phoneView}) {
    align-self: center;
    margin: 0;
    a {
      line-height: 0.8;
      font-size: 5rem;
      align-self: center;
    }
  }
`;

class Nav extends Component {
  state = {
    ariaControl: false
  };
  handleChange = () => {
    const val = this.state.ariaControl;
    this.setState({ ariaControl: !val });
  };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            {!this.state.ariaControl && (
              <NavStyles data-test="nav" id="menu-list">
                <Logo>
                  <Link prefetch href="/">
                    <a className="logo">Honeyfields Artistry</a>
                  </Link>
                </Logo>
                <div className="menu">
                  {!me && (
                    <>
                      <div className="hamburger">
                        <Link prefetch href="/items">
                          <a aria-expanded={this.state.ariaControl}>Shop</a>
                        </Link>
                        <Link prefetch href="/portfolio">
                          <a aria-expanded={this.state.ariaControl}>
                            Portfolio
                          </a>
                        </Link>
                        <Link prefetch href="/custom">
                          <a aria-expanded={this.state.ariaControl}>
                            Custom Orders
                          </a>
                        </Link>
                        <Link prefetch href="/about">
                          <a aria-expanded={this.state.ariaControl}>About</a>
                        </Link>
                        <Link prefetch href="/events">
                          <a aria-expanded={this.state.ariaControl}>Events</a>
                        </Link>
                      </div>
                      <Link prefetch href="/signup">
                        <a>Sign In</a>
                      </Link>
                    </>
                  )}

                  {me && (
                    <>
                      <div className="hamburger">
                        <Link prefetch href="/items">
                          <a aria-expanded={this.state.ariaControl}>Shop</a>
                        </Link>
                        <Link prefetch href="/portfolio">
                          <a aria-expanded={this.state.ariaControl}>
                            Portfolio
                          </a>
                        </Link>
                        <Link prefetch href="/custom">
                          <a aria-expanded={this.state.ariaControl}>
                            Custom Orders
                          </a>
                        </Link>
                        <Link prefetch href="/about">
                          <a aria-expanded={this.state.ariaControl}>About</a>
                        </Link>
                        <Link prefetch href="/events">
                          <a aria-expanded={this.state.ariaControl}>Events</a>
                        </Link>
                        <Link prefetch href="/orders">
                          <a aria-expanded={this.state.ariaControl}>Orders</a>
                        </Link>
                      </div>
                      <Signout />
                      <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {toggleCart => (
                          <button onClick={toggleCart}>
                            Cart
                            <CartCount
                              count={me.cart.reduce(
                                (tally, cartItem) => tally + cartItem.quantity,
                                0
                              )}
                            />
                          </button>
                        )}
                      </Mutation>
                    </>
                  )}
                </div>
                <button onClick={this.handleChange} aria-controls="menu-list">
                  <span className="open">☰</span>
                </button>
              </NavStyles>
            )}
            {this.state.ariaControl && (
              <NavStyles data-test="nav" id="menu-list">
                {!me && (
                  <>
                    <div className="flex">
                      <div className="logo">
                        <Logo>
                          <Link prefetch href="/">
                            <a onClick={this.handleChange}>
                              Honeyfields Artistry
                            </a>
                          </Link>
                        </Logo>
                        <button onClick={this.handleChange}>
                          <span className="close">×</span>
                        </button>
                      </div>
                      <Link prefetch href="/items">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Shop
                        </a>
                      </Link>
                      <Link prefetch href="/portfolio">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Portfolio
                        </a>
                      </Link>
                      <Link prefetch href="/custom">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Custom Orders
                        </a>
                      </Link>
                      <Link prefetch href="/about">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          About
                        </a>
                      </Link>
                      <Link prefetch href="/events">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Events
                        </a>
                      </Link>
                    </div>
                    <Link prefetch href="/signup">
                      <a onClick={this.handleChange}>Sign In</a>
                    </Link>
                  </>
                )}

                {me && (
                  <>
                    <div className="flex">
                      <div className="logo">
                        <Logo>
                          <Link prefetch href="/">
                            <a onClick={this.handleChange}>
                              Honeyfields Artistry
                            </a>
                          </Link>
                        </Logo>
                        <button onClick={this.handleChange}>
                          <span className="close">×</span>
                        </button>
                      </div>
                      <Link prefetch href="/items">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Shop
                        </a>
                      </Link>
                      <Link prefetch href="/portfolio">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Portfolio
                        </a>
                      </Link>
                      <Link prefetch href="/custom">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Custom Orders
                        </a>
                      </Link>
                      <Link prefetch href="/about">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          About
                        </a>
                      </Link>
                      <Link prefetch href="/events">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Events
                        </a>
                      </Link>
                      <Link prefetch href="/orders">
                        <a
                          onClick={this.handleChange}
                          aria-expanded={this.state.ariaControl}
                        >
                          Orders
                        </a>
                      </Link>

                      <Signout onClick={this.handleChange} />
                      <Mutation mutation={TOGGLE_CART_MUTATION}>
                        {toggleCart => (
                          <button onClick={toggleCart}>
                            Cart
                            <CartCount
                              count={me.cart.reduce(
                                (tally, cartItem) => tally + cartItem.quantity,
                                0
                              )}
                            />
                          </button>
                        )}
                      </Mutation>
                    </div>
                  </>
                )}
              </NavStyles>
            )}
          </>
        )}
      </User>
    );
  }
}

export default Nav;

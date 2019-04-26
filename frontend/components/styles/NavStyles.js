import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: stretch;
  .hamburger {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;

    align-items: center;
  }

  .menu {
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;

    align-items: center;
  }
  .close,
  .open {
    font-size: 3rem;
    font-weight: 900;
  }
  .flex {
    margin: 0;
    padding: 0;
    display: flex;
    justify-self: end;
    font-size: 2rem;
  }
  .menu a,
  .menu button,
  .flex button,
  .hamburger a,
  a[aria-expanded='true'] {
    padding: 1.5rem;
    display: flex;
    align-self: center;
    position: relative;
    font-weight: 900;
    background: none;
    border: 0;
    cursor: pointer;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 9, 114);

    &:before {
      content: '';
      width: 2px;
      background: ${props => props.theme.honey};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-5deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: #ff7f00;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }

  button {
    font-size: 1.8rem;
  }
  [aria-controls='menu-list'] {
    display: none;
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }

  @media (${props => props.theme.tabletView}) {
    .flex {
      grid-template-columns: 1fr;
      display: grid;
      height: 100vh;
      width: 100vw;
    }
    .hamburger {
      display: none;
    }
    .menu a,
    button,
    .hamburger a,
    a[aria-expanded='true'] {
      font-size: 1.4rem;
      padding: 1.5rem;
      display: flex;
      align-self: center;
      position: relative;
      font-weight: 900;
      background: none;
      border: 0;
      cursor: pointer;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 9, 114);

      &:before {
        content: '';
        width: 2px;
        background: ${props => props.theme.honey};
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-5deg);
        top: 0;
        bottom: 0;
      }
      &:after {
        height: 2px;
        background: #ff7f00;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
      &:hover,
      &:focus {
        outline: none;
        &:after {
          width: calc(100% - 60px);
        }
      }
    }

    [aria-controls='menu-list'] {
      display: inline-block;
    }
    a[aria-expanded='false'] {
      display: none;
    }
    a[aria-expanded='true'] {
      display: block;
    }
    .logo {
      display: flex;
      justify-content: space-around;
    }
    .close {
      font-weight: 900;
      border: 0;
      cursor: pointer;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 9, 114);
    }

    display: grid;
    grid-template-columns: 1fr;
  }
`;

export default NavStyles;

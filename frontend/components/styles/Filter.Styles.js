import styled from 'styled-components';

const InnerFilter = styled.div`
  font-family: scriptCookie;

  text-shadow: 2px 2px 4px rgba(0, 9, 114);
  background: linear-gradient(to left, #ffff, transparent);
  height: 100%;
  padding-top: 100px;

  h2 {
    font-size: 3rem;
    line-height: 1;
    margin-top: 0;
    text-shadow: 2px 2px 4px rgba(0, 9, 114);
    transform: skew(-5deg) rotate(-1deg);
    background: ${props => props.theme.honeyButton};

    text-align: center;
    padding: 1rem;
    color: white;
  }

  [aria-controls='menu-list'] {
    display: none;
  }
  .filter {
    display: block;
  }
  .filterStyles {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr;
    align-items: center;
    align-content: center;

    background: none;
    list-style-type: none;

    li {
      text-align: center;
      background: ${props => props.theme.honeyButton};
      transform: skew(-5deg) rotate(-1deg);
    }

    a {
      font-size: 4rem;
      text-shadow: 2px 2px 4px rgba(0, 9, 114);
      display: grid;
      justify-content: center;
      display: inline;
      line-height: 1.3;
      text-align: center;
      color: white;
    }
  }

  @media (${props => props.theme.phoneView}) {
    .filterStyles {
      width: 40vw;
    }
    .filter {
      display: none;
    }
    [aria-controls='menu-list'] {
      display: block;
      background: ${props => props.theme.honey};
      border: none;

      position: fixed;
      right: 5%;
      bottom: 10%;
      width: 65px;
      height: 65px;
      border-radius: 100%;
    }
    [aria-expanded='false'] {
      display: none;
    }
    div[aria-expanded='true'] {
      display: block;
    }

    .open,
    .close {
      font-size: 2.4rem;
      font-weight: 900;
      color: white;
    }
    .close {
      font-size: 3rem;
    }
  }
`;

const FilterOverlay = styled.div`
  grid-area: sd;
  min-height: 80vh;
  background-image: ${props => props.theme.red};
  box-shadow: 1px solid ${props => props.theme.brown};

  div.shell {
    background: linear-gradient(180deg, #f79000, transparent);
    height: 100%;
  }
  @media (${props => props.theme.phoneView}) {
    z-index: 2;
  }
`;

export { InnerFilter };
export { FilterOverlay };

import styled from 'styled-components';

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-areas: 'sd main main main main main main leftsd';
  grid-gap: 20px;
`;

const Center = styled.div`
  text-align: center;
  grid-area: main;
  justify-self: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  max-width: ${props => props.theme.maxWidth};

  @media (${props => props.theme.phoneView}) {
    grid-gap: 10px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InnerFilter = styled.div`
  background: linear-gradient(to left, #ffff, transparent);
  height: 100%;
`;

const FilterOverlay = styled.div`
  grid-area: sd;
  min-height: 79vh;
  background-image: ${props => props.theme.red};
  box-shadow: 1px solid ${props => props.theme.brown};
`;

export { Body };
export { Center };
export { ItemList };
export { InnerFilter };
export { FilterOverlay };

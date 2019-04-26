import styled from 'styled-components';

const Supreme = styled.h3`
  background: linear-gradient(180deg, #f79000, transparent, #f79000);
  text-shadow: 2px 2px 4px rgba(0, 9, 114);
  color: white;
  display: inline-block;
  padding: 4px 10px;
  margin: 0;
  font-size: 4rem;
  width: 100%;

  @media (${props => props.theme.phoneView}) {
    font-size: 2.7rem;
  }
`;

const FilterHeader = styled.div`
  background-image: ${props => props.theme.red};
  transform: skew(-3deg);
`;

export default Supreme;
export { FilterHeader };

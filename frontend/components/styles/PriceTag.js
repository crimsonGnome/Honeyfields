import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.honey};
  transform: rotate(3deg);
  color: white;
  text-shadow: 2px 2px 4px rgba(38, 29, 26, 0.2);
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;

  @media (${props => props.theme.phoneView}) {
    font-size: 2rem;
  }
`;

export default PriceTag;

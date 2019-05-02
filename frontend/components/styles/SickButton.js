import styled from 'styled-components';

const SickButton = styled.button`
  background: ${props => props.theme.honeyButton};
  color: white;
  border: 0;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  text-shadow: 2px 2px 4px rgba(0, 9, 114);
  &[disabled] {
    opacity: 0.5;
  }
`;
const SickButtonView = styled.span`
  button {
    background: ${props => props.theme.honeyButton};
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 9, 114);
    border: 0;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 2rem;
    padding: 0.8rem 1.5rem;
    transform: skew(-2deg);
    display: inline-block;
    transition: all 0.5s;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;
export default SickButton;
export { SickButtonView };

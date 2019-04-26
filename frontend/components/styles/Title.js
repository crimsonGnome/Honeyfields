import styled from 'styled-components';

const Title = styled.h3`
  margin: 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  font-family: scriptCookie;
  text-shadow: 2px 2px 4px rgba(0, 9, 114);
  a {
    background: ${props => props.theme.honeyButton};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
  @media (${props => props.theme.phoneView}) {
    a {
      font-size: 2.5rem;
    }
  }
`;

const CustomTitle = styled.h3`
  background: ${props => props.theme.honeyButton};
  margin: 1rem;
  font-family: scriptCookie;
  text-shadow: 2px 2px 4px rgba(0, 9, 114);
  transform: skew(-5deg) rotate(-1deg);
  font-size: 4.5rem;
  color: white;
  padding: 0 1rem;
  display: inline-block;
`;

export default Title;
export { CustomTitle };

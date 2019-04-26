import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  img.event {
    width: 100%;
    height: 600px;
    object-fit: contain;
    background: rgb(20, 20, 0);
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
  .borderButton {
    width: 80vw;
    margin-left: 10vw;
    position: relative;
    display: grid;
  }
  @media (${props => props.theme.phoneView}) {
    img {
      height: 200px;
    }
    img.event {
      width: 100%;
      height: 400px;
      object-fit: contain;
      background: rgb(20, 20, 0);
    }
    p {
      height: 0;
      margin: auto;
      overflow: hidden;
      color: white;
    }
    .event {
      font-size: 12px;
      line-height: 2;
      font-weight: 300;
      flex-grow: 1;
      padding: 0 3rem;
      font-size: 1rem;
    }
  }
`;
const Buttons = styled.div`
  width: 80vw;
  margin-left: 10vw;
  margin-bottom: 50px;
  position: relative;
  background: white;
  display: grid;
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
    }
    a {
      text-align: center;
    }
  }

  .fitler {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, 1fr);
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
    }
  }
  h3 {
    text-align: center;
  }
`;
export default Item;
export { Buttons };

import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  border-radius: 3px;
`;

const CloseButtonPic = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: relative;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
export { CloseButtonPic };

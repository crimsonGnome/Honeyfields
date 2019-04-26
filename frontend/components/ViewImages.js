import React, { Component } from 'react';
import styled from 'styled-components';

const StyledImage = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: 5fr 1fr;
  grid-gap: 50px;
  margin: 10px;

  .container {
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
    .next {
      grid-template-columns: 1fr 4fr 1fr;
      display: grid;
      position: absolute;
      justify-items: center;
      z-index: 2;
      top: 50%;
      width: 100%;
    }
    img.main {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      object-fit: cover;
      width: 100%;
    }
  }

  button .left {
    align-self: center;
    justify-self: left;
  }

  button .right {
    align-self: center;
    justify-self: right;
  }
  button {
    background: none;
    color: white;
    text-shadow: 2px 2px 8px ${props => props.theme.honey};
    padding: 0 10px;
    font-size: 3.5rem;
    border: none;
  }
`;
const ImageRow = styled.div`
  display: grid;
  grid-template-columns: 100px;
  grid-template-rows: 100px;
  grid-auto-flow: column;

  img {
    width: 100px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
class ViewImage extends Component {
  state = {
    imageCount: 0
  };

  handleClick = e => {
    let count = 0;
    let length = this.props.largeImage.length - 1;
    if (e.target.classList.contains('fa-arrow-right') === true) {
      if (length === this.state.imageCount) {
        this.setState({ imageCount: 0 });
      } else {
        count = this.state.imageCount + 1;
        this.setState({ imageCount: count });
      }
    } else {
      if (this.state.imageCount === 0) {
        this.setState({ imageCount: length });
      } else {
        count = this.state.imageCount - 1;
        this.setState({ imageCount: count });
      }
    }

    // const length = largeImage.length;
  };
  render() {
    const props = this.props;
    return (
      <StyledImage>
        <div className="container">
          <img
            className="main"
            src={props.largeImage[`${this.state.imageCount}`]}
            alt={props.description}
          />
          <div className="next">
            <button className="left" onClick={e => this.handleClick(e)}>
              <i className="fas fa-arrow-left" />
            </button>
            <div />
            <button className="right" onClick={e => this.handleClick(e)}>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
        </div>
        <ImageRow>
          <div> {props.image.length} photos</div>
          {props.image.map(item => (
            <img src={item} alt={props.description} key={item} />
          ))}
        </ImageRow>
        <br />
      </StyledImage>
    );
  }
}

export default ViewImage;

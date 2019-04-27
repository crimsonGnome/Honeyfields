import React, { Component } from 'react';
import ViewImageStyles from './styles/ViewImageStyles';
import Title from './styles/Title';
import Link from 'next/link';

class ViewImage extends Component {
  state = {
    imageDisplay: false,
    overlayImage: this.props.largeImage
  };

  handleClick = () => {
    let val = !this.state.imageDisplay;
    this.setState({ imageDisplay: val });
  };
  render() {
    return (
      <ViewImageStyles>
        {this.state.imageDisplay && (
          <div className="overlay open">
            <div className="overlay-inner">
              <button className="close" onClick={this.handleClick}>
                × Close
              </button>
              <br />
              <div className="overlay-img-container">
                <img
                  className="overlay-img felt"
                  src={this.state.overlayImage}
                />
              </div>
            </div>
          </div>
        )}

        <section>
          <div className="item">
            <img src={this.props.image} />
            <div className="item__overlay" onClick={this.handleClick}>
              <button>View →</button>
            </div>
          </div>
        </section>
      </ViewImageStyles>
    );
  }
}

class ViewImagePort extends Component {
  state = {
    imageDisplay: false,
    overlayImage: this.props.item.largeImage[0]
  };

  handleClick = () => {
    let val = !this.state.imageDisplay;
    this.setState({ imageDisplay: val });
  };

  render() {
    return (
      <>
        {this.state.imageDisplay && (
          <div className="overlay open">
            <div className="overlay-inner">
              <button className="close" onClick={this.handleClick}>
                × Close
              </button>
              <br />
              <div className="overlay-img-container">
                <img
                  className="overlay-img felt"
                  src={this.state.overlayImage}
                />
                <Title>
                  <Link
                    href={{
                      pathname: '/product',
                      query: { id: this.props.item.id }
                    }}
                  >
                    <a>{this.props.item.title}</a>
                  </Link>
                </Title>
              </div>
            </div>
          </div>
        )}

        <div className={this.props.classItem}>
          <img src={this.props.item.image[0]} />
          <div className="item__overlay" onClick={this.handleClick}>
            <button>View →</button>
          </div>
        </div>
      </>
    );
  }
}

export default ViewImage;
export { ViewImagePort };

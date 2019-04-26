import React, { Component } from 'react';

class CustomFont extends Component {
  state = {
    text: '',
    font: 'Weekday-Script-Regular',
    loading: false,
    image: ''
  };

  onChange = e => {
    const { value } = e.target;
    let val;
    switch (value) {
      case 'lavanderia':
        val = fontObj.lavanderia;
        break;
      case 'almibar':
        val = fontObj.almibar;
        break;

      case 'brusher':
        val = fontObj.brusher;
        break;

      case 'dessertMenuScript':
        val = fontObj.dessertMenuScript;
        break;

      case 'weekdayScript':
        val = fontObj.weekdayScript;
        break;

      case 'sophia':
        val = fontObj.sophia;
        break;

      case 'sanelma':
        val = fontObj.sanelma;
        break;

      case 'alexBrush':
        val = fontObj.alexBrush;
        break;
    }

    this.setState({ image: val });
  };

  render() {
    return (
      <>
        <img src={this.state.image} />

        <select
          onChange={e => {
            e.persist();
            this.onChange(e);
          }}
        >
          <option value="lavanderia">Lavanderia</option>
          <option value="almibar">Almibar</option>
          <option value="brusher">Brusher</option>
          <option value="dessertMenuScript">Dessert Menu Script</option>
          <option value="weekdayScript">Weekday Script</option>
          <option value="sophia">Sophia</option>
          <option value="sanelma">Sanelma</option>
          <option value="alexBrush">Alex Brush</option>
        </select>
      </>
    );
  }
}

export default CustomFont;

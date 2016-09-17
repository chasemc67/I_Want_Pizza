import React, { Component } from 'react';

export default class Pizza extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      {this.props.toppings.map(function (topping) {
        return <div className="pizzaTopping"> {topping} </div>
      })}
      </div>
    );
  }
}

Pizza.propTypes = {
    toppings: React.PropTypes.array
}

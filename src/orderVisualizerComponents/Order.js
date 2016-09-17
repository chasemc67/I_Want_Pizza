import React, { Component } from 'react';
import Pizza from "./Pizza"

export default class Order extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <div className="PizzaOrderDiv">
            Location: {this.props.location}
            {this.props.pizzas.map(function (pizza) {
              return (<Pizza toppings={pizza.toppings} />);
            })}
        </div>
      );
  }
}

Order.propTypes = {
    location: React.PropTypes.string,
    pizzas: React.PropTypes.array
}

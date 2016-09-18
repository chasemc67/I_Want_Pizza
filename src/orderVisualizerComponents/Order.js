import React, { Component } from 'react';
import Pizza from "./Pizza"

export default class Order extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <div className="PizzaOrderDiv">
            Your order: <br/>
            Location: {this.props.location}
            {this.props.pizzas.map(function (pizza) {
              return (
                <div className="PizzaInOrder">
                  <br />
                  Pizza:
                  <Pizza toppings={pizza.toppings} />

                </div>
              );

            })}
        </div>
      );
  }
}

Order.propTypes = {
    location: React.PropTypes.string,
    pizzas: React.PropTypes.array
}

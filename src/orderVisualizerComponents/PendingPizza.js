import React, { Component } from 'react';

import Pizza from "./Pizza";

export default class PendingPizza extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.pizza.toppings || this.props.pizza.toppings.length === 0) {
      return (<div />);
    }
    return (
      <div className="PendingPizza">
        Pending Pizza:
        <Pizza toppings={this.props.pizza.toppings} />
        ====================================
      </div>
    );
  }
}

PendingPizza.propTypes = {
    pizza: React.PropTypes.object
}

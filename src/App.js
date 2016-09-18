import React, { Component } from 'react';
import QueryComponent from "./components/QueryComponent";
import Agent from "./Agent";

import Order from "./orderVisualizerComponents/Order";
import PendingPizza from "./orderVisualizerComponents/PendingPizza"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Engineering 5, Waterloo",
      pizzas: [],
      pendingPizza: { toppings:[]}
    };

    this.parseAgentResponse = this.parseAgentResponse.bind(this);
    this.Agent = new Agent();
  }

  parseAgentResponse(response) {
    console.log("Agent response was: ");
    console.log(response);

    switch(response.action) {
      case "orderDefaultPizza":
        this.setState({pendingPizza: {toppings: ["pepperoni"]}});
        break;

      case "orderSpecificPizza":
        switch(response.parameters.type) {
          case "hawaiian":
            this.setState({pendingPizza: {toppings: ["ham", "pineapple"]}});
            break;
          case "pepperoni":
            this.setState({pendingPizza: {toppings: ["pepperoni"]}});
            break;
          default:
            console.log("uncaught switch");
            break;
        }

      case "addTopping":
        
        break;

      case "removeTopping":
        break;

      case "finishAddingToppings":
        let newPizza = this.state.pendingPizza;
        let currentState = this.state;
        currentState.pizzas.push(newPizza);
        currentState.pendingPizza = {};
        this.setState(currentState);
        break;

      default:
        console.log("uncaught switch");
        break;

    }

    /* Cases
      Add new Pizza : orderDefaultPizza | orderSpecificPizza
        Adding topping : addTopping
        Remove topping : removeTopping
        finish adding pizza : finishAddingToppings
      Remove Pizza (probably need to be done with a button) - TBD
      Change location -> TBD
    */

  }

  render() {
    return (
    	<div className="root">
          <div className="container">
      		<QueryComponent Agent={this.Agent} onRecieveResponse={this.parseAgentResponse} />
          <PendingPizza pizza={this.state.pendingPizza} />
          <Order location={this.state.location} pizzas={this.state.pizzas} />
          </div>
      </div>
    );
  }
}

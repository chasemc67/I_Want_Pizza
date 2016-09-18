import React, { Component } from 'react';
import QueryComponent from "./components/QueryComponent";
import Agent from "./Agent";

import Order from "./orderVisualizerComponents/Order";
import PendingPizza from "./orderVisualizerComponents/PendingPizza";
import Prompt from "./orderVisualizerComponents/Prompt";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postalCode: "2NL 3G1",
      location: "University of Waterloo, 2NL 3G1",
      pizzas: [],
      pendingPizza: { toppings:[]},
      context: []
    };

    this.parseAgentResponse = this.parseAgentResponse.bind(this);
    this.Agent = new Agent();
  }

  parseAgentResponse(response) {
    console.log("Agent response was: ");
    console.log(response);

    this.setState({context: response.metadata.contexts})

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
          case "cheese":
            this.setState({pendingPizza: {toppings: ["cheese"]}});
            break;
          default:
            console.log("uncaught switch");
            break;
        }

      case "addTopping":
        let ourPendingPizza = this.state.pendingPizza;
        ourPendingPizza.toppings.push(response.parameters.topping);
        this.setState({pendingPizza: ourPendingPizza});
        break;

      case "removeTopping":
        let pendingPizza = this.state.pendingPizza;
        let indexOfTopping = pendingPizza.toppings.indexof(response.paramters.topping);
        if (indexOfTopping >= 0){
          pendingPizza.toppings.splice(indexOfTopping, 1);
          this.setState({pendingPizza: pendingPizza});
        }
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
          <Prompt context={this.state.context}/>
      </div>
    );
  }
}

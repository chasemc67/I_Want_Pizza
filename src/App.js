import React, { Component } from 'react';
import QueryComponent from "./components/QueryComponent";
import Agent from "./Agent";

import Order from "./orderVisualizerComponents/Order";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.parseAgentResponse = this.parseAgentResponse.bind(this);
    this.Agent = new Agent();
  }

  parseAgentResponse(response) {
    console.log("Agent response was: ");
    console.log(response);
  }

  render() {
    return (
    	<div className="root">
      		<QueryComponent Agent={this.Agent} onRecieveResponse={this.parseAgentResponse} />
          <Order location={"Engineering 5, Waterloo"} pizzas={[{toppings: ["pepperoni", "mushrooms"]}]} />
      </div>
    );
  }
}

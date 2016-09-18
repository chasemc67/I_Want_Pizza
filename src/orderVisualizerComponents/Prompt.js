// This component will prompt the user with possible things to say.
// In the future, it will even depend on context, and parse out rules for itself
// From the entity and inten json files.
import React, { Component } from 'react';

let thingsToSay;

export default class Prompt extends Component {

    arrayContainsStringWithSubstring(array, substring){
        for (let i=0; i<array.length; i++){
            if (array[i].indexOf(substring) > -1){
                return true;
            }
        }
        return false;
    }

    getData() {
        if (this.props.context.indexOf("addingpizza") > -1) {
            thingsToSay = [
                "If you're done adding toppings, say 'No'",
                "possbile toppings: ",
                "pepperoni",
                "sausages",
                "ham",
                "chicken",
                "beef",
                "bacon",
                "cheddar",
                "black olives",
                "green peppers",
                "pineapple",
                "tomatoes",
                "hot banana peppers",
                "green olives",
                "mushrooms",
                "onions"
            ];
        } else {
            thingsToSay = [
                "I want Pizza",
                "I want hawaiian Pizza"
            ];
        }
    }

    render() {
        this.getData();
        return (
            <div className="Prompt">
                <h2> Not sure what to say? how about: </h2>
                {thingsToSay.map((thing) => {
                        return <h3> {thing} </h3>
                    })
                }
            </div>
        );
    }
}

Prompt.propTypes = {
    context: React.PropTypes.array
}

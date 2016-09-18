// This is a single react component that can be used to query the agent.
// It will include a text field, and a submit button,
// But also a microphone button.
// And (for now) some getContext and deleteContext buttons

// Also contains a field for an agent response

import React, { Component } from 'react';
// var config = require("json!../config.json");
var config = {
    "apiToken": "Bearer a259334652744b8eb644b4de25a3e902",
    "apiTokenVal": "a259334652744b8eb644b4de25a3e902",

    clientAccessToken: "a259334652744b8eb644b4de25a3e902",
    developerAccessToken: "01a69384a00e4a6c980912f7eff44ba8",
    sessionID: "123456789"
};

let apiAi;

export default class QueryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {agentResponse: "", queryString: ""};

        this.handleAgentResponse = this.handleAgentResponse.bind(this);

        this.onQueryAgentString = this.onQueryAgentString.bind(this);
        this.handleQueryAgent = this.handleQueryAgent.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
        this.handleStopListening = this.handleStopListening.bind(this);
        this.getCurrentContext = this.getCurrentContext.bind(this);
        this.deleteCurrentContext = this.deleteCurrentContext.bind(this);
        this.handleStartListening = this.handleStartListening.bind(this);
    }

    onQueryAgentString(e) {
        if (e.target.value.toString()[e.target.value.toString().length-1] === '\n') {
            this.handleQueryAgent(e)
            e.target.value = "";
        }
        else { this.setState({queryString: e.target.value.toString()}); }
    }

    handleQueryAgent(e) {
        let query = {
            "query": [
                this.state.queryString
            ],

            "lang": "en",
            "sessionId": config.sessionID
        };

        this.props.Agent.queryAgent(query).then((response) => {
            e.target.value = response.result.speech;
            this.handleAgentResponse(response.result);
        });
    }

    handleAgentResponse(response) {
        this.setState({agentResponse: response.speech})
        if (response.speech !== "") {
            this.props.Agent.playTextAsVoice(response.speech);
        }
        this.props.onRecieveResponse(response);
    }

    handleStartListening(e) {
        console.log("Start listening");
        var agentConfig = {
            server: 'wss://api.api.ai:4435/api/ws/query',
            token: config.apiTokenVal, // Use Client access token there (see agent keys).
            sessionId: config.sessionID,
            onInit: function () {
                console.log("> ON INIT use config");
                apiAi.open();
            }
        };

        apiAi = new ApiAi(agentConfig);
        apiAi.init();

        apiAi.onOpen = function () {
            apiAi.startListening();
            console.log("api open Start listening");
        };

        apiAi.onResults = function (data) {

            var processResult = function (data) {
                console.log("Processing result");
                this.handleAgentResponse(data);
            }.bind(this);

            var status = data.status;
            var code;
            if (!(status && (code = status.code) && isFinite(parseFloat(code)) && code < 300 && code > 199)) {
                text.innerHTML = JSON.stringify(status);
                return;
            }
            processResult(data.result);
        }.bind(this);
    }

    handleStopListening() {
        console.log("Stop listening");
        apiAi.stopListening();
    }

    getCurrentContext() {
        this.props.Agent.getContext().then((response) => {
            console.log("Context is: ");
            console.log(response);
        });
    }

    deleteCurrentContext() {
        this.props.Agent.deleteContext().then((response) => {
            if (response === "Sucess") {
                console.log("deleted contexts");
            } else {
                console.log("Could not delete contexts");
            }
        });
    }

    playAudio() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            context = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    }

    render() {
        return (
            <div className="QueryComponent">
                <div className="agentQueryBox">
                <textarea className="queryAgent" rows={1} onInput={this.onQueryAgentString} placeholder="Ask it. You know you want to!" onSubmit={this.handleQueryAgent}></textarea>
                </div>

<<<<<<< Updated upstream

                <div className="btn-group mic-buttons" role="group" aria-label="...">
                    <button type="button" className="startListeningButton btn btn-default" onClick={this.handleStartListening}>
                        <div className="row">
                            <i className="fa fa-microphone fa-5" aria-hidden="true"/>
                        </div>
                        Start Listening
                    </button>
                    <button type="button" className="stopListeningButton btn btn-default" onClick={this.handleStopListening}>
                        <div className="row">
                            <i className="fa fa-microphone-slash fa-5" aria-hidden="true"/>
                        </div>
                        Stop Listening
                    </button>
                </div>
                <div className="qbResponse">
                    <h2>Info: {this.state.agentResponse} </h2>
                </div>
=======
                <button type="button" className="startListeningButton" onClick={this.handleStartListening}>Start Listening</button>
                <button type="button" className="stopListeningButton" onClick={this.handleStopListening}>Stop Listening</button>
                <div className="qbResponse"> <h2>Agent Output: {this.state.agentResponse} </h2> </div>
>>>>>>> Stashed changes
            </div>
        );
    }
}

<<<<<<< Updated upstream
//<button type="button" className="queryAgentButton" onClick ={this.handleQueryAgent}>Query Agent</button>
/*                
<div className="btn-group" role="group" aria-label="...">
<button type="button" className="getContextButton btn btn-default"  onClick={this.getCurrentContext}>Get Context</button>
<button type="button" className="deleteContextButton btn btn-default" onClick={this.deleteCurrentContext}>Delete Context</button>
</div>
*/
=======
//<h1>What kind of pizza would you like to order?</h1>
//<button type="button" className="queryAgentButton" onClick ={this.handleQueryAgent}>Query Agent</button>

// <button type="button" className="getContextButton" onClick={this.getCurrentContext}>Get Context</button>
// <button type="button" className="deleteContextButton" onClick={this.deleteCurrentContext}>Delete Context</button>
>>>>>>> Stashed changes

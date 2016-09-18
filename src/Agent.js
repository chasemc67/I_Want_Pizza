//var config = require("json!./config.json");
var config = {
    "apiToken": "Bearer a259334652744b8eb644b4de25a3e902",
    "apiTokenVal": "a259334652744b8eb644b4de25a3e902",

    clientAccessToken: "a259334652744b8eb644b4de25a3e902",
    developerAccessToken: "01a69384a00e4a6c980912f7eff44ba8",
    sessionID: "123456789"
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

export default class Agent {

    postJSON(url, payload) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Authorization", config.apiToken);
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`POST request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send(JSON.stringify(payload));
        });
    }

    getJSON(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Authorization", config.apiToken);
            xhr.setRequestHeader("accept", "application/json");
            xhr.responseType = "json";
            xhr.onload = function() {
                if (xhr.status === 200) {
                    typeof xhr.response === "object" ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`Get request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`Get request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send();
        });
    }

    getAndPlayAudio(text) {
        var source = context.createBufferSource();

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://45.79.137.130:8081/audio", true);
            xhr.setRequestHeader("text", text);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var audioData = xhr.response;
                    context.decodeAudioData(audioData, function(buffer){
                        source.buffer = buffer;
                        source.connect(context.destination);
                        source.start(context.currentTime);
                    });
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`Get request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`Get request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send();
        });
    }

    deleteJSON() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8081/deleteContexts", true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else if (xhr.status === 400) {
                    reject(xhr.response.message);
                } else {
                    reject(`Delete request failed with status = ${xhr.status} - ${xhr.statusText}`);
                }
            };
            xhr.onerror = function() {
                reject(`Delete request failed with status = ${xhr.status} - ${xhr.statusText}`);
            };
            xhr.send();
        });
    }

    postIntents(payload) {
        const url = "https://api.api.ai/v1/intents"

        return new Promise((resolve, reject) => {
            this.postJSON(url, payload).then((response) => {
                resolve(response);
            });
        });
    }

    getIntents() {
        const url = "https://api.api.ai/v1/intents"

        return new Promise((resolve, reject) => {
            this.getJSON(url).then((response) => {
                resolve(response);
            });
        });
    }

    getContext() {
        const url = "https://api.api.ai/v1/contexts?sessionId="+config.sessionID;

        return new Promise((resolve, reject) => {
            this.getJSON(url).then((response) => {
                resolve(response);
            });
        });
    }

    deleteContext() {
        return new Promise((resolve, reject) => {
            this.deleteJSON().then((response) => {
                resolve(response);
            });
        });
    }

    playTextAsVoice(text) {
        return new Promise((resolve, reject) => {
            this.getAndPlayAudio(text).then((response) => {
                resolve(response);
            });
        });
    }

    getTTS(text) {
        const string = text.replace(" ", "+");
        const url = "https://api.api.ai/v1/tts?v=20150910&text=Hello+world";

        console.log("Getting Text to speech");
        console.log(("Url: " + url.toString()));

        return new Promise((resolve, reject) => {
            this.getTTSFile(url).then((response) => {
                resolve(response);
            });
        });
    }

    queryAgent(payload) {
        const url = "https://api.api.ai/v1/query"
        // console.log("Querying with payload: ");
        // console.log(payload);
        return new Promise((resolve, reject) => {
            this.postJSON(url, payload).then((response) => {
                // console.log(response);
                resolve(response);
            });
        });
    }

}

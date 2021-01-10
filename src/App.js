import './App.css';
import React, {Component} from "react";
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: '',
            logs: ''
        }
        this.onEvaluate = this.onEvaluate.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {
        let browserName = "Browser"+uuidv4();
        this.connection = new WebSocket("wss://calculator-app-backend.herokuapp.com/evaluate?name="+browserName);
        this.connection.onmessage = event => {
            this.setState({
                logs: event.data
            })
        }
    }

    onTextChange(e) {
        this.setState({
            expression: e.target.value
        })
    }

    onEvaluate() {
        this.connection.send(this.state.expression)
    }

    render() {
        return (
            <div className="App">
                <h1 className="title">Shared Calculator</h1>
                <div className="Input-Box">
                    <input type="text" value={this.state.expression} onChange={this.onTextChange}/>
                    <button onClick={this.onEvaluate}>Evaluate</button>
                </div>
                <div className="Log-Box">
                    <textarea name="logs" rows="10" cols="50" value={this.state.logs}/>
                </div>
            </div>
        )
    }
}

export default App;

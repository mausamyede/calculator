import './App.css';
import React, {Component} from "react";
import * as mathjs from "mathjs";

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

    onTextChange(e) {
        this.setState({
            expression: e.target.value
        })
    }

    onEvaluate() {
        this.setState({
            logs: this.state.logs + "\n" + this.state.expression + " = " + mathjs.evaluate(this.state.expression)
        })
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

import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { bit_length } from './lib/codes'
import 'semantic-ui-css/semantic.min.css';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instruction: ""
        }
    }

    _onConvertClick = () => {
        try {
            alert(bit_length(this.state.instruction))
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Input
                        action={{ content: "Convert", onClick: this._onConvertClick, size: "huge" }}
                        focus={true}
                        label={{ content: "Instruction:", size: "small" }}
                        labelPosition="left"
                        onChange={(event, data) => this.setState({ instruction: data.value })}
                        size="big"
                    />
                </header>
            </div>
        );
    }
}

export default App;

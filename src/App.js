import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import parser from './lib/parser';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instruction: "",
            result: ""
        }
    }

    _onConvertClick = () => {
        try {
            let result = parser.parse(this.state.instruction)
            console.log(result)
            this.setState({ result })
        }
        catch (error) {
            alert(error.message);
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
                    <code>
                        {this.state.result.toString()}
                    </code>

                </header>
            </div>
        );
    }
}

export default App;

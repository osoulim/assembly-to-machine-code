import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { asm2machine, res2string } from './lib/asm2machine';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            result: {},
            output: ""
        }
    }

    _onConvertClick = () => {
        try {
            let res = asm2machine(this.state.input);
            this.setState({ result: res, output: res2string(res) });
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
                        label={{ content: "input:", size: "small" }}
                        labelPosition="left"
                        onChange={(event, data) => this.setState({ input: data.value })}
                        size="big"
                    />
                    <pre>
                        {JSON.stringify(this.state.result, null, '\t')}
                    </pre>
                    <br />

                    Hex output: {this.state.output}

                </header>
            </div>
        );
    }
}

export default App;

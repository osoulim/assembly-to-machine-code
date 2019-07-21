import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { asm2machine } from './lib/asm2machine';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            result: {}
        }
    }

    _onConvertClick = () => {
        try {
            let res = asm2machine(this.state.input);
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
                    <code>
                        {JSON.stringify(this.state.result)}
                    </code>

                </header>
            </div>
        );
    }
}

export default App;

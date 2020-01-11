import React from 'react';
import logo from './logo.svg';
import './App.css';

async function getHello() {
    return fetch('/api').then(response => response.json());
}

class App extends React.Component<void|{}, { message: string }> {
    constructor() {
        super();
        this.state = {message: 'No API call yet'};
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <button onClick={this.onGetHello.bind(this)}>Call API</button>
                <div>{this.state.message}</div>
            </div>
        );
    }

    private async onGetHello() {
        const response = await getHello();
        console.log('response',response);
        this.setState({message: response.message});
    }

}

export default App;

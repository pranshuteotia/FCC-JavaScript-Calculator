class Calculator extends React.Component {
    render() {
        return(
            <div className="calc">
                <div id="display">
                    <div className="formula-screen"></div>
                    <div className="output-screen"></div>
                </div>
                <Buttons/>
            </div>
        );
    }
}

class Buttons extends React.Component {
    render() {
        return(
            <div className="buttons-container">
                <div className="row">
                    <button value="AC" className="btn">AC</button>
                    <button value="CE" className="btn">CE</button>
                    <button value="±" className="btn">±</button>
                    <button value="/" className="btn">/</button>
                </div>
                <div className="row">
                    <button value="7" className="btn">7</button>
                    <button value="8" className="btn">8</button>
                    <button value="9" className="btn">9</button>
                    <button value="X" className="btn">X</button>
                </div>
                <div className="row">
                    <button value="4" className="btn">4</button>
                    <button value="5" className="btn">5</button>
                    <button value="6" className="btn">6</button>
                    <button value="-" className="btn">-</button>
                </div>
                <div className="row">
                    <button value="1" className="btn">1</button>
                    <button value="2" className="btn">2</button>
                    <button value="3" className="btn">3</button>
                    <button value="+" className="btn">+</button>
                </div>
                <div className="row">
                    <button value="0" className="btn">0</button>
                    <button value="." className="btn">.</button>
                    <button value="=" className="btn">=</button>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return(
            <Calculator/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
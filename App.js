let r = /,/g;

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formula: '',
            display: '0',
            lastClicked: ''
        };

        this.initialize = this.initialize.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.evaluate = this.evaluate.bind(this);
    }

    initialize() {
        this.setState({
            display: '0',
            lastClicked: '',
            formula: ''
        });
    }

    handleNumbers(e) {
        if(this.state.display === '0' && e.target.value == 0)
            return;

        else if(this.state.lastClicked === 'num') {
            this.setState({
                display: this.state.display+e.target.value,
                formula: this.state.formula+e.target.value,
                lastClicked: 'num'
            });
        }

        else {
            this.setState({
                display: e.target.value,
                formula: this.state.formula+e.target.value,
                lastClicked: 'num'
            });
        }
    }

    handleOperators(e) {
        if(this.state.lastClicked === 'ope') {
            let arr = this.state.formula.split("");
            arr.pop();
            arr.push(e.target.value);
            this.setState({
                display: e.target.value,
                lastClicked: 'ope',
                formula: arr.join("")
            });
        }

        else {
            this.setState({
                display: e.target.value,
                formula: this.state.formula+e.target.value,
                lastClicked: 'ope'
            });
        }
    }

    evaluate(e) {
        if (this.state.lastClicked === 'ope')
            return;

        else {
            this.setState({
                display: eval(this.state.formula),
                formula: this.state.formula + e.target.value + eval(this.state.formula)
            });
        }
    }
    render() {
        return(
            <div className="calc">
                <div id="display">
                    <div className="formula-screen">{this.state.formula.toString().replace(r, "")}</div>
                    <div className="output-screen">{this.state.display}</div>
                </div>
                <Buttons
                    numHandler={this.handleNumbers}
                    init={this.initialize}
                    opeHandler={this.handleOperators}
                    eval={this.evaluate}
                />
            </div>
        );
    }
}

class Buttons extends React.Component {
    render() {
        return(
            <div className="buttons-container">
                <div className="row">
                    <button value="AC" className="btn" onClick={this.props.init}>AC</button>
                    <button value="CE" className="btn">CE</button>
                    <button value="±" className="btn">±</button>
                    <button value="/" className="btn" onClick={this.props.opeHandler}>/</button>
                </div>
                <div className="row">
                    <button value="7" className="btn" onClick={this.props.numHandler}>7</button>
                    <button value="8" className="btn" onClick={this.props.numHandler}>8</button>
                    <button value="9" className="btn" onClick={this.props.numHandler}>9</button>
                    <button value="*" className="btn" onClick={this.props.opeHandler}>X</button>
                </div>
                <div className="row">
                    <button value="4" className="btn" onClick={this.props.numHandler}>4</button>
                    <button value="5" className="btn" onClick={this.props.numHandler}>5</button>
                    <button value="6" className="btn" onClick={this.props.numHandler}>6</button>
                    <button value="-" className="btn" onClick={this.props.opeHandler}>-</button>
                </div>
                <div className="row">
                    <button value="1" className="btn" onClick={this.props.numHandler}>1</button>
                    <button value="2" className="btn" onClick={this.props.numHandler}>2</button>
                    <button value="3" className="btn" onClick={this.props.numHandler}>3</button>
                    <button value="+" className="btn" onClick={this.props.opeHandler}>+</button>
                </div>
                <div className="row">
                    <button value="0" className="btn" onClick={this.props.numHandler}>0</button>
                    <button value="." className="btn">.</button>
                    <button value="=" className="btn" onClick={this.props.eval}>=</button>
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
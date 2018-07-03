let r = /,/g;

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formula: '',
            display: '0',
            lastClicked: '',
            // changedSign: false,
            sign: 'pos',
            canAddDecimal: true,
            reachedMaxLimit: false,
            preVal: ''
        };

        this.initialize = this.initialize.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.evaluate = this.evaluate.bind(this);
        // this.toggleSign = this.toggleSign.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    initialize() {
        this.setState({
            display: '0',
            lastClicked: '',
            formula: '',
            changedSign: false,
            sign: 'pos',
            canAddDecimal: true,
            reachedMaxLimit: false,
            disableClick: false
        });
    }

    handleNumbers(e) {
        if(this.state.reachedMaxLimit) {
            if(this.state.disableClick)
                return;

            let tempDisp = this.state.display;
            this.setState({
                preVal: this.state.display,
                display: 'Digit Limit Met',
                disableClick: true
            });
            setTimeout(() => this.setState({
                display: tempDisp,
                disableClick: false
            }), 1000);
        }
        else if(this.state.display === '0' && e.target.value == 0)
            return;

        else if(this.state.lastClicked === 'eval') {
            this.initialize();
            this.setState({
                display: e.target.value,
                formula: e.target.value,
                lastClicked: 'num'
            });
        }

        else if(this.state.lastClicked === 'num' || this.state.lastClicked === 'dec') {
            this.setState({
                display: this.state.display+e.target.value,
                formula: this.state.formula+e.target.value,
                lastClicked: 'num'
            });

            if(this.state.display.length > 20)
                this.setState({reachedMaxLimit:true});
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
        if(this.state.lastClicked === '')
            return;

        if(this.state.changedSign == true) {
            this.setState({
                formula: this.state.formula+")"+e.target.value,
                display: e.target.value,
                changedSign: false,
                lastClicked: 'ope'
            });
        }

        else if(this.state.lastClicked === 'ope') {
            let arr = this.state.formula.split("");
            arr.pop();
            arr.push(e.target.value);
            this.setState({
                display: e.target.value,
                lastClicked: 'ope',
                formula: arr.join("")
            });
        }

        else if(this.state.lastClicked === 'eval') {
            this.setState({
                formula: this.state.display+e.target.value,
                lastClicked: 'ope'
            });
        }

        else {
            this.setState({
                display: e.target.value,
                formula: this.state.formula+e.target.value,
                lastClicked: 'ope',
                canAddDecimal: true
            });
        }
    }

    evaluate(e) {
        if (this.state.lastClicked === 'ope' || this.state.lastClicked === '')
            return;

        else if(this.state.changedSign) {
            this.setState();
        }

        else {
            this.setState({
                display: eval(this.state.formula),
                formula: this.state.formula + e.target.value + eval(this.state.formula),
                lastClicked: 'eval'
            });
        }
    }

    /*toggleSign() {
        if(this.state.lastClicked === 'ope' || this.state.lastClicked === '') {
            this.setState({
                formula: this.state.formula+"(-",
                lastClicked: 'changesign',
                changedSign: true,
                sign: 'neg'
            });
        }

    }*/

    handleDecimal(e) {
        if(this.state.canAddDecimal && this.state.lastClicked === '') {
            this.setState({
                display: "0" + e.target.value,
                formula: this.state.formula + "0" + e.target.value,
                canAddDecimal: false,
                lastClicked: 'dec'
            });
        } else if(this.state.canAddDecimal && this.state.lastClicked === 'ope') {
            this.setState({
                display: "0"+e.target.value,
                formula: this.state.formula+"0"+e.target.value,
                canAddDecimal: false,
                lastClicked: 'dec'
            });
        } else if(this.state.canAddDecimal && this.state.lastClicked === 'num') {
            this.setState({
                display: this.state.display+e.target.value,
                formula: this.state.formula+e.target.value,
                canAddDecimal: false,
                lastClicked: 'dec'
            });
        } else if(this.state.canAddDecimal && this.state.lastClicked === 'eval') {
            this.initialize();
            this.setState({
                display: "0"+e.target.value,
                formula: "0"+e.target.value,
                canAddDecimal: false,
                lastClicked: 'dec'
            });
        } else
            return;
    }

    handleDel() {
        if(this.state.lastClicked === 'eval')
            return;

        let dispArr = this.state.display.split("");
        let formulaArr = this.state.formula.split("");

        if(dispArr.length == 1) {
            if(this.state.display !== '0') {
                this.initialize();
                return;
            }
            else
                return;
        }

        dispArr.pop();
        formulaArr.pop();

        if(dispArr.indexOf('.') == -1)
            this.setState({ canAddDecimal: true});

        this.setState({
            display: dispArr.join(""),
            formula: formulaArr.join(""),
            reachedMaxLimit: false
        });
    }

    render() {
        return(
            <div className="container">
                <div className="calc">
                    <div id="output-container">
                        <div className="formula-screen">{this.state.formula.toString().replace(r, "")}</div>
                        <div id="display">{this.state.display}</div>
                    </div>
                    <Buttons
                        numHandler={this.handleNumbers}
                        init={this.initialize}
                        opeHandler={this.handleOperators}
                        eval={this.evaluate}
                        /*togSign={this.toggleSign}*/
                        decHandler={this.handleDecimal}
                        delHandler={this.handleDel}
                    />
                </div>
                <div className="author">
                    <h1>Designed and Coded by Pranshu Teotia</h1>
                </div>
            </div>
        );
    }
}

class Buttons extends React.Component {
    render() {
        return(
            <div className="buttons-container">
                <div className="row">
                    <button id="clear" value="AC" className="btn" onClick={this.props.init}>AC</button>
                    <button value="DEL" className="ope btn" onClick={this.props.delHandler}>DEL</button>
                    {/*<button value="±" className="btn" onClick={this.props.togSign}>±</button>*/}
                    <button id="divide" value="/" className="ope btn" onClick={this.props.opeHandler}>/</button>
                </div>
                <div className="row">
                    <button id="seven" value="7" className="btn" onClick={this.props.numHandler}>7</button>
                    <button id="eight" value="8" className="btn" onClick={this.props.numHandler}>8</button>
                    <button id="nine" value="9" className="btn" onClick={this.props.numHandler}>9</button>
                    <button id="multiply" value="*" className="ope btn" onClick={this.props.opeHandler}>X</button>
                </div>
                <div className="row">
                    <button id="four" value="4" className="btn" onClick={this.props.numHandler}>4</button>
                    <button id="five" value="5" className="btn" onClick={this.props.numHandler}>5</button>
                    <button id="six" value="6" className="btn" onClick={this.props.numHandler}>6</button>
                    <button id="subtract" value="-" className="ope btn" onClick={this.props.opeHandler}>-</button>
                </div>
                <div className="row">
                    <button id="one" value="1" className="btn" onClick={this.props.numHandler}>1</button>
                    <button id="two" value="2" className="btn" onClick={this.props.numHandler}>2</button>
                    <button id="three" value="3" className="btn" onClick={this.props.numHandler}>3</button>
                    <button id="add" value="+" className="ope btn" onClick={this.props.opeHandler}>+</button>
                </div>
                <div className="row">
                    <button id="zero" value="0" className="btn" onClick={this.props.numHandler}>0</button>
                    <button id="decimal" value="." className="btn" onClick={this.props.decHandler}>.</button>
                    <button id="equals" value="=" className="btn" onClick={this.props.eval}>=</button>
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
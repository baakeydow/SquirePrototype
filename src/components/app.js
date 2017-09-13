import { h, Component } from 'preact';
import Squire from "../lib/build/squire-raw.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bold: false,
			it: false,
			underline: false,
			textColor: 'blue',
			textSize: '16px;',
			textLink: 'https://netvibes.com',
			selected: null
		};
		this.clearHtml = this.clearHtml.bind(this);
		this.clearPreview = this.clearPreview.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	toggleBold() {
		const isBold = !this.state.bold;
		if (!this.state.selected) {
			return;
		} else if (isBold) {
			this._editor.bold();
			this.setState({bold: true});
		} else {
			this._editor.removeBold();
			this.setState({bold: false});
		}
	}

	toggleIt() {
		const isIt = !this.state.it;
		if (!this.state.selected) {
			return;
		} else if (isIt) {
			this._editor.italic();
			this.setState({it: true});
		} else {
			this._editor.removeItalic();
			this.setState({it: false});
		}
	}

	toggleUnderline() {
		const isUnderline = !this.state.underline;
		if (!this.state.selected) {
			return;
		} else if (isUnderline) {
			this._editor.underline();
			this.setState({underline: true});
		} else {
			this._editor.removeUnderline();
			this.setState({underline: false});
		}
	}

	removeAllFormatting() {
		if (!this.state.selected) {
			return;
		} else if (this._editor.hasFormat(this.state.selected)) {
			this._editor.removeAllFormatting();
			this.setState({
				bold: false,
				it: false,
				underline: false
			});
		} else {
			console.log('not formated yet');
		}
	}

	undo() {
		this._editor.undo();
	}

	redo() {
		this._editor.redo();
	}

	alignLeft() {
		this._editor.setTextAlignment('left');
	}

	alignCenter() {
		this._editor.setTextAlignment('center');
	}

	alignRight() {
		this._editor.setTextAlignment('right');
	}

	alignJustify() {
		this._editor.setTextAlignment('justify');
	}

	makeUList() {
		this._editor.makeUnorderedList();
	}

	makeOList() {
		this._editor.makeOrderedList();
	}

	increaseQuoteLevel() {
		this._editor.increaseQuoteLevel();
	}

	decreaseQuoteLevel() {
		this._editor.decreaseQuoteLevel();
	}

	rmList() {
		this._editor.removeList();
	}

	printHtml() {
		if (this._editor) {
			const nodes = this._editor.getDocument().getElementsByClassName('clientView')[0].childNodes;
			nodes.forEach((node) => {
				document.getElementById('render').innerText += node.outerHTML;
			});
		}
	}

	preview() {
		if (this._editor) {
			const nodes = this._editor.getDocument().getElementsByClassName('clientView')[0].childNodes;
			nodes.forEach((node) => {
				document.getElementById('preview').innerHTML += node.innerHTML;
			});
		}
	}

	clearHtml() {
		document.getElementById('render').innerText = '';
	}

	clearPreview() {
		document.getElementById('preview').innerHTML = '';
	}

	setTextColour() {
		if (this.state.selected) {
			this._editor.setTextColour(this.state.textColor);
		}
	}

	setFontSize() {
		if (this.state.selected) {
			this._editor.setFontSize(this.state.textSize);
		}
	}

	makeLink() {
		this._editor.makeLink(this.state.textLink, { target: '_blank' });
	}

	handleChange(event) {
		var color = event.target.name === 'textColor' ? event.target.value : this.state.textColor;
		var size = event.target.name === 'textSize' ? event.target.value : this.state.textSize;
		var tLink = event.target.name === 'textLink' ? event.target.value : this.state.textLink;
		this.setState({
			textColor: color,
			textSize: size,
			textLink: tLink
		});
	}

	componentDidMount() {
		var node = document.getElementById('textEditor');
		this._editor = new Squire(node);
		this.setState({
			bold: false,
			it: false,
			underline: false,
			textColor: 'blue',
			textSize: '16px;',
			textLink: 'https://netvibes.com',
			selected: null
		})
		// config
		this._editor.setConfig({
			blockTag: 'P', // making a new <p> on enter key
			blockAttributes: { style: 'font-size: 16px;'}
		});
		// init
		this._editor.setHTML("<textarea>");
		// events
		this._editor.addEventListener("input", function(event) {
			this.clearHtml();
			this.clearPreview();
		}.bind(this));
		this._editor.addEventListener("select", function(event) {
			var selected = this._editor.getSelectedText()
			this.setState({selected: selected});
			console.log(this.state.selected);
		}.bind(this));
		this._editor.addEventListener("blur", function(event) {
			if (this.state.selected) {
				console.log(this._editor.getFontInfo());
			}
		}.bind(this));
		this._editor.addEventListener("pathChange", function(event) {
			console.log("pathChange");
			console.log(this._editor.getPath());
			console.log("pathChange");
		}.bind(this));
	}

	componentWillMount() {
		console.log('yay');
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h1>Hello Squire !</h1>
				<div className="ContentCenter">
					<div className="row">
						<button onClick={this.setTextColour.bind(this)} className="btn" style={{marginLeft: '40px'}}>setTextColour</button>
						<select style={{marginLeft: '5px'}} onChange={this.handleChange}  placeholder={this.state.textColor} name="textColor" type="text">
							<option value="blue">blue</option>
							<option value="red">red</option>
							<option value="black">black</option>
							<option value="yellow">yellow</option>
						</select>
						<button onClick={this.makeLink.bind(this)} className="btn" style={{marginLeft: '40px'}}>MakeLink</button>
						<input onChange={this.handleChange} name="textLink" type="text" placeholder={this.state.textLink}/>
						<button onClick={this.setFontSize.bind(this)} className="btn" style={{marginLeft: '40px'}}>setTextSize</button>
						<select style={{marginLeft: '5px'}} onChange={this.handleChange}  placeholder={this.state.textSize} name="textSize" type="text">
							<option value="9px">9</option>
							<option value="12px">12</option>
							<option value="16px">16</option>
							<option value="20px">20</option>
							<option value="30px">30</option>
							<option value="40px">40</option>
						</select>
						<button onClick={this.removeAllFormatting.bind(this)} className="btn btn-danger" style={{marginLeft: '40px'}}>RemoveAllFormatting</button>
						<button onClick={this.undo.bind(this)} className="btn btn-info">Undo</button>
						<button onClick={this.redo.bind(this)} className="btn btn-success">Redo</button>
						<button onClick={this.printHtml.bind(this)} className="btn btn-warning">PrintSelectionInHtml</button>
						<button onClick={this.preview.bind(this)} className="btn btn-warning">Preview</button>
					</div>
				</div>
				<div className="row ContentCenter" style={{marginTop: '40px'}}>
					<div className="col-xs-2">
						<div className="row">
							<div class="col">
								<button className="list-group-item" onClick={this.toggleBold.bind(this)}>Bold</button>
								<button className="list-group-item" onClick={this.toggleIt.bind(this)}>Italic</button>
								<button className="list-group-item" onClick={this.toggleUnderline.bind(this)}>Underline</button>
							</div>
							<div class="col">
								<button className="list-group-item" onClick={this.alignLeft.bind(this)}>Left</button>
								<button className="list-group-item" onClick={this.alignCenter.bind(this)}>Center</button>
								<button className="list-group-item" onClick={this.alignRight.bind(this)}>Right</button>
								<button className="list-group-item" onClick={this.alignJustify.bind(this)}>Justify</button>
							</div>
							<div class="col">
								<button className="list-group-item" onClick={this.makeUList.bind(this)}>MakeUList</button>
								<button className="list-group-item" onClick={this.makeOList.bind(this)}>MakeOList</button>
								<button className="list-group-item" onClick={this.rmList.bind(this)}>RemoveList</button>
							</div>
							<div class="col">
								<button className="list-group-item" onClick={this.increaseQuoteLevel.bind(this)}>IncreaseQuoteLevel</button>
								<button className="list-group-item" onClick={this.decreaseQuoteLevel.bind(this)}>DecreaseQuoteLevel</button>
							</div>
						</div>
					</div>
					<div className="col-xs-6 col-md-8 editorWrapper">
						<div style={{minHeight: '200px'}} id="textEditor" className="clientView">
						</div>
					</div>
				</div>
				<pre id="render">
				</pre>
				<div id="preview">
				</div>
			</div>
		);
	}
}

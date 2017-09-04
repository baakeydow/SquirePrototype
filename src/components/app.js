import { h, Component } from 'preact';
import Squire from "../lib/build/squire-raw.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bold: false,
			it: false,
			underline: false,
			selected: null
		};
	}

	toggleBold() {
		const isBold = !this.state.bold;
		if (!this.state.selected) {
			return;
		} else if (isBold) {
			this.state.editor.bold(this.state.selected);
			this.state.bold = true;
		} else {
			this.state.editor.removeBold(this.state.selected);
			this.state.bold = false;
		}
	}

	toggleIt() {
		const isIt = !this.state.it;
		if (!this.state.selected) {
			return;
		} else if (isIt) {
			this.state.editor.italic(this.state.selected);
			this.state.it = true;
		} else {
			this.state.editor.removeItalic(this.state.selected);
			this.state.it = false;
		}
	}

	toggleUnderline() {
		const isUnderline = !this.state.underline;
		if (!this.state.selected) {
			return;
		} else if (isUnderline) {
			this.state.editor.underline(this.state.selected);
			this.state.underline = true;
		} else {
			this.state.editor.removeUnderline(this.state.selected);
			this.state.underline = false;
		}
	}

	removeAllFormatting() {
		if (!this.state.selected) {
			return;
		} else if (this.state.editor.hasFormat(this.state.selected)) {
			this.state.editor.removeAllFormatting(this.state.selected);
			this.state.bold = false;
			this.state.it = false;
			this.state.underline = false;
		} else {
			console.log('not formated yet');
		}
	}

	undo() {
		this.state.editor.undo();
	}
	redo() {
		this.state.editor.redo();
	}
	alignLeft() {
		this.state.editor.setTextAlignment('left');
	}
	alignCenter() {
		this.state.editor.setTextAlignment('center');
	}
	alignRight() {
		this.state.editor.setTextAlignment('right');
	}
	alignJustify() {
		this.state.editor.setTextAlignment('justify');
	}

	componentDidMount() {
		var node = document.getElementById('textEditor');
		this.setState({
			editor: new Squire(node),
			bold: false,
			it: false,
			underline: false,
			selected: null
		})
		// config
		this.state.editor.setConfig({
			blockAttributes: { style: 'font-size: 16px;'}
		});
		// init
		this.state.editor.setHTML("<textarea>");
		// events
		this.state.editor.addEventListener("select", function(event) {
			this.state.selected = this.state.editor.getSelectedText();
			console.log(this.state.selected);
		}.bind(this));
		this.state.editor.addEventListener("blur", function(event) {
			if (this.state.selected) {
				console.log(this.state.editor.getFontInfo());
			}
		}.bind(this));
		this.state.editor.addEventListener("pathChange", function(event) {
			console.log("pathChange");
			console.log(this.state.editor.getPath());
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
					<button onClick={this.toggleBold.bind(this)} className="btn btn-primary">Bold</button>
					<button onClick={this.toggleIt.bind(this)} className="btn btn-success">Italic</button>
					<button onClick={this.toggleUnderline.bind(this)} className="btn btn-info">Underline</button>
					<button onClick={this.alignLeft.bind(this)}>Left</button>
					<button onClick={this.alignCenter.bind(this)}>Center</button>
					<button onClick={this.alignRight.bind(this)}>Right</button>
					<button onClick={this.alignJustify.bind(this)}>Justify</button>
					<button onClick={this.removeAllFormatting.bind(this)} className="btn btn-danger" style={{marginLeft: '80px'}}>RemoveAllFormatting</button>
					<button onClick={this.undo.bind(this)} className="btn">Undo</button>
					<button onClick={this.redo.bind(this)} className="btn">Redo</button>
				</div>
				<div className="editorWrapper">
					<div style={{minHeight: '200px'}} id="textEditor">
					</div>
				</div>
			</div>
		);
	}
}




//
//
//
// this.state.editor.addEventListener("focus", function(event) {
// // 	console.log("Focused");
// }.bind(this));
// this.state.editor.addEventListener("input", function(event) {
// 	// console.log(this.state.editor.getPath());
// }.bind(this));
// this.state.editor.addEventListener("pathChange", function(event) {
// // 	console.log("pathChange");
// // 	console.log(this.state.editor.getPath());
// // 	console.log("pathChange");
// }.bind(this));

import { h, Component } from 'preact';

export default class App extends Component {
	constructor(props) {
	  super(props);
	}
	componentDidMount() {
		var node = document.getElementById('textEditor');
		var editor = new Squire(node);
		editor.setConfig({
			blockAttributes: { style: 'font-size: 16px; height: 100px; border-style:solid;'}
		});
		editor.setHTML("<textarea>");
		console.log(editor);
	}
	render() {
		return (
			<div class="app">
				<h1>Hello Squire !</h1>
				<div style={{margin: '40px'}} id="textEditor">
				</div>
			</div>
		);
	}
}

import * as React from 'react';

export default class CommentForm extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {author: '', text: ''};
	}

	public handleAuthorChange(e) {
		this.setState({author: e.target.value});
	}

	public handleTextChange(e) {
		this.setState({text: e.target.value});
	}

	public handleSubmit(e) {
		e.preventDefault();
		let author = this.state.author.trim();
		let text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
	}

	public render() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
				<input
					type="text"
					placeholder="Your name"
					value={this.state.author}
					onChange={this.handleAuthorChange.bind(this)}
				/>
				<input
					type="text"
					placeholder="Say something..."
					value={this.state.text}
					onChange={this.handleTextChange.bind(this)}
				/>
				<input type="submit" value="Post"/>
			</form>
		);
	}
}

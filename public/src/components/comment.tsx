import * as React from 'react';

declare function Remarkable(): void;

interface CommentProps {
	author: string;
}
interface CommentState {
}

export default class Comment extends React.Component<CommentProps, CommentState> {
	public rawMarkup() {
		let md = new Remarkable();
		let rawMarkup = md.render(this.props.children.toString());
		return {__html: rawMarkup};
	}

	public render() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
			</div>
		);
	}
}

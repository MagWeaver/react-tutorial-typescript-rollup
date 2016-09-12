import * as React from 'react';
import CommentBox from './comment-box';
import Comment from './comment';

interface CommentDataItem {
	id: number;
	author: string;
	text: string;
}
interface CommentListProps {
	data: CommentDataItem[];
}
interface CommentListState {
}

export default class CommentList extends React.Component<CommentListProps, CommentListState> {
	public render() {
		let commentNodes = this.props.data.map((comment: CommentDataItem) => {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}

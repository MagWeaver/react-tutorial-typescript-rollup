import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CommentList from './comment-list';
import CommentForm from './comment-form';

interface CommentDataItem {
	id: number;
	author: string;
	text: string;
}
interface CommentBoxProps {
	url: string;
	pollInterval: number;
}
interface CommentBoxState {
	data: CommentDataItem[];
}

export default class CommentBox extends React.Component<CommentBoxProps, CommentBoxState> {
	constructor(props) {
		super(props);
		this.state = {data: []};
	}

	handleErrors(response) {
		if (!response.ok) {
			return response.json().then(function (err) {
				throw Error(err.message);
			});
		} else {
			return response;
		}
	}

	prepare(response) {
		console.info('ok?: ', response.ok);
		console.info('status: ', response.status);
		console.info('statusText: ', response.statusText);
		return response.json();
	}

	onFulfilled(data) {
		let message = ([
			'成功ハンドラで処理されました。',
			'data: ' + JSON.stringify(data, null, '  '),
		]).join('\n');
		console.log(message);
		this.setState({data: data});
	}

	onRejected(err) {
		let message = ([
			'失敗ハンドラで処理されました。',
			'error: ' + err.message,
		]).join('\n');
		console.error(err);
		console.log(message);
	}

	onRejectedPOST(err) {
		this.setState({data: this.state.data});
		this.onRejected(err);
	}

	public loadCommentsFromServer() {
		// cf. http://fetch-api-sample.azurewebsites.net/demo03.html
		fetch(this.props.url)
			.then(this.handleErrors.bind(this))
			.then(this.prepare.bind(this))
			.then(this.onFulfilled.bind(this))
			.catch(this.onRejected.bind(this));
	}

	public handleCommentSubmit(comment) {
		let comments = this.state.data;
		comment.id = Date.now();
		let newComments = comments.concat([comment]);
		this.setState({data: newComments});

		fetch(this.props.url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(comment)
		})
			.then(this.handleErrors.bind(this))
			.then(this.prepare.bind(this))
			.then(this.onFulfilled.bind(this))
			.catch(this.onRejectedPOST.bind(this));
	}

	public componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
	}

	public render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
			</div>
		);
	}
}

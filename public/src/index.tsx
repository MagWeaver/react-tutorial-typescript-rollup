/// <reference path="../../typings/index.d.ts"/>

import * as React from 'react';
import * as Redux from 'redux';
import * as ReactDOM from 'react-dom';
import CommentBox from './components/comment-box';

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);

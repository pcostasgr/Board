
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/index.js';

import CardBoard from './views/CardBoard';

render(
	<Provider store={store} >
		<CardBoard/>
	</Provider>,
	document.getElementById('root')
);


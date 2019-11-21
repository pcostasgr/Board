
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/indexStore';

import CardBoard from './Components/CardBoard';

render(
	<Provider store={store} >
		<CardBoard/>
	</Provider>,
	document.getElementById('root')
);


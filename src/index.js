
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/indexStore';
//import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import CardBoard from './Components/CardBoard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
render(
	<Provider store={store} >
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<CardBoard/>
		</MuiPickersUtilsProvider>
	</Provider>,
	document.getElementById('root')
);


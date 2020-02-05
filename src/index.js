
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store/indexStore';
import DateFnsUtils from '@date-io/date-fns';
import CardBoard from './Components/CardBoard';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MainRouter from './Components/MainRouter';

render(
	<BrowserRouter>
		<Provider store={store} >
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<MainRouter/>
			</MuiPickersUtilsProvider>
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);


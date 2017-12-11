import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import BoardActionTypes from '../actions/BoardActionTypes';
import BoardDispatcher from '../dispatcher/BoardDispatcher'; 

class BoardStores extends ReduceStore {
  constructor() {
    super(BoardDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({      
       data: []    
     });  
  }

  reduce(state, action) {
    switch (action.type) {
      case BoardActionTypes.ADD_TODO:
	console.log('Action Dispatched! '+action.text);

	return state.update('data',
			data=>data.push({
			id:data.count(),
			value:action.text
		}));

      default:
        return state;
    }
  }

}

export default new BoardStores();

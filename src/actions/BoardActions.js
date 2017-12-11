
import BoardDispatcher from '../dispatcher/BoardDispatcher';
import BoardActionTypes from '../actions/BoardActionTypes';


class BoardActions {  

  constructor(dispatcher) {    
    this.dispatcher = dispatcher;  
   }  

   addTodo(text) {    
     this.dispatcher.dispatch({      
       type:BoardActionTypes.ADD_TODO ,      
       text:text, 
     });  
   }

}

export default new BoardActions(BoardDispatcher);

import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  ADD_LIST
} from './../actions/actions'

const { SHOW_ALL } = VisibilityFilters

function lists(state=[],action){
   switch(action.type){
     case ADD_LIST:
	let listCount=state.length+1;
        return [
		...state,
		{
			listid:listCount,
			listTitle:action.listTitle,
			cardData:[]
		}
	]

     default:
      return state
   }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  lists
})

export default todoApp

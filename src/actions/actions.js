/*
 * action types
 */


export const ADD_LIST = 'ADD_LIST'
/*
 * other constants
 */


export function addList(listTitle){
	return { type:ADD_LIST ,listTitle}
}


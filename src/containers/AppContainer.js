import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import BoardStores from '../stores/BoardStores';


function getStores() {
  return [BoardStores,];
}

function getState() {
  return {
    storeState:BoardStores.getState(),
  };
}


export default Container.createFunctional(AppView, getStores, getState);


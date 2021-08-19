import userReducer from './reducers/userReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import personalReducer from './reducers/personalReducer';
import cacheReducer from './reducers/cacheReducer';
import familyPlanReducer from './reducers/familyPlanReducer';
import invitationReducer from './reducers/invitationReducer';

const reducer = combineReducers({
  user: userReducer,
  personalExpenses: personalReducer,
  cache: cacheReducer,
  familyPlanReducer: familyPlanReducer,
  invitationReducer: invitationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

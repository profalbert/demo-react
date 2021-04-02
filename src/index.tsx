import * as serviceWorker from './serviceWorker'
import store from './redux/redux-store'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
) // используем в данном случае (пока так) HashRouter для правильной работы URL в браузере на хостинге, вместо BrowserRouter: (<BrowserRouter basename="/appReact">)

// делаем свою перерисовку, как в redux (на подобии)
/* const rerenderEntireTree = (state) => {
	ReactDOM.render(
		<BrowserRouter>
			<Provider store={store}>
			 <App store={store} dispatch={store.dispatch.bind(store)}/>
			</Provider>
		</BrowserRouter>, document.getElementById('root')
	);
}

rerenderEntireTree(store.getState());
store.subscribe(() => {
 const state = store.getState();
	rerenderEntireTree(state);
}); */

/*  
 Это мы написали свой provider, сейчас используем из библиотеки react-redux

 import React from 'react';
 const StoreContext = React.createContext(null);

 export const Provider = (props) => {
 	return (
 		<StoreContext.Provider value={props.store}>
 			{
 			 props.children
 			}
 		</StoreContext.Provider>	
 	);
 }

 export default StoreContext;
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()

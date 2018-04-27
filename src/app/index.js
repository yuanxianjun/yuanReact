/**
 * Created by mapbar_front on 2017/11/18.
 */

import React,{ Component } from 'react';
import { render } from 'react-dom';
import Main from './pages/Main';
import './css/common.css';
import 'antd/dist/antd.css'


//注入redux
import reducers from './reducers/combineReducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const store = createStore(reducers);
console.log(store.getState());

class App extends Component{
    render(){
        return (
            <div className="fx1 wrapper">
                <Provider store={store}>
                    <Main />
                </Provider>
            </div>
        )
    }
}
render(<App />,document.getElementById('root'));



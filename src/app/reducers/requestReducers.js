/**
 * Created by mapbar_front on 2018/4/19.
 */

//维护一个数据请求的状态
import { REQUEST_START, REQUEST_SUC, REQUEST_FAIL } from '../actions/type';
const defaultState = {

};


export default function homeReducer(state=defaultState,action) {
    switch (action.type){
        case REQUEST_START:
            return Object.assign({},state,action.homeData);
            break;
        case REQUEST_SUC:
            return Object.assign({},state,action.homeData);
            break;
        case REQUEST_FAIL:
            return Object.assign({},state,action.homeData);
            break;
        default:
            return state
    }
}

/**
 * Created by mapbar_front on 2018/3/26.
 */

//用户状态相关的信息维护
import { USERLOGIN, CHANGEPSD , USERLOGINOUT } from '../actions/type';
const defaultUserInfo = {

};
export default function userReducer(state = defaultUserInfo,action) {
    switch (action.type){
        case USERLOGIN:
            return Object.assign({},state,action.userInfo);
            break;
        case CHANGEPSD:
            return Object.assign({},state,action.userInfo);
            break;
        case USERLOGINOUT:
          return {};
          break;
        default:
            return state
    }
}

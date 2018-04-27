/**
 * Created by mapbar_front on 2018/3/26.
 */
import { USERLOGINOUT, USERLOGIN } from "./type";

export function userLoginOut(){
  return {
    type: USERLOGINOUT
  }
}

export function userLogin(userInfo){
  return {
    type: USERLOGIN,
    userInfo: userInfo
  }
}

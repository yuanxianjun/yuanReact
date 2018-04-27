/**
 * Created by mapbar_front on 2018/4/15.
 */
import Config from '../config';

const serviceUrl = Config.baseUrl;

import RequestService from './RequestService';

function makeUrl(baseUrl) {
    return serviceUrl + baseUrl
}

//获取主页数据
export function getHomeData() {
    RequestService.get(makeUrl('/home'),{

    })
}


//获取分类数据

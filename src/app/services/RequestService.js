/**
 * Created by mapbar_front on 2018/4/6.
 */
import 'es6-promise';
import 'whatwg-fetch';

function isFunction(value) {
    return typeof value === 'function';
}
function isUndefined(value) {
    return typeof value === 'undefined';
}
function isString(value) {
    return typeof value === 'string';
}

function urlEncode(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}

function resultProcessor(result) {
    console.log('result',result);
    if (result.status === 200 || result.code === 200 || result.resultCode === 200) {
        console.info('success-result');
        console.info(result);
        return Promise.resolve(result.data || {noResult: true} );
    } else {
        //这里需要前台和后台，规定状态码！！！！！！！
        console.log('error-result');
        console.log(result);
        result.message = result.message || '服务器错误';

        return Promise.reject(result);
    }
}

function typeToString(obj) {
    if(obj instanceof Array){
        for(let i=0; i<obj.length; i++){
            if( obj[i] !== null && typeof obj[i] === 'object'){ typeToString(obj[i]) }else { obj[i]=String(obj[i]) }
        }
    }else if(obj instanceof Object){
        for(let key in obj ){
            if(obj[key] !== null && typeof obj[key] === 'object'){ typeToString(obj[key]) }else { obj[key]=String(obj[key]) }
        }
    }
    return obj;
}


function _fetch(fetch_promise, timeout) {
    let abort_fn = null;

    //这是一个可以被reject的promise
    let abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
            reject({ data: null, resultCode: 500, message: '请求超时，请重试！' });
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

function request(opts, processor, isUpload) {
    //1、设计fetchData的参数——核心就是得到这个url和这个options
    var url = /^(http|https):\/\//.test(opts.url) ? opts.url : (serviceUrl + opts.url),

        options = {
            method: opts.method || 'GET',
            cache: false,
            headers: new Headers()
        },queryString, formData;





    //2、GET方式一般会有下面的头部设置。
    // options.headers.append('Content-Type', 'application/json;charset=utf-8');
    // options.headers.append('Accept', 'application/json');

    //3、如果携带cookie，我们就给options添加这个。
    if (opts.credentials != 'undefined') {
        options.credentials = opts.credentials;
    }

    //4、根据options.methods不同，对data进行处理
    if(options.method === 'POST' || options.method.toUpperCase() === "POST"){
        if(opts.data instanceof FormData){
            options.body = opts.data;
            options.headers.set('Content-Type', 'multipart/form-data');
        } else {
            //post方式的请求设置。
            options.body = JSON.stringify(typeToString(opts.data));
            options.headers.set('Content-Type', 'application/json;charset=utf-8');
            options.headers.set('Accept', 'application/json');
        }
    } else if (options.method === 'GET' || options.method.toUpperCase() === 'GET'){
        if(!opts.data) opts.data = {};
        opts.data['_rid'] = new Date().getTime();
        //get方式需要字符编码
        queryString = urlEncode(opts.data);
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;
    }

    //5、获取数据的处理回调函数
    processor = processor || resultProcessor;


    console.log('###############################################');
    console.log(url)
    console.log(options)
    console.log('###############################################');

    //6、网络状态的检测。对于iphone目前还无法实现，navigator.connection.但是一般进行数据请求的时候，有ajax的status状态码，为0就是没连网。

    return _fetch(
        fetch(url, options)
            .then(response => response.json())
            .then(function (res) {

                //这里可以添加拦截器
                // if(!isInterceptAlerting){
                //     interceptors.forEach((interceptor) => {
                //         res = interceptor(res);
                //     });
                // }
                return processor(res);
            })
            .catch(function (err) {
                return Promise.reject(err);
            })
        ,10000);

}

export let RequetService = {
    get: function (url, data, processor) {
        if (arguments.length === 2 && isFunction(data)) {
            processor = data;
            data = null;
        }
        return request({
            url: url,
            data: Object.assign({}, data)
        }, processor);
    },

    post: function (url, data, processor, isUpload) {
        if (isFunction(data) && arguments.length === 2) {
            isUpload = processor;
            processor = data;
            data = null;
        }
        return request({
            method: 'POST',
            url: url,
            data:  data instanceof FormData ? data : Object.assign({}, data)
        }, processor, isUpload);
    },
    request: request
};

export default RequetService;
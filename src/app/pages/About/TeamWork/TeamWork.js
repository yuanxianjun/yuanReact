/**
 * Created by mapbar_front on 2018/4/15.
 */
import React, { Component } from 'react';
import Styles from './TeamWorkStyle';
export default class TeamWork extends Component{
    render(){
        return (
            <div>
                <div className="border-bottom lineHeight40 font-title">
                    团队合作
                </div>
                <div>
                    <img style={Styles.width100} src="http://www.imooc.com/static/img/aboutus/g1.jpg" alt=""/>
                </div>
                <div className="flex-box">
                    <div style={{backgroundColor:'#1e2f41',color:'#fff'}} className="center flex1 flex-col">
                        <h2 style={{color:'#fff'}}>FOCUS</h2>
                        <p>每天专注的做着一件很牛很酷的事儿</p>
                    </div>
                    <img src="http://www.imooc.com/static/img/aboutus/g2.jpg" alt=""/>
                </div>
            </div>
        )
    }
}
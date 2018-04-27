/**
 * Created by mapbar_front on 2018/4/15.
 */
import React, { Component } from 'react';

export default class Lecturer extends Component{
    render(){
        return (
            <div>
                <div className="border-bottom lineHeight40 font-title">
                    讲师招募
                </div>
                <div>
                    <p className="margin-top">想试水尝尝网络讲师的滋味？快加入慕课网讲师队伍吧！</p>

                    <h2 className="margin-top">我们希望你：</h2>
                    <p>- 热衷分享；</p>
                    <p>- 有3年以上的大型项目开发经验；</p>
                    <p>- 至少精通前端开发技术、JAVA、Python、大数据开发、go语言开发、移动端开发，软件测试、UI设计中的一项；</p>

                    <h2 className="margin-top">你的收获：</h2>
                    <p>- 额外收入；</p>
                    <p>- 技术的沉淀与分享；</p>
                    <p>- 迅速增长的粉丝及业内知名度；</p>
                </div>
            </div>
        )
    }
}
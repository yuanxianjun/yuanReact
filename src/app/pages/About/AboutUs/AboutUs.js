/**
 * Created by mapbar_front on 2018/4/15.
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Styles from '../AboutStyle';
export default class AboutUs extends Component{
    constructor(props){
        super(props);
        this.state = {
            aboutUs:[
                {title: '什么是慕课（MOOC）',content:'源于国外，Massive（大规模）Open（开放）Online（在线）Course（课程）。'},
                {title:'慕课网是什么MOOC',content:'专注做好IT技能教育的MOOC，符合互联网发展潮流接地气儿的MOOC。我们免费，我们只教有用的，我们专心做教育。'},
                {title:'为什么做慕课网',content:'慕课网的小伙伴希望所有热爱互联网的同学能更加便捷的获取学习资源，用互联网思维改变我们的学习。我们提供最新的知识，帮你应对变化的世界！'},
                {title:'慕课网在做什么',content:'做更多实用的课程，做更好体验的产品，研究更牛的技术！'},
                {title:'慕课网的追求是什么',content:'让更多热爱互联网的同学来慕课网学习，多年以后，圈子里一批技术牛说：我在慕课网学习过，这就够了。'},
                {title:'慕课网是谁',content:'慕课网隶属于北京奥鹏文化传媒有限公司，是一家从事互联网在线教学的网络教育企业。秉承“开拓、创新、公平、分享”的精神，将互联网特性全面的应用在教育领域，致力于为教育机构及求学者打造一站在线互动学习的教育品牌。'},
            ]
        }
    }
    render(){
        return (
            <div>
                <div className="border-bottom lineHeight40 font-title">
                    关于我们
                </div>
                <div>
                    {
                        this.state.aboutUs.map((item,index)=>{
                            return (
                                <div key={index} className="flex-box margin-top">
                                    <div style={Styles.iconBox}><Icon type="form" /></div>
                                    <div className="flex-box flex-col flex1">
                                        <p>{item.title}</p>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}
/**
 * Created by mapbar_front on 2018/4/3.
 */
import React, { Component } from 'react';
import { Router, NavLink, Route, Switch } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Styles from './AboutStyle';

import AboutUs from './AboutUs/AboutUs';
import TeamWork from './TeamWork/TeamWork';
import EnterpriseCooperation from './EnterpriseCooperation/EnterpriseCooperation';
import Job from './Job/Job';
import Lecturer from './Lecturer/Lecturer';
import ContactUs from './ContactUs/ContactUs';
import FriendshipLink from './FriendshipLink/FriendshipLink';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class About extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <Router history={this.props.history}>
                <div className="center margin-top">
                    <div className="width1200 boxSizing flex-box">

                        <div className="boxSizing width200">
                            <Menu>
                                <Menu.Item key="1"><NavLink to="/about/aboutus">关于我们</NavLink></Menu.Item>
                                <Menu.Item key="2"><NavLink to="/about/teamwork">团队介绍</NavLink></Menu.Item>
                                <Menu.Item key="3"><NavLink to="/about/enterpriseCooperation">企业合作</NavLink></Menu.Item>
                                <Menu.Item key="4"><NavLink to="/about/job">人才招聘</NavLink></Menu.Item>
                                <Menu.Item key="5"><NavLink to="/about/lecturer">讲师招募</NavLink></Menu.Item>
                                {/*<Menu.Item key="6"><NavLink to="/about/contactus">联系我们</NavLink></Menu.Item>*/}
                                <Menu.Item key="7"><NavLink to="/about/friendshiplink">友情链接</NavLink></Menu.Item>
                            </Menu>
                        </div>
                        <div className="margin-left flex1">
                            <Switch>
                                <Route path="/about/aboutus" component={AboutUs} />
                                <Route path="/about/teamwork" component={TeamWork} />
                                <Route path="/about/enterpriseCooperation" component={EnterpriseCooperation} />
                                <Route path="/about/job" component={Job} />
                                <Route path="/about/lecturer" component={Lecturer} />
                                <Route path="/about/contactus" component={ContactUs} />
                                <Route path="/about/friendshiplink" component={FriendshipLink} />
                                <Route component={AboutUs} />
                            </Switch>
                        </div>

                    </div>
                </div>
            </Router>
        )
    }
}

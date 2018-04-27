/**
 * Created by mapbar_front on 2018/3/26.
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch,NavLink } from 'react-router-dom';

import { Layout, Menu, Icon, Modal, BackTop, Avatar, Dropdown } from 'antd';

import Home from './Home/Home';
import MyCareer from './MyCareer/MyCareer';
import FreeCourse from './FreeCourse/FreeCourse';
import ProjectExcise from './ProjectExcise/ProjectExcise';
import About from './About/About';
import VedioDetail from './VedioDetail/VedioDetail';

import WrappedNormalLoginForm from './components/LoginForm/LoginForm';
import WrappedNormalRegisterForm from './components/RegisterForm/RegisterForm';

import Actions from '../actions/index';

import '../css/Main.css';

import { connect } from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;

import Styles from './MainStyle';
import Config from '../config';
const serviceUrl = Config.baseUrl;
const NavList = Config.navConfig || [];
const LinkConfig = Config.LinkConfig || [];
class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            isShowModal: false,
            isLogin: true
        }
    }

    ModalCancel(){
        this.setState({
            isShowModal:false
        })
    }
    /**
     * 这里要写登录逻辑。
     */
    loginEvent(values){

      var data = new FormData();
      data.append('username',values.username);
      data.append('password',values.password);
      fetch(serviceUrl+'/login.php',{
        method: 'POST',
        body: data
      }).then((res)=>res.json()).then((data)=>{
        console.log('登录成功',data);
        this.props.dispatch(Actions.userInfo.userLogin({ username:values.username,password: values.password }))
        this.setState({
          isShowModal: false
        })
      });
    }
    /**
     * 这里要写注册逻辑。
     */
    registerEvent(values){
      var data = new FormData();
      data.append('username',values.username);
      data.append('password',values.password);
      fetch(serviceUrl+'/register.php',{
        method: 'POST',
        body: data
      }).then((res)=>{
        console.log('注册成功',data);
        this.setState({
          isShowModal: false
        })
      })
    }

    clickEvent(value){
        if(value){
            this.setState({
                isShowModal: true,
                isLogin: true
            })
        }else {
            this.setState({
                isShowModal: true,
                isLogin: false
            })
        }
    }
  loginOut(){
      this.props.dispatch(Actions.userInfo.userLoginOut());
  }
    render(){
      console.log('main',this.props);
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a onClick={()=>this.loginOut()} href="javascript:;">退出登录</a>
          </Menu.Item>
          {/*<Menu.Item key="1">*/}
            {/*<a href="http://www.taobao.com/">2nd menu item</a>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Divider />*/}
          {/*<Menu.Item key="3">3rd menu item</Menu.Item>*/}
        </Menu>
      );
        return (
            <div className="wrapper flex-box">
                <Router>
                <Layout className="bgWhite" style={{padding: 0,width: '100%'}}>
                    <Header className="flex-box border-bottom bgWhite">

                            <div className="wrapper flex-box" id="nav">
                                <div className="logo center" >
                                    <Link to='/'>
                                        <img className="logo-img" src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3836086191,221018393&fm=27&gp=0.jpg' alt=""/>
                                    </Link>
                                </div>
                                <Menu
                                    style={{ lineHeight: '62px' }}
                                    mode="horizontal"
                                >
                                    {
                                        NavList.map((item, index) => {
                                            return (
                                                <Menu.Item style={Styles.itemStyle} key={index+''}>
                                                    <Icon type={item.type} />
                                                    <span className="nav-text">{item.title}</span>
                                                    <Link style={Styles.linkStyle} to={item.path}/>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </Menu>
                              {
                                !this.props.state.userInfo.username ? <div className="nav-right flex-box">
                                  <div className="padding-item loadApp">下载App</div>
                                  <div>
                                    <span onClick={()=>this.clickEvent(1)} className="padding-item login">登录</span>
                                    <span className="padding-item">/</span>
                                    <span onClick={()=>this.clickEvent(0)} className="padding-item register">注册</span>
                                  </div>
                                </div> : <div className='center nav-right flex-box'>
                                  <Avatar className='margin-right' size="large" icon="user" />
                                    {this.props.state.userInfo.username}
                                  <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#">
                                      <Icon type="down" />
                                    </a>
                                  </Dropdown>
                                </div>
                              }

                            </div>


                    </Header>
                    <Content>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/freecourse" component={FreeCourse} />
                            <Route path="/macareer" component={MyCareer}/>
                            <Route path="/project" component={ProjectExcise} />
                            <Route path="/about" component={About} />
                            <Route path="/detail" component={VedioDetail} />
                            <Route component={ProjectExcise} />
                        </Switch>
                    </Content>
                    <Footer className="border-top">
                        <div>
                            <BackTop />
                        </div>
                        <ul className="flex-box">
                            {
                                LinkConfig.map((item,index) => {
                                    return <NavLink
                                        to="/about"
                                        style={Object.assign({},((index == 0) ? {} : Styles.LiStyle),{cursor: 'pointer',color:'#999999'}) }
                                        key={index}
                                    >{item}</NavLink>
                                })
                            }
                        </ul>
                        <p>Copyright © 2018 imooc.com All Rights Reserved | 京ICP备 12003892号-11</p>
                    </Footer>

                    {/*用户登录注册Modal模态框*/}
                    <Modal
                        style={{width:'300px'}}
                        className='center'
                        visible={this.state.isShowModal}
                        title={this.state.isLogin?'用户登录':'用户注册'}
                        footer={null}
                        onCancel={()=>this.ModalCancel()}
                    >
                        {
                            this.state.isLogin?
                                <WrappedNormalLoginForm
                                    loginEvent = {(value)=>this.loginEvent(value)}
                                    goRegister = {()=>this.clickEvent(0)}
                            />: <WrappedNormalRegisterForm
                                    registerEvent = {(value)=>this.registerEvent(value)}
                                    goLogin = {()=>this.clickEvent(1)}
                            />
                        }

                    </Modal>
                </Layout>
                </Router>
            </div>
        )
    }
}


export default connect((state)=>{
  return {
    state: state
  }
})(Main);

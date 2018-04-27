/**
 * Created by mapbar_front on 2018/3/27.
 */
import React, {Component} from 'react';
import {Carousel, Avatar, Icon, Pagination} from 'antd';
import VideoComponent from '../../components/VideoContainer/VideoComponent';
import Styles from './HomeStyles';
import '../../css/Main.css';
import Config from '../../config';

const TypeList = Config.careerListConfig;
const serviceUrl = Config.baseUrl;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {},
      Recommand: {newArr: [], titleName: null},
      newCourse: {newArr: [], titleName: null},
      skill: {newArr: [], titleName: null},
      Recommand1: {newArr: [], titleName: null},
      Recommand2: {newArr: [], titleName: null}
    }
  }

  fetchData() {
    fetch(serviceUrl + '/index.php')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('首页数据', data);
        window.localStorage.setItem('homeData',JSON.stringify(data));
        this.setState({
          Recommand: data.ComprehensiveClassification.dataArray[0],
          newCourse: data.ComprehensiveClassification.dataArray[1],
          skill: data.ComprehensiveClassification.dataArray[2],
          Recommand1: data.ComprehensiveClassification.dataArray[3],
          Recommand2: data.ComprehensiveClassification.dataArray[4],
        })
      })
  }
  componentDidMount() {
    this.addEventListener();
    this.updateViewport();
    //缓存接口数据，无法得到的情况下，进行fetchdata
    var data = window.localStorage.getItem('homeData');
    if(data){
      data = JSON.parse(data);
      this.setState({
        Recommand: data.ComprehensiveClassification.dataArray[0],
        newCourse: data.ComprehensiveClassification.dataArray[1],
        skill: data.ComprehensiveClassification.dataArray[2],
        Recommand1: data.ComprehensiveClassification.dataArray[3],
        Recommand2: data.ComprehensiveClassification.dataArray[4],
      })
    } else {
      this.fetchData();
    }
  }

  componentWillUnMount() {
    this.timer && clearTimeout(this.timer);
    this.clearEventListener()
  }

  addEventListener(next) {
    let _this = this;
    window.onscroll = function () {
      _this.updateViewport();
    };
    window.onresize = function () {
      _this.updateViewport();
    };
  }

  clearEventListener() {
    window.onscroll && (window.onscroll = '');
    window.onresize && (window.onresize = '');
  }

  //使用函数节流的方式进行
  updateViewport() {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(window.pageYOffset, window.innerHeight);
      this.setState({
        viewport: {
          top: window.pageYOffset,
          height: window.innerHeight
        }
      })
    }, 200);
  }
  goDetail(id){
    this.props.history.push('/detail',{id:id})
  }
  render() {
    return (
      <div className="wrapper autoBox bgWhite center">
        <div style={{width: '1200px'}}>
          {/*第一部分*/}
          <div className="center" style={Styles.height400}>

            <div className="flex-box" style={Object.assign({}, Styles.height400, Styles.bannerBox)}>
              <div style={Object.assign({}, Styles.width200, Styles.height400)}>
                <div style={Styles.img}>
                  <img style={Styles.img} src="http://climg.mukewang.com/5915802b0001da6206000338.jpg" alt=""/>
                </div>
                <div style={Styles.img}>
                  <img style={Styles.img} src="https://img.mukewang.com/5a5d55de00015cba05120512.jpg" alt=""/>
                </div>
              </div>
              <div className="flex1 hiddenBox">
                <div style={{height: '300px'}}>
                  <Carousel style={Styles.height300} autoplay={true}>
                    <img style={Styles.height300} src="https://img.mukewang.com/5ab37c330001fcfe09360316.jpg" alt=""/>
                    <img style={Styles.height300} src="https://img.mukewang.com/5a9d2f6b0001056209360316.jpg" alt=""/>
                    <img style={Styles.height300} src="https://img.mukewang.com/5ab8bb2f00016ea009360316.jpg" alt=""/>
                  </Carousel>
                </div>
                <div className="flex-box" style={{height: '100px'}}>
                  {
                    TypeList.map((item, index) => {
                      return (
                        <div key={index} style={{alignItems: 'center', marginTop: '5px'}}
                             className="flex1 flex-box flex-col">
                          <Avatar size="large" icon={item.icon}/>
                          <p>{item.work}</p>
                          <p className="font-note">{item.detail}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          {/*第二部分*/}
          <div>
            <div className="center" style={Styles.height64}><Icon type="loading"/><h3
              className="padding">{this.state.Recommand.titleName || '实战推荐'}</h3><Icon type="loading"/></div>
            <div className="flex-box spaceBetween">
              {
                this.state.Recommand.newArr.map((item, index) => {
                  return (
                    <VideoComponent onClick={(id)=>{this.goDetail(id)}} viewport={this.state.viewport} key={index} item={item}></VideoComponent>
                  )
                })
              }

            </div>
          </div>

          {/*第三部分*/}
          <div>
            <div className="center" style={Styles.height64}><Icon type="loading"/><h3
              className="padding">{this.state.newCourse.titleName}</h3><Icon type="loading"/></div>
            <div className="flex-box spaceBetween flex-wrap">
              {
                this.state.newCourse.newArr.map((item, index) => {
                  return (
                    <VideoComponent onClick={(id)=>{this.goDetail(id)}} viewport={this.state.viewport} key={index} item={item}></VideoComponent>
                  )
                })
              }

            </div>
          </div>

          {/*第四部分*/}
          <div>
            <div className="center" style={Styles.height64}><Icon type="loading"/><h3
              className="padding">{this.state.skill.titleName}</h3><Icon type="loading"/></div>
            <div className="flex-box spaceBetween flex-wrap">
              {
                this.state.skill.newArr.map((item, index) => {
                  return (
                    <VideoComponent onClick={(id)=>{this.goDetail(id)}} viewport={this.state.viewport} key={index} item={item}></VideoComponent>
                  )
                })
              }

            </div>
          </div>

          {/*第五部分*/}
          <div>
            <div className="center" style={Styles.height64}><Icon type="loading"/><h3
              className="padding">{this.state.Recommand1.titleName}</h3><Icon type="loading"/></div>
            <div className="flex-box spaceBetween flex-wrap">
              {
                this.state.Recommand1.newArr.map((item, index) => {
                  return (
                    <VideoComponent onClick={(id)=>{this.goDetail(id)}} viewport={this.state.viewport} key={index} item={item}></VideoComponent>
                  )
                })
              }

            </div>
          </div>
        </div>

      </div>
    )
  }
}

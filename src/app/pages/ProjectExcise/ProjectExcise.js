/**
 * Created by mapbar_front on 2018/3/27.
 */
import React,{ Component } from 'react';
import Styles from './ProjectExciseStyle';
import Config from '../../config';
import { Pagination } from 'antd';
import VideoComponent from '../../components/VideoContainer/VideoComponent';


const typeConfig = Config.directionConfig;
const serviceUrl = Config.baseUrl;
export default class ProjectExcise extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [
                {title:'系统学习Docker 践行De',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img1.mukewang.com/szimg/5a9614850001bc3405400300.jpg'},
                {title:'微信小程序入门与实战',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img2.mukewang.com/szimg/5a7279250001e10705400300.jpg'},
                {title:'Go语言语法入门篇',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img.mukewang.com/5aaf5f370001c40306000338-240-135.jpg'},
                {title:'Elastic Stack从入门到实战',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img2.mukewang.com/szimg/5a7441e30001d4f805400300.jpg'},
                {title:'Java企业级电商项目架构演进之路',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img1.mukewang.com/szimg/5a16336900014ca405400300.jpg'},
                {title:'Java高并发编程与高并发解决方案',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img4.mukewang.com/szimg/5aaa55850001a3ef10800600.jpg'},
                {title:'Ruff物联网应用开发入门',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img3.mukewang.com/5aa77f4c0001f0a706000338-240-135.jpg'},
                {title:'Spring Cloud微服务实战',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img2.mukewang.com/szimg/5a9ca4e80001786305400300.jpg'},
                {title:'IOS开发之网络协议',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img.mukewang.com/5aaf826f00017e6306000338-240-135.jpg'},
                {title:'基于Python玩转人工智能最火框架',type:'实战',lever:'高级',price:'366.00',imgSrc:'https://img3.mukewang.com/szimg/5a5ddeda000145b405400300.jpg'},
            ],
          AllDataList:[],
          ProjectList:[],
          titleList: [],
          typeList: [],
          currentIndex: 0
        }
    }
  fetchData(type,index){
      if(index){
        this.setState({
          currentIndex:index
        })
      }
    fetch(serviceUrl + '/classification.php?c='+type)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log('分类数据获取',data);
        if(data.status == 200){
          // window.localStorage.setItem('classifyData',JSON.stringify(data));
          this.setData(data);
        }
      })
  }
  setData(data){
    this.setState({
      AllDataList: data.data.newArr,
      ProjectList: data.data.newArr.slice(0,10),
      typeList: data.data.res
    });
    if(data.dataArr){
      this.setState({
        titleList: data.dataArr
      })
    }
  }
    componentDidMount(){
      this.fetchData('all');
    }
  pageChangeEvent(pageNum,pageSize){
    this.setState({
      ProjectList: this.state.AllDataList.slice(pageNum*pageSize-10,pageNum*pageSize)
    })
  }
    render(){
        return (
            <div className="wrapper autoBox bgWhite center flex-col">
                <div style={Styles.header} className="height150">
                    <img style={Styles.headerImg} src="https://coding.imooc.com/static/module/index/img/header-icon1.png" alt=""/>
                    <p style={Styles.title}>战以学 学为战</p>
                </div>
                <div className="center bgWhite">
                    <div style={Styles.nav} className="width1200">
                      {
                        this.state.titleList.map((item,index) => {
                          return <span
                            onClick={()=>this.fetchData(item.c,index)}
                            className="lineHeight50 hand"
                            style={Object.assign({},Styles.itemPad,this.state.currentIndex == index ? Styles.checked: {})}
                            key={index}
                          >{item.name}</span>
                        })
                      }
                    </div>
                </div>
                <div className="width1200 flex-wrap flex-box spaceBetween border-top" style={Styles.list}>
                    {
                        this.state.ProjectList.map((item, index)=>{
                            return (
                                <VideoComponent onClick={(id)=>{this.goDetail(id)}} NoLazy={true} key={index} item={item}/>
                            )
                        })
                    }
                </div>
                <div className="center height100">
                    <Pagination onChange={(page,pagesize)=>{this.pageChangeEvent(page,pagesize)}} hideOnSinglePage={true} defaultCurrent={1} total={this.state.AllDataList.length} />
                </div>
            </div>
        )
    }
}

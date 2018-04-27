/**
 * Created by mapbar_front on 2018/3/27.
 */
import React,{ Component } from 'react';
import Styles from './MyCareerStyles';
import { Pagination } from 'antd';
import VideoComponent from '../../components/VideoContainer/VideoComponent';
import Config from '../../config';
const serviceUrl = Config.baseUrl;

export default class MyCareer extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,
            MyCareerList: [],
            AllDataList:[],
          NavList: []
        }
    }
    componentDidMount(){
      // var value = JSON.parse(window.localStorage.getItem('MyCareerData'));
      // console.log(value);
      // if(value){
      //   this.setState({
      //     MyCareerList: value.data.newArr.slice(0,20)
      //   })
      // }else {
      //   this.fetchData();
      // }
      this.fetchData();
    }
    fetchData(type = 'all',isCheck){
      fetch(serviceUrl + '/classification.php?c='+type)
        .then(res=>{
          return res.json()
        })
        .then(data => {
          window.localStorage.setItem('MyCareerData',JSON.stringify(data));
          console.log(data);
          if(isCheck){
            this.setState({
              AllDataList: data.data,
              MyCareerList: data.data.slice(0,20)
            });
            return
          }
          this.setState({
            MyCareerList: data.data.newArr.slice(0,20),
            AllDataList: data.data.newArr,
            NavList: data.arr,
            currentIndex: 0
          })
        })
    }
  checkEvent(type,index){
      this.fetchData(type,true);
      this.setState({
        currentIndex: index
      })
  }
  changeEvent(pageNum,pageSize){
      this.setState({
        MyCareerList: this.state.AllDataList.slice(pageNum*pageSize-10,pageNum*pageSize)
      })
  }
    render(){
        return (
            <div className="wrapper autoBox bgWhite center flex-col">
                <div style={Styles.header}>
                    <h1 className="colorWhite center" style={{marginTop: '100px'}}>成长 因陪伴不再孤单</h1>
                    <div className="center" style={Styles.width1200}>
                        <ul style={Styles.positionBox} className="flex-box">
                          {
                            this.state.NavList.map((item,index)=>{
                              return <li
                                key={index}
                                onClick={()=>this.checkEvent(item.c,index)}
                                className="itemHover"
                                style={this.state.currentIndex==index?{background:'#fff',color:'#444'}:{}}
                              >{item.name}</li>
                            })
                          }
                        </ul>
                    </div>

                </div>
                <div style={Styles.width1200}>
                    <div className="flex-box spaceBetween flex-wrap" style={{paddingTop: '40px'}}>
                        {
                            this.state.MyCareerList.map((item, index)=>{
                                return (
                                    <VideoComponent onClick={(id)=>{this.goDetail(id)}} NoLazy={true} key={index} item={item}/>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="center height100">
                    <Pagination onChange={(pageNum,pageSize)=>this.changeEvent(pageNum,pageSize)} pageSize={20} defaultCurrent={1} hideOnSinglePage={true} total={this.state.AllDataList.length || 0} />
                </div>

            </div>
        )
    }
}

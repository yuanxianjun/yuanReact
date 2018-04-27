/**
 * Created by mapbar_front on 2018/4/17.
 */
import React, { Component } from 'react';
import Config from '../../config';
const serviceUrl = Config.baseUrl;
export default class VedioDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            movieSrc:'http://pic.ibaotu.com/00/56/77/28b888piCuvW.mp4',
          ComprehensiveScore:'10',
          audioUrl:'',
          imgUrl:'',
          name:'',
          price:'',
          term:'',
          title:'',
          content:[],
          acturlCombat: '',
          TheNumberOf:'',
          TeachingPeriod:''
        }
    }
    fetchData(id){
      fetch(serviceUrl + '/details.php?id='+id)
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log(res);
          if(res.status == 200){
            this.setState({
              ComprehensiveScore:res.data.ComprehensiveScore,
              audioUrl:serviceUrl + res.data.audioUrl,
              imgUrl:serviceUrl + res.data.imgUrl,
              name:res.data.name,
              price:res.data.price,
              term:res.data.term,
              title:res.data.title,
              content:res.data.content,
              acturlCombat: res.data.acturlCombat,
              TheNumberOf:res.data.TheNumberOf,
              TeachingPeriod:res.data.TeachingPeriod
            })
          }
        })
    }
    componentDidMount(){
      //通过id来获取视屏信息
      var id = 1;
      if(this.props.location.state){
        id=this.props.location.state.id;
      }
      this.fetchData(id);
    }
    render(){
        return (
            <div>
                <div className='bgGrey center' style={{height:'600px'}}>
                  <video style={{width:'1200px',height:'600px',background:`url(${this.state.imgUrl}) no-repeat 0 0/1200px 600px`}} controls="controls">
                    <source style={{width:'100%',height:'600px'}} src={this.state.movieSrc} type="video/mp4" />
                    <source style={{width:'100%',height:'600px'}} src={this.state.movieSrc} type="video/ogg" />
                    <source style={{width:'100%',height:'600px'}} src={this.state.movieSrc} type="video/webm" />
                    <object style={{width:'100%',height:'600px'}} data={this.state.movieSrc} width="320" height="240">
                      <embed style={{width:'100%',height:'600px'}} src={this.state.movieSrc} width="320" height="240" />
                    </object>
                  </video>
                </div>

                <div className='center flex-box flex-col'>
                    <h1 className='width1200 center'>{this.state.title}</h1>
                    <ul className='width1200'>
                      {
                        this.state.content.map((item,index)=>{
                          return (
                            <li className='margin-top' key={index}>
                              <h2 style={{color:'#0A70C9'}}>{item.contentTitle}</h2>
                              <p>{item.contentText}</p>
                            </li>
                          )
                        })
                      }

                    </ul>
                </div>
            </div>
        )
    }
}

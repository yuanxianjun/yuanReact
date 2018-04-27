import React, { Component } from 'react';
import Styles from "../../pages/Home/HomeStyles";
import { Rate, Icon } from 'antd';
import componentStyles from './VideoComponentStyles';
import { is } from 'immutable';
import Config from '../../config';
const serviceUrl = Config.baseUrl;

export default class VideoComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            loadingImg: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
            showImg: this.props.NoLazy || false
        }
    }
    showImage(nextProps){

        if (this.state.showImg) {
            return;
        }
        var min = nextProps.viewport.top;
        var max = nextProps.viewport.top + nextProps.viewport.height;
        var height = this.refs.myImg.offsetTop;

        if((height >= min) && (max >= height)){
            this.setShowImage(true);
        }
    }
    setShowImage(isTrue){
        this.setState({
            showImg: !!(isTrue)
        });
    }
    componentWillReceiveProps(nextProps,nextState){
        // console.log('componentWillReceiveProps',nextProps,nextState);
        nextProps.viewport && this.showImage(nextProps);
    }
    shouldComponentUpdate(nextProps = {}, nextState = {}){
        // console.log('shouldComponentUpdate',nextProps,nextState);
        const thisProps = this.props || {}, thisState = this.state || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }


        //props对比
        for (const key in nextProps) {
            //如果是viewport的props变化，不进行视图更新
            if (!is(thisProps[key], nextProps[key]) && (key != 'viewport')) {
                return true;
            }
        }

        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }
  clickEvent(id){
      this.props.onClick && this.props.onClick(id);
  }
    render(){
        var item = this.props.item;
        !item.imgUrl && (item.imgUrl = this.state.loadingImg);

        //console.log(item.imgUrl);
        return (
            <div onClick={()=>this.clickEvent(item.id)} className='hand bgGrey margin-bottom' style={Styles.itemStyle}>
                <div className="center" style={Styles.itemImg}>
                    <img className='borderRadius10' style={this.state.showImg ? Styles.itemImg : Styles.itemImg1 } ref='myImg' src={this.state.showImg ? (/http/.test(item.imgUrl)?item.imgUrl : serviceUrl + item.imgUrl) : this.state.loadingImg} alt=""/>
                </div>
                <div>
                    <h3 className='titleStyle' style={componentStyles.titleStyle}>{item.name}</h3>
                    <p className="font-note" style={{padding:'3px 20px'}}>
                        <span>{item.actualCombat}</span>
                        <span className="margin-left10">{item.actualCombat}</span>
                        <span className="margin-left10"><Icon type="user" />{item.TheNumberOf||'无数据'}</span>
                    </p>
                    <Rate style={componentStyles.titlePadding} defaultValue={Number(item.score) || 5}/>
                    <p className="lineHeight20" style={componentStyles.titlePadding}>
                        ￥{item.price}
                    </p>
                </div>
            </div>
        )
    }
}

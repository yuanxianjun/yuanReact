import React, { Component } from 'react';
import Styles from "../../pages/Home/HomeStyles";
import componentStyles from './NewVideoComponentStyles';
import { Rate, Icon } from 'antd';
export default class NewVideoComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			showImg: false,
			loadingImg: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
		}
	}

	componentDidMount(){
		if(this.refs.myImg.offsetTop < window.innerHeight){
			this.setState({
				showImg: true
			})
		}
	}
	componentWillReceiveProps(nextProps,nextState){
        // console.log('componentWillReceiveProps',nextProps,nextState);
        nextProps.viewport && this.showImage(nextProps);
    }
	showImage(nextProps){
		console.log(nextProps.viewport);
		if(this.state.showImg){
			return
		}
		var height = this.refs.myImg.offsetTop;
		
		console.log('子组件中获取的height',this.refs.myImg.offsetTop)
		if(height > nextProps.viewport.top && height < nextProps.viewport.top + nextProps.viewport.height){
			this.setState({
				showImg: true
			})
		}
	}
	render(){
		var item = this.props.item;
		return (
			<div style={Styles.itemStyle}>
                <div className="center" style={Styles.itemImg}>
                    <img style={this.state.showImg ? Styles.itemImg : Styles.itemImg1 } ref='myImg' src={this.state.showImg ? item.imgSrc : this.state.loadingImg} alt=""/>
                </div>
                <div>
                    <h3 className='titleStyle' style={componentStyles.titleStyle}>{item.title}</h3>
                    <p className="font-note" style={{padding:'3px 20px'}}>
                        <span>{item.type}</span>
                        <span className="margin-left10">{item.lever}</span>
                        <span className="margin-left10"><Icon type="user" />{item.num||'无数据'}</span>
                    </p>
                    <Rate style={componentStyles.titlePadding} defaultValue={item.stars || 5}/>
                    <p className="lineHeight20" style={componentStyles.titlePadding}>
                        ￥{item.price}
                    </p>
                </div>
          	</div>
		)
	}
}

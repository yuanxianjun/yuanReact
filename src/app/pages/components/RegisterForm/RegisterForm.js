/**
 * Created by mapbar_front on 2018/3/27.
 */
import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import Styles from './formStyle';
class RegisterForm extends Component{
    registerEvent(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //在这里把值传递给父元素。
                this.props.registerEvent && this.props.registerEvent(values);
            }
        });


    }
    goLogin(){
        this.props.goLogin && this.props.goLogin();
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={Styles.registerForm}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirmpassword', {
                        rules: [{ required: true, message: 'Please Repeat your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Repeat Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>同意蓝猫教育用户注册协议</Checkbox>
                    )}

                    <Button onClick={(e)=>this.registerEvent(e)} type="primary" htmlType="submit" style={Styles.registerFormButton}>
                        注册
                    </Button>
                    <a onClick={()=>this.goLogin()} href="javascript:;">去登陆</a>
                </FormItem>
            </Form>
        )
    }
}

const WrappedNormalRegisterForm = Form.create()(RegisterForm);

export default WrappedNormalRegisterForm;

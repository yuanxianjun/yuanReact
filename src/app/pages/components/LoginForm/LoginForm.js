/**
 * Created by mapbar_front on 2018/3/27.
 */
import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;
import Styles from './formStyle';
class LoginForm extends Component{
    loginEvent(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            if (!err) {
                console.log('Received values of form: ', values);
                //在这里把值传递给父元素。
                this.props.loginEvent && this.props.loginEvent(values)
            }
        });

    }
    goRegister(){
        this.props.goRegister && this.props.goRegister()
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={(e)=>this.loginEvent(e)} style={Styles.loginForm}>
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码？</Checkbox>
                    )}
                    <a style={Styles.loginFormForgot} className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" style={Styles.loginFormButton}>
                        登录
                    </Button>
                    <a onClick={()=>this.goRegister()} href="javascript:;">去注册!</a>
                </FormItem>
            </Form>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;

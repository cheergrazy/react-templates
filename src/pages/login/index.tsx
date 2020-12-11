import * as React from 'react'
import { Button, Form, Input } from 'antd'
// import logo from '@/asstes/img/loginLogo.png'
import './login.less'

const FormItem = Form.Item
interface IProps {
  [key: string]: any,
  props?:any  
}
class Login extends React.Component<IProps>{
  handleLogin = (val: any) => {
    console.log('login', val);
    localStorage.setItem('auth', 'true')
    this.props.history.push('/')

  }
  render() {
    return (
      <div className='main'>
        <div className='login_top'>
          {/* <img src={logo} alt=""/> */}
          <span>签到系统</span>
        </div>
        <div className='content'>
          <div className='form'>
            <div className='logo'>
              <span className='title'>登录</span>
            </div>
            <Form onFinish={this.handleLogin}>
              <FormItem name="userName" rules={[{required: true, message: '请输入账号'}]}>

                <Input
                  placeholder="请输入账号"
                  allowClear
                  maxLength={11}
                />
              </FormItem>
              <FormItem name="password" rules={[{
                min: 6,
                max: 20,
                message: "请输入6-20位的密码!"
              }]}>

                <Input
                  type="password"
                  placeholder="请输入密码"
                  minLength={6}
                  maxLength={20}
                  allowClear
                />
              </FormItem>
              <div className='login_btn' style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  登录
                    </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
import React,{useEffect, useState} from 'react'
import {Layout, Breadcrumb, Dropdown,Avatar, Popconfirm, Menu} from 'antd'
import './layout.less'
import routes from './../../route/index'
import MenuItem from './../header/header'
import routeNames from './config'
import Logo from './../../asstes/image/logo.png'
import {UserOutlined, DownOutlined} from '@ant-design/icons'
const { Header, Footer, Content, Sider } = Layout;
const LayoutContent = (props:any) => {
  const [FirstName, setFirstName] = useState<string>('');
  const [SecondName, setSecondName] = useState<string>('');
  useEffect(() => {
    routeNames.forEach(val=>{
      if(props.history.location.pathname === val.path) {
        setFirstName(val.parentName)
        setSecondName(val.currentName)
      }
    })
    console.log(props.history);
  }, [props])
  const submitConfirm =()=>{
    props.history.push('/login')
  }      
  const personelList = (
    <Menu>
    <Menu.Item key="0">
      <span style={{display: 'block', textAlign: 'center'}}>个人中心</span>
    </Menu.Item>
    <Menu.Item key="1">
      <Popconfirm placement="top" title={'确认退出登录？'} okText="确定" cancelText="取消" onConfirm={submitConfirm} >
        <span style={{display: 'block', textAlign: 'center'}}>退出登录</span>
      </Popconfirm>
    </Menu.Item>
  </Menu>
  ) 
  return (
    <div className='layout'>
      <Layout>
        <Sider>
          <div className='logo'>
            <img src={Logo} alt=""/>
          </div>
          <MenuItem></MenuItem>
        </Sider>
        <Layout>
          <Header>
            <span className='header_sign'>睿沃签到系统</span>
            <Dropdown overlayStyle={{textAlign: 'center'}} overlay={personelList} trigger={['click']}><div className='login'><Avatar size={30} icon={<UserOutlined />}/><span className='personnel'>你好，admin</span> <DownOutlined /></div></Dropdown>
          </Header>
          <Content>
            <div className='Breadcrumb'>
              <Breadcrumb separator="" style={{marginBottom: '20px'}}>
                <Breadcrumb.Item href="">{FirstName}</Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>{SecondName}</Breadcrumb.Item>
              </Breadcrumb>         
            </div>
            <div className='main_content'>
              {routes(true)}
            </div>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>      
    </div>
  )
}

export default LayoutContent

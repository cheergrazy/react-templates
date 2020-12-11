import React, {useState, useEffect} from 'react'
import './header.less'
import { Menu } from 'antd';
import {VerifiedOutlined, UserOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
const { SubMenu } = Menu;
interface MenuSpecification {
  name: string
  key: string
  pathName?: string
  route?: string,
  icon?: any
  children?: Array<MenuSpecification>
}
/**
 * @menus : 菜单组件
 */
const menus: Array<MenuSpecification> = [{
  name: '人脸签到系统',
  key: '1',
  icon: <UserOutlined />,
  children: [
    {
      name: '签到数据',
      key: '1-1',
      route: 'FaceSignData',
      pathName: '/FaceSignData'
    },
    {
      name: '人脸数据库',
      key: '1-2',
      route: 'FaceDatabase',
      pathName: '/FaceDatabase'
    }    
  ]
},
{
  name: '人证签到系统',
  key: '2',
  icon: <VerifiedOutlined />,
  children: [
    {
      name: '签到数据',
      key: '2-1',
      route: 'CardSignData',
      pathName: '/CardSignData'
    },
    {
      name: '人证数据库',
      key: '3-2',
      route: 'CardDatabase',
      pathName: '/CardDatabase'
    }    
  ]
}
]
const Header = (props: any) => {
  const [current, setcurrent] = useState<string>('1-1');
  const [openKeys, setopenKeys] = useState<string>('1'); // 默认展开的菜单
  const handleClick = (item: any)=>{
    let path = GetRputePath(item.key)
    // 路由切换跳转
    setcurrent(item.key)
    props.history.push(path)
  }
  // 根据菜单key获取路由的path
  const GetRputePath = (key: string)=>{
    let RoutepathName: string | undefined
    menus.forEach(val=>{
      val.children?.forEach(val=>{
        if(val.key === key) {
          RoutepathName = val.route
        }
      })
    })
    return RoutepathName
  }
  const handleOpen = (item: any)=>{
    if(openKeys === item.key) { // 收起
      setopenKeys('')
    } else {
      setopenKeys(item.key) // 打开
    }
    
  }
  useEffect(() => {
    menus.forEach(val1=>{
      val1.children?.forEach(val2=>{
        if(val2.pathName === props.history.location.pathname) {
            setopenKeys(val1.key)
            setcurrent(val2.key)
        }
      })
    })
    

  }, [])
  return (
    <>
      <Menu openKeys={[openKeys]}  selectedKeys={[current]} onClick={handleClick} theme="dark" mode="inline">
        {
          menus.map(res=>{
            return <SubMenu key={res.key} onTitleClick={handleOpen} icon={res.icon} title={res.name}>
              {
                res.children?.map(val=>{
                return <Menu.Item key={val.key}>{val.name}</Menu.Item>
                })
              }
            </SubMenu>
          })
        }
      </Menu>
    </>
  )
}

export default withRouter(Header)

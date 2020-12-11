import React, {useState} from 'react'
import { Row, Col, Button, Tag, Input } from 'antd';
import {CheckCircleOutlined, SyncOutlined} from '@ant-design/icons';
interface searchHeader {
  SuccessNum: string | number
  StandingNum: string | number
  clearSignDatas: Function
  GetUserList: Function
}
const SearchHeader = (props: searchHeader) => {
  const [SearchUserName, setSearchUserName] = useState<string | undefined>('');
  const SetSearchParmas = (event: any)=>{
    setSearchUserName(event.target.value)
  }
  return (
    <>
      <Row>
        <Col span={2} className='ml10'>
          签到情况
        </Col>
        <Col span={3} className='ml10'>
  <Tag icon={<CheckCircleOutlined />} color="success">已签到：{props.SuccessNum}人</Tag>
        </Col>
        <Col span={5} className='ml10'>
          <Tag icon={<SyncOutlined spin/>} color="processing">未签到：{props.StandingNum}人</Tag>                  
        </Col> 
        <Col span={2} className='ml10'>
          <Button danger onClick={props.clearSignDatas.bind(this)}>清除签到数据</Button>               
        </Col>              
        <Col span={4} offset={6} className='ml10'>
          <Input placeholder={'请输入姓名查找'} onInput={SetSearchParmas}></Input>
        </Col>            
        <Col span={1} className='ml10'>
          <Button className='mb20' onClick={props.GetUserList.bind(this, SearchUserName)} type='primary'>搜索</Button>
        </Col>                                
      </Row>  
    </>
  )
}

export default SearchHeader

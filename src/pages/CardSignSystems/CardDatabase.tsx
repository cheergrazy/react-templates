import React,{useState, useEffect} from 'react'
import { Table, Space, Button, Input, Row, Col, Modal, Form, message} from 'antd';
import {getUserList, addSignUser, deleteFaceData} from './../../until/api'
import Loading from './../../components/loading'
import './../FaceSignSystems/FaceSignSystems.less'
const FaceDatabase = () => {
  const [isModalVisible, setisModalVisible] = useState<boolean>(false);
  const [ModalTitleName, setModalTitleName] = useState<string>('新增');
  const [SearchUserName, setSearchUserName] = useState<string | undefined>('');
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [data, setdata] = useState<any[]>([]);
  const [form] = Form.useForm();
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'userName',
      align: 'center',
      key: 'userName',
      width: '200px',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '身份证号',
      dataIndex: 'idNumber',
      align: 'center',
      key: 'idNumber',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 200,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type='primary' onClick={GetEditForm.bind(this, record)}>修改</Button>
          <Button danger onClick={DeleteFaceList.bind(this, record)}>删除</Button>
        </Space>
      ),
    },
  ];
    
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const handleOk = ()=>{
    form.validateFields().then((res:any)=>{
      let data = {...res}
      data.id = form.getFieldValue('id') || null
      data.userType = 2
      addSignUser(data).then(res=>{
        message.success(`${ModalTitleName}成功～`)
        setisModalVisible(false)
        GetUserList()
        form.resetFields()
      })
    })
    
  }
  const SetSearchParmas = (event: any)=>{
    setSearchUserName(event.target.value)
    
  }  
  const handleCancel = ()=>{
    setisModalVisible(false)
  }
  const addInviter = ()=>{
    setisModalVisible(true)
    setModalTitleName('新增')
  }
  const onFinish = ()=>{
    
  }
  const onFinishFailed = ()=>{
  }
  const GetUserList = ()=>{
    setIsLoading(true)
    getUserList({userType: 2, userName: SearchUserName || null}).then((res: any)=>{;
      setIsLoading(false)
      setdata([...res.data])
    })
  }  
  const GetEditForm = (item: any)=>{
    setisModalVisible(true)
    setModalTitleName('编辑')    
    form.setFieldsValue({...item})
  }
  const comfirmDelete = (item: any) => {
    deleteFaceData(item.id).then(res=>{
      message.success(`删除成功～`)
      GetUserList()
    })
  }
  const DeleteFaceList = (item: any)=>{
    Modal.confirm({
      title: '确认删除？',
      content: '确认删除该条数据？',
      okText: '确认',
      cancelText: '取消',
      onOk: comfirmDelete.bind(this, item)
    });
  }  
  useEffect(() => {
    GetUserList()
  }, [])
  return (
    <>
     { IsLoading ? <Loading></Loading> : <><div className='searchHeader'>      
        <Row>
          <Col span={2} className='ml10'>
            <Button type='primary' onClick={addInviter}>新增</Button>
          </Col>
          <Col span={5} offset={15}>
            <Input onInput={SetSearchParmas} placeholder={'请输入姓名查找'}></Input>
          </Col>
          <Col span={1} className='ml10'>
          <Button className='mb20' type='primary' onClick={GetUserList}>搜索</Button>
        </Col>           
        </Row>  

      </div>    
      <div className='sign_main_box'>
        <Table bordered columns={columns} dataSource={data} rowKey='id' />   
      </div>      
      <Modal
        title={ModalTitleName}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="姓名"
            name="userName"
            rules={[{ required: true, message: '请输入姓名！' }]}
          >
            <Input />
          </Form.Item>                   
            <Form.Item
            label="身份证号"
            name="idNumber"
            rules={[{ required: true, message: '请输入身份证号！' }]}
          >
            <Input />
          </Form.Item>             
        </Form>
      </Modal></>   }
    </>
  )
}

export default FaceDatabase

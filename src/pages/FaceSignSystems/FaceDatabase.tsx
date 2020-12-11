import React,{useState, useEffect} from 'react'
import { Table, Space, Button, Input, Row, Col, Image, Modal, Form, message} from 'antd';
import {getUserList, addSignUser, deleteFaceData} from './../../until/api'
import Loading from './../../components/loading'
import Loader from '../../components/loader'
import './FaceSignSystems.less'
const FaceDatabase = () => {
  const [isModalVisible, setisModalVisible] = useState<boolean>(false);
  const [ModalTitleName, setModalTitleName] = useState<string>('新增');
  const [SearchUserName, setSearchUserName] = useState<string | undefined>('');
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [data, setdata] = useState<any[]>([]);
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'userName',
      align: 'center',
      key: 'userName',
      width: 200,
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '照片',
      dataIndex: 'avatarPhoto',
      align: 'center',
      key: 'avatarPhoto',
      width: 600,
      className: 'tablist',
      render: (photo: any) => (<div className={photo ? 'table_cli' : ''} style={{overflowX: photo?.split(',').length > 5 ? 'scroll' : 'hidden'}}>
        <div className='table_cli_box' style={{width: `${photo?.split(',').length*100 + 100}px`}}>{ photo?.split(',').map((val: string | undefined, i: any)=>{
        return <Image src={val} key={i}></Image>
      }) }</div></div>)
      },
    {
      title: '欢迎文案',
      dataIndex: 'welTitle',
      align: 'center',
      key: 'welTitle',
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
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const handleOk = ()=>{
    form.validateFields().then((res:any)=>{
      let data = {...res}
      data.id = form.getFieldValue('id') || null
      data.userType = 1
      if(typeof(data.avatarPhoto) !== 'string') {
        data.avatarPhoto = data.avatarPhoto.join(',')
      }
      addSignUser(data).then(res=>{
        message.success(`${ModalTitleName}成功～`)
        setisModalVisible(false)
        GetUserList()
        form.resetFields()
      })
    })    
  }
  const handleCancel = ()=>{
    form.resetFields()
    setisModalVisible(false)
  }
  const addInviter = ()=>{
    setisModalVisible(true)
    setModalTitleName('新增')
    form.setFieldsValue({'avatarPhoto': []})
  }
  const getChangePhoto = function(file: any):void{
    if(typeof(form.getFieldValue('avatarPhoto')) === 'string') {
      let arr = form.getFieldValue('avatarPhoto').split(',')
      arr.push(file)
      form.setFieldsValue({'avatarPhoto': arr.join(',')})
    } else {
      form.setFieldsValue({'avatarPhoto': form.getFieldValue('avatarPhoto').concat(file)})
    }
    
  }
  const editChangePhoto = function(file: any):void{
    let arr: any[] = []
    let avatarPhoto = form.getFieldValue('avatarPhoto')
    if(typeof(avatarPhoto) === 'string') {
      avatarPhoto.split(',').forEach(val=>{
        if(val !== file.url) {
          arr.push(val)
        }
      })
    }
    form.setFieldsValue({'avatarPhoto': arr.length > 0 ? arr.join(',') : []})
    
    // form.setFieldsValue({'avatarPhoto': form.getFieldValue('avatarPhoto').concat(fileList)})
  }
  const SetSearchParmas = (event: any)=>{
    setSearchUserName(event.target.value)
  }
  const GetUserList = ()=>{
    setIsLoading(true)
    getUserList({userType: 1, userName: SearchUserName || null}).then((res: any)=>{;
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
    {
      IsLoading ? <Loading></Loading> : <>
        <div className='searchHeader'>      
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
          width={600}
          onCancel={handleCancel}
        >
          { isModalVisible ? <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="姓名"
              name="userName"
              rules={[{ required: true, message: '请输入嘉宾姓名!' }]}
            >
              <Input />
            </Form.Item>   
            <Form.Item
              label="照片"
              name="avatarPhoto"
              rules={[{ required: true, message: '请上传嘉宾人脸照片！' }]}
            >
              <Loader getChangePhoto={getChangePhoto} editChangePhoto={editChangePhoto} pics={form.getFieldValue('avatarPhoto').length>0 ? form.getFieldValue('avatarPhoto').split(',') : null}></Loader>
            </Form.Item>                  
              <Form.Item
              label="欢迎文案"
              name="welTitle"
              rules={[{ required: true, message: '请输入欢迎文案!' }]}
            >
              <Input type='textarea' />
            </Form.Item>             
          </Form> : null}
        </Modal>  
      </>
    }
  
    </>
  )
}

export default FaceDatabase

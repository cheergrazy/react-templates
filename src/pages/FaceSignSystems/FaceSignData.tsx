import React, {useEffect, useState} from 'react'
import SearchHeader from './SearchHeader'
import './FaceSignSystems.less'
import {Tooltip, message, Modal} from 'antd'
import Loading from './../../components/loading'
import {SmileFilled, MehFilled} from '@ant-design/icons'
import {getUserList, clearUsers} from './../../until/api'
const FaceSignData = () => {
  const [SignPeopleList, setSignPeopleList] = useState<any[]>([]);
  const [SuccessNum, setSuccessNum] = useState<number>(0);
  const [StandingNum, setStandingNum] = useState<number>(0);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const clearSignDatas = ()=>{
    Modal.confirm({
      title: '确认清除？',
      content: '确认清除签到数据（该操作不可恢复）？',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=>{clearUsers(4).then(res=>{
        message.success('签到数据已清除')
        GetUserList()
      })}
    }); 
  }
  const GetUserList = (SearchUserName?: string | undefined)=>{
    setIsLoading(true)
    getUserList({userType: 1, userName: SearchUserName || null}).then((res: any)=>{
      setSignPeopleList([...res.data])
      let successNum = 0
      let standingNum = 0
      setIsLoading(false)
      res.data.forEach((val: any) => {
        if(val.login) {
          setSuccessNum(++successNum)
        } else {
          setStandingNum(++standingNum)
        }
      });      
    })
  }
  useEffect(() => {
    GetUserList()
  }, [])
  return (
    <>
    {IsLoading ? <Loading></Loading> : <div>
      <div className='searchHeader'>        
        <SearchHeader GetUserList={GetUserList} SuccessNum={SuccessNum} clearSignDatas={clearSignDatas} StandingNum={StandingNum}></SearchHeader>
      </div>
      <div className='sign_main_box'>
        {
          SignPeopleList.map((val, i)=>{
            return <Tooltip key={i} placement="bottom" title={`${val.createTime || ""}${val.login  ? '已签到' : '未签到'}`}>
              <div className='box'>
                {val.isSign ? <SmileFilled className='icons' style={{color: '#52c41a'}}/> : <MehFilled className='icons' style={{color: '#f2f4f5'}}/>}
                <p>{val.userName}</p>
                {/* <p>{val.seatNumber}</p> */}
              </div>              
          </Tooltip>
          })
        }
      </div>
    </div>
    }
    </>
  )
}

export default FaceSignData

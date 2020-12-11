import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {uploadImg} from './../until/api'
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
interface NavigationBarProps
{
  getChangePhoto:Function
  editChangePhoto: Function
  pics: any[]
}
class PicturesWall extends React.Component<NavigationBarProps> {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };
  componentDidMount () {
    if(this.props.pics) {
      let arr: any[] = []
      let uid = 0
      this.props.pics.forEach(val=>{
        arr.push({
          uid: uid ++,
          status: 'done',
          url: val,
          name: 'image.png'
        })
      })
      this.setState({ fileList: arr})
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }: any) => {this.setState({ fileList })
  }
  getFiles = (item: any)=>{
    console.log(item);
    let formData = new FormData()
    formData.append('file', item.file)
    uploadImg(formData).then((res: any)=>{
      let arr: any[] = [...this.state.fileList]
      arr[arr.length - 1].status = 'done'
      console.log(res.data.data[0]);
      
      this.props.getChangePhoto(res.data.data[0])
      // this.setState({ fileList: arr })
    })
  }
  removePics = (file: any) =>{ 
    this.props.editChangePhoto(file)
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );
    return (
      <>
        <Upload
          action='user/fileUpload'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.getFiles}
          onRemove={this.removePics}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
export default PicturesWall
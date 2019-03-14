import React from 'react'
import * as qiniu from 'qiniu-js'
import Style from './index.scss'
import { notification } from 'antd';
import API from '@common/api.js'

class Upload extends React.Component{
    async uploadFn() {
        const response = await API.getQiniuToken();
        const { baseUrl, token } = response.data;
        const files = this.refs.upload.files;

        if (!this.imageVerify) return;

        const putExtra = {
            fname: '',
            params: {},
            mimeType: ['image/png', 'image/jpeg', 'image/gif'],
        };

        const config = {
            region: qiniu.region.z0,
        };

        // 文件名
        const key = new Date().getTime() + files[0].name;
        const observable = qiniu.upload(files[0], key, token, putExtra, config);
        console.log(observable);

        const observer = {
            next: (res) => {
              // ...
            },
            error: (err) => {
                notification.error({
                    message: err
                })
            }, 
            complete: (res) => {
                const imgUrl = baseUrl + '/' + res.key;
                this.props.successCb(imgUrl);
            }
        }
        const subscription = observable.subscribe(observer) //上传开始
    }

    imageVerify() {
        const files = this.refs.upload.files;
        const fileType = files[0].type;
        if (/^image/.test(fileType)) {
            return true;
        } else {
            notification.error({
                message: '请选择图片类型文件'
            })
            return false;
        }
    }

    render () {
        return (
            <input 
                ref="upload" 
                className={Style['upload-image']} 
                type="file"
                accept="image/*"
                onChange={this.uploadFn.bind(this)} />
        )
    }
}

Upload.defaultProps = {
    successCb: () => {}
}

export default Upload;
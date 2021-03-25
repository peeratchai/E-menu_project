import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



export default class AntdModal extends React.Component {
    render() {
        return (
            <>
                <Modal
                    visible={this.props.previewVisible}
                    title={this.props.previewTitle}
                    footer={this.props.footer}
                    onCancel={() => this.props.onCancel()}
                >
                    <img alt="example" style={{ width: '100%', height: '100%' }} src={this.props.previewImage} />
                </Modal>
            </>
        );
    }
}

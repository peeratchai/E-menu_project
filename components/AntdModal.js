import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


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

function showConfirm(props) {
    confirm({
        title: 'Delete Food Confirmation',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you seriously want to delete',
        onOk() {
            console.log('OK');
            props.onOK();
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

export const DeleteConfirmModal = (props) => {
    return (
        <>
            <Tag color="red" key={Math.random(99999)} style={{ cursor: "pointer" }} onClick={() => showConfirm(props)}>
                Delete
            </Tag>
        </>
    )
}
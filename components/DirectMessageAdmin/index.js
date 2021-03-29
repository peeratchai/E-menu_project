import React, { Component } from 'react';

import MDSpinner from "react-md-spinner";
import { Select, Button } from 'antd';
import { Row, Col } from 'react-bootstrap'
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;


class DirectMessageAdmin extends Component {

    state = {
        customers: [{ uid: "1", name: "UserName1" }, { uid: "2", name: "UserName2" }],
        selectedCustomer: '1',
        chat: [{ id: "a1", text: "help", receiver: "user" }, { uid: "2", id: "b2", text: "what", receiver: "admin" }],
        chatIsLoading: false,
        customerIsLoading: false
    }


    selectCustomer = uid => {
        this.setState({
            selectedCustomer: uid
        })
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-md-12 h-100pr border rounded">
                        <div className='row'>
                            <div className='col-lg-4 col-xs-12 bg-light' style={{ height: 658 }}>
                                <div className='row p-3'><h3>Customer List</h3></div>
                                <Row style={{ padding: "0.5rem 1rem" }}>
                                    <Col xs={10} style={{ padding: "0" }}>
                                        <div>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Search Name"
                                                optionFilterProp="children"
                                                onChange={() => onChangeRestaurantName}
                                                onSearch={() => onSearchRestaurantName}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="The Royal Oak Restaurant">The Royal Oak Restaurant</Option>
                                                <Option value="ฮันทส์เเมน ผับ">ฮันทส์เเมน ผับ</Option>
                                                <Option value="ฟิชเจอรัลด์">ฟิชเจอรัลด์</Option>
                                                <Option value="The Old English Pub">The Old English Pub</Option>
                                                <Option value="Chequers British Pub">Chequers British Pub</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col xs={2} style={{ padding: "0", textAlign: "right", margin: "auto" }}>
                                        <Button type="primary"><PlusOutlined /></Button>
                                    </Col>
                                </Row>
                                <div className='row ml-0 mr-0 bg-white border rounded' style={{ height: '70%', overflow: 'auto' }}>
                                    <CustomerList {...this.state} selectCustomer={this.selectCustomer} />
                                </div>
                            </div>
                            <div className='col-lg-8 col-xs-12 bg-light' >
                                {/* <div className='row p-3 bg-white'>
                                    <h2>Who you gonna chat with?</h2>
                                </div> */}
                                <div className='row pt-5 bg-white' style={{ height: 605, overflow: 'auto' }}>
                                    <ChatBox {...this.state} />
                                </div>
                                <div className="row bg-light" style={{ bottom: 0 }}>
                                    <form className="row m-0 p-0 w-100" onSubmit={this.handleSubmit}>

                                        <div className="col-9 m-0 p-1">
                                            <input id="text"
                                                className="mw-100 border rounded form-control"
                                                type="text"
                                                name="text"
                                                ref="message"
                                                placeholder="Type a message..." />
                                        </div>
                                        <div className="col-3 m-0 p-1">
                                            <button className="btn btn-outline-secondary rounded border w-100"
                                                title="Send"
                                                style={{ paddingRight: 16 }}>Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ChatBox extends Component {
    render() {
        const { chat, chatIsLoading } = this.props;
        if (chatIsLoading) {
            return (
                <div className='col-xl-12 my-auto text-center'>
                    <MDSpinner size='72' />
                </div>
            )
        }
        else {
            return (
                <div className='col-xl-12'>
                    {
                        chat
                            .map(chat =>
                                <div key={chat.id} className="message">
                                    <div className={`${chat.receiver !== 'admin' ? 'balon1' : 'balon2'} p-3 m-1`}>
                                        {chat.text}
                                    </div>
                                </div>)
                    }
                </div >
            )
        }
    }

}


class CustomerList extends Component {
    render() {
        const { customers, customerIsLoading, selectedCustomer } = this.props;
        if (customerIsLoading) {
            return (
                <div className='col-xl-12 my-auto text-center'>
                    <MDSpinner size='72' />
                </div>
            )
        }
        else {
            return (
                <ul className="list-group list-group-flush w-100" >
                    {
                        customers
                            .map(customer =>
                                <li
                                    style={{ cursor: "pointer" }}
                                    key={customer.uid}
                                    className={`list-group-item ${customer.uid === selectedCustomer ? 'active' : ''}`}
                                    onClick={() => this.props.selectCustomer(customer.uid)}>
                                    {customer.name}
                                </li>
                            )
                    }
                </ul >
            )
        }
    }
}

export default DirectMessageAdmin;
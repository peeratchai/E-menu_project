
import { Table, Space, Input, Popconfirm, Spin, message } from 'antd';
import { Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import contactUsService from '../../../services/contactUsService'
import ViewContactUsMessageModal from '../../../components/Modal/ViewContactUsMessageModal'
import moment from 'moment'

export default function ContactUsMessage(props) {
    const { current_tab } = props
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [viewContactUsMessageModalShow, setViewContactUsMessageModalShow] = React.useState(false);
    const [allMessage, setAllMessage] = React.useState([])
    const [messageSelected, setMessageSelected] = React.useState()
    var searchInput = React.createRef();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    useEffect(() => {
        if (current_tab === 'viewContactUs') {
            getAllContactUsMessage()
        }
    }, [current_tab])

    const getAllContactUsMessage = async () => {
        setLoading(true)
        contactUsService.getMessage().then((allMessage) => {
            allMessage.sort((a,b)=> new Date(b.created_date) - new Date(a.created_date))
            allMessage.map((message, index) => {
                message.key = message.id
                message.No = index + 1
                message.created_date = moment(message.created_date).format('DD/MM/YYYY h:mm:ss')
            })
            setAllMessage(allMessage)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log('BanUserManagement getAllUserBan', error)
        })

    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    })

    const columnsUserBan = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            ...getColumnSearchProps('subject'),
        },
        {
            title: 'Created date',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (message) => (
                <Space size="middle">
                    <Button onClick={() => (setMessageSelected(message), setViewContactUsMessageModalShow(true))} style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>View Message</Button>
                </Space>
            ),
        }
    ]

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#78100E", padding: "15px", textAlign: "center" }}>
                Contact us message
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsUserBan} dataSource={allMessage} scroll={{ x: 'max-content' }} />
            </Spin>
            <ViewContactUsMessageModal
                show={viewContactUsMessageModalShow}
                onHide={() => setViewContactUsMessageModalShow(false)}
                message_selected={messageSelected}
            />
        </>
    )
}

import { Table, Space, Input, Button, Popconfirm, Spin, message } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import adminService from '../../../services/admin'
import BanUserModal from '../../../components/Modal/BanUserModal'

export default function BanUserManagement(props) {
    const { current_tab } = props
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [userBanDataTable, setUserBanDataTable] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [banUserModalShow, setBanUserModalShow] = React.useState(false);
    const [profileAllUser, setProfileAllUser] = React.useState([])

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
        if (current_tab === 'banUser') {
            getAllUserBan()
            getProfileAllUser()
        }
    }, [current_tab])

    const banUser = (userId) => {
        let data = {
            "user": userId
        }
        adminService.addUserBan(data).then((response) => {
            console.log('response', response)
            message.success('Ban the user successful.')
            getAllUserBan()
        }).catch(error => {
            console.log('error', error)
            message.error('Cannot ban user! Please try again.')
        })
    }

    const getProfileAllUser = () => {
        adminService.getProfileAllUser().then((allUser) => {
            setProfileAllUser(allUser)
        }).catch(error => {
            console.log('getAllUser error', error)
        })
    }

    const getAllUserBan = async () => {
        setLoading(true)
        adminService.getAllUserBan().then((allUserBan) => {
            let allUserBanDataTable = []
            console.log('allUserBan', allUserBan)
            allUserBan.map((userBan, index) => {
                allUserBanDataTable.push({
                    No: index + 1,
                    key: userBan.id + index,
                    userBanId: userBan.id,
                    username: userBan.user.username,
                    email: userBan.user.email,
                    roles: userBan.user.roles,
                })
            })
            setUserBanDataTable(allUserBanDataTable)
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
                        type="primary"
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

    const confirmDeleteUserBan = (profile) => {
        console.log('profile', profile)
        adminService.deleteUserBan(profile.userBanId).then((response) => {
            console.log('response', response)
            message.error('Active user successful.')
            getAllUserBan()
        }).catch(error => {
            console.log('confirmDeleteUserBan error', error)
            message.error('Cannot active user.')
        })
    }

    const columnsUserBan = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles) => {
                return (
                    <div>
                        {roles.join(' , ')}
                    </div>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (profile) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to active this user?"
                        onConfirm={() => confirmDeleteUserBan(profile)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Active user</Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Ban User Management
            </div>
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type='primary' onClick={() => setBanUserModalShow(true)}>
                    Ban user
                </Button>
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsUserBan} dataSource={userBanDataTable} scroll={{ x: 'max-content' }} />
            </Spin>
            <BanUserModal
                show={banUserModalShow}
                onHide={() => setBanUserModalShow(false)}
                profile_all_user={profileAllUser}
                ban_user={(userId = '') => banUser(userId)}
            />
        </>
    )
}
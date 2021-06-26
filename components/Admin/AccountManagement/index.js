
import 'antd/dist/antd.css';
import { Table, Space, Popconfirm, Tag, Input, Button, message, Spin } from 'antd';
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import AdminEditProfileModal from '../../Modal/AdminEditProfileModal'
import Highlighter from 'react-highlight-words';
import adminService from '../../../services/admin'
import profileService from '../../../services/profile'
import fetchJson from '../../../lib/fetchJson'

export default function AccountManagement(props) {
    const { restaurant_list, user_profile } = props
    const [edifProfileModalShow, setEdifProfileModalShow] = React.useState();
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [userProfilesData, setUserProfilesData] = React.useState();
    const [profileSelected, setProfileSelected] = React.useState();
    const [loading, setLoading] = React.useState(false);
    console.log('user_profile', user_profile)
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
        getAllUserProfile()
    }, [])

    const getAllUserProfile = async () => {
        setLoading(true)
        let allProfile = await adminService.getProfileUser()
        let userProfilesData = []
        let restaurant_employee = null
        let restaurant_name = null
        console.log('allProfile', allProfile)
        if (allProfile) {
            allProfile.map((profile, index) => {
                if (profile.restaurant_employee !== null) {
                    if (profile.restaurant_employee.restaurant) {
                        try {
                            restaurant_employee = profile.restaurant_employee.restaurant.id
                            restaurant_name = profile.restaurant_employee.restaurant.name
                        } catch (error) {
                            console.log('profile.restaurant_employee', profile.restaurant_employee)
                        }
                    }
                } else {
                    restaurant_employee = null
                    restaurant_name = null
                }

                userProfilesData.push({
                    No: index + 1,
                    key: profile.id + index,
                    userId: profile.id,
                    email: profile.email,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    gender: profile.gender,
                    age: profile.age,
                    roles: profile.roles,
                    username: profile.username,
                    avatar_url: profile.avatar_url,
                    phone_number: profile.phone_number,
                    is_active: profile.is_active,
                    restaurant_employee: restaurant_employee,
                    restaurant_name: restaurant_name
                })
            })
            setUserProfilesData(userProfilesData)
            setLoading(false)
        }

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

    const onEditProfile = (profile) => {
        console.log('profile', profile)
        setProfileSelected(profile)
        setEdifProfileModalShow(true)
    }

    const columnsAccount = [
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
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
            ...getColumnSearchProps('last_name'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
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
            render: (profile, record) => (
                <Space size="middle">
                    <Tag color="green" key={record.length} style={{ cursor: "pointer" }} onClick={() => onEditProfile(profile)}>
                        Edit
                    </Tag>
                    <Popconfirm
                        title="Are you sure to delete this account?"
                        onConfirm={() => onDeleteAccount(profile)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tag color="red" key={record.length + 1} style={{ cursor: "pointer" }} >
                            Delete
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const onDeleteAccount = async (profile) => {
        let data = {
            username: profile.username,
            first_name: profile.first_name,
            last_name: profile.last_name,
            gender: profile.gender,
            age: profile.age,
            phone_number: profile.phone_number,
            avatar: profile.avatar_url,
            roles: profile.roles,
            restaurant_employee: profile.restaurant_employee,
            is_active: false
        }


        let responseProfile = await profileService.adminEditUserProfile(data, profile.userId)
        if (responseProfile) {
            message.success('Edit profile successful.')
            console.log('profile.userId', profile.userId)
            console.log('user_profile.id', user_profile.id)
            if (profile.userId === user_profile.id) {
                await signOut()
            } else {
                getAllUserProfile()
            }
        } else {
            message.error('Cannot edit profile !')
        }
    }

    const signOut = async () => {
        await fetchJson('/api/logout', { method: 'POST' }).then(() => {
            window.localStorage.removeItem('accessToken')
            window.location.reload()
        }).catch(error => {
            console.log('signOut error', error)
        })

    }

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Account Management
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsAccount} dataSource={userProfilesData} scroll={{ x: 'max-content' }} />
            </Spin>
            <AdminEditProfileModal
                show={edifProfileModalShow}
                onHide={() => setEdifProfileModalShow(false)}
                profile={profileSelected}
                restaurant_list={restaurant_list}
                get_all_user_profile={getAllUserProfile}
                user_profile={user_profile}
            />
        </>
    )
}
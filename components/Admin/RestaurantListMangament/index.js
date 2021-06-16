
import { Table, Space, Input, Button, Popconfirm, Spin, message, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import adminService from '../../../services/admin'
import AddResraurantModal from '../../../components/Modal/AddRestaurantModal'
import restaurantService from '../../../services/restaurant';

export default function RestaurantListManagement(props) {
    const { current_tab } = props
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [RestaurantDataTable, setRestaurantDataTable] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [restaurantModalShow, setRestaurantModalShow] = React.useState(false);

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
        if (current_tab === 'restaurantListManagement') {
            getAllRestaurant()
        }
    }, [current_tab])

    const addRestaurant = (restaurantForm) => {
        let data = {
            "name": restaurantForm.restaurantName,
            "business_hour": [
                {
                    'restaurant': null,
                    'day': 'Monday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Tuesday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Wednesday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Thursday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Friday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Saturday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                },
                {
                    'restaurant': null,
                    'day': 'Sunday',
                    'opening_time': '8.00',
                    'closing_time': '16.00'
                }
            ]
        }
        console.log(data)
        restaurantService.addRestaurant(data).then((response) => {
            console.log('response', response)
            if (response.is_success) {
                message.success('Add new restaurant successful.')
                getAllRestaurant()
            } else {
                message.error('Cannot add new restaurant! Please try again.')

            }
        })
    }

    const getAllRestaurant = async () => {
        setLoading(true)
        restaurantService.getAllRestaurant().then((restaurantList) => {
            let restaurantDataTable = []
            console.log('restaurantList', restaurantList)
            restaurantList.map((restaurant, index) => {
                restaurantDataTable.push({
                    No: index + 1,
                    key: restaurant.id + index,
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                })
            })
            setRestaurantDataTable(restaurantDataTable)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log('GetAllRestaurant', error)
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

    const confirmDeleteRestaurant = (restaurantId) => {
        console.log('restaurantId', restaurantId)
        restaurantService.deleteRestaurantById(restaurantId).then((response) => {
            console.log('response', response)
            message.success('Delete restaurant successful.')
            getAllRestaurant()
        }).catch(error => {
            console.log('confirmDeleteRestaurant error', error)
            message.error('Cannot delete restaurant.')
        })
    }

    const columnsRestaurant = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'restaurantName',
            key: 'restaurantName',
            ...getColumnSearchProps('restaurantName'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (restaurant) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delte this restaurant?"
                        onConfirm={() => confirmDeleteRestaurant(restaurant.restaurantId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tag color="red" key={restaurant.restaurantId} style={{ cursor: "pointer" }} >
                            Delete
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Restaurant List Management
            </div>
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type='primary' onClick={() => setRestaurantModalShow(true)}>
                    New restaurant
                </Button>
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsRestaurant} dataSource={RestaurantDataTable} scroll={{ x: 'max-content' }} />
            </Spin>
            <AddResraurantModal
                show={restaurantModalShow}
                onHide={() => setRestaurantModalShow(false)}
                add_restaurant={(restaurantForm = {}) => addRestaurant(restaurantForm)}
            />
        </>
    )
}
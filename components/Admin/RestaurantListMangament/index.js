
import { Table, Space, Input, Button, Popconfirm, Spin, message, Tag, Switch } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import adminService from '../../../services/admin'
import AddRestaurantModal from '../../../components/Modal/AddRestaurantModal'
import restaurantService from '../../../services/restaurant';

export default function RestaurantListManagement(props) {
    const { current_tab } = props
    const { get_restaurant_list } = props
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
            // "business_hour": [
            //     {
            //         'restaurant': null,
            //         'day': 'Monday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Tuesday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Wednesday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Thursday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Friday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Saturday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     },
            //     {
            //         'restaurant': null,
            //         'day': 'Sunday',
            //         'opening_time': '8.00',
            //         'closing_time': '16.00'
            //     }
            // ],
            "location": "POINT(13.736717 100.523186)",
            "is_active": true
        }
        console.log(data)
        restaurantService.addRestaurant(data).then((response) => {
            console.log('response', response)
            if (response.is_success) {
                message.success('Add new restaurant successful.')
                getAllRestaurant()
                get_restaurant_list()
            } else {
                message.error('Cannot add new restaurant! Please try again.')

            }
        })
    }

    const getAllRestaurant = async () => {
        setLoading(true)
        adminService.getAllRestaurant().then((restaurantList) => {
            let restaurantDataTable = []
            console.log('restaurantList', restaurantList)
            restaurantList.map((restaurant, index) => {
                restaurantDataTable.push({
                    No: index + 1,
                    key: restaurant.id + index,
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    is_active: restaurant.is_active
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

    const onChangeRestaurantStatus = (checked, restaurantDataSelected) => {
        setLoading(true)
        let data = {
            "is_active": checked
        }
        restaurantService.setActiveStatusRestaurant(data, restaurantDataSelected.restaurantId).then(() => {
            setLoading(false)
            if (checked) {
                message.success('Active restaurant successful.')
            } else {
                message.success('Inactive restaurant successful.')
            }
            getAllRestaurant()
            get_restaurant_list()
        }).catch(error => {
            setLoading(false)
            console.log('onChangeRestaurantStatus error', error)
        })
    }

    const confirmDeleteRestaurant = (restaurantId) => {
        console.log('restaurantId', restaurantId)
        restaurantService.deleteRestaurantById(restaurantId).then((response) => {
            console.log('response', response)
            message.success('Delete restaurant successful.')
            getAllRestaurant()
            get_restaurant_list()
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
            render: (restaurant) => {
                return (
                    <Space size="middle">
                        <Switch checked={restaurant.is_active} onChange={(checked) => onChangeRestaurantStatus(checked, restaurant)} />
                        <Popconfirm
                            title="Are you sure to delete this restaurant?"
                            onConfirm={() => confirmDeleteRestaurant(restaurant.restaurantId)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tag color="red" key={restaurant.restaurantId} style={{ cursor: "pointer" }} >
                                Delete
                            </Tag>
                        </Popconfirm>
                    </Space>
                )
            },
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
            <AddRestaurantModal
                show={restaurantModalShow}
                onHide={() => setRestaurantModalShow(false)}
                add_restaurant={(restaurantForm = {}) => addRestaurant(restaurantForm)}
            />
        </>
    )
}
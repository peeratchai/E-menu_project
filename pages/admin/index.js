import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Tab, Modal, Container, Nav, Tabs } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, message, Table, Space, Switch, Select, Slider, Checkbox, Tag, Radio, Input, Button, Card, Popconfirm, TimePicker, Spin } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import useMediaQuery from "../../utils/utils";
import DirectMessageAdmin from '../../components/DirectMessageAdmin'
import { SearchOutlined } from '@ant-design/icons';
import termAgreement from '../../utils/termAgreement.json'
import AccountManagement from '../../components/Admin/AccountManagement'
import RestaurantManagement from '../../components/Partner/RestaurantManagement'
import SelectRestaurant from '../../components/SelectRestaurant'
import restaurantService from '../../services/restaurant'
import Promote from '../../components/Partner/Promote'
import Menu from '../../components/Partner/Menu'
import Profile from '../../components/Partner/Profile'
import ApprovePromotions from '../../components/Admin/ApprovePromotions'
import BusinessDistrictManagement from '../../components/Admin/BusinessDistrictManagement'
import SendEmail from '../../components/Admin/SendEmail'
import FoodDataManagement from '../../components/Admin/FoodDataManagement'
import BanUserManagement from '../../components/Admin/BanUserManagement'
import ContactUsMessage from '../../components/Admin/ContactUsMessage'
import RestaurantListManagemnet from '../../components/Admin/RestaurantListMangament'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
const axios = require('axios')

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function getBase64Antd(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


const Admin = () => {
    const isMobileResolution = useMediaQuery(768)
    const [currentTab, setCurrentTab] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [loadingRestaurantList, setLoadingRestaurantList] = React.useState(false);
    const [category, setCategory] = React.useState([]);
    const [table, setTable] = React.useState();
    const [containerWidth, setContainerWidth] = React.useState();
    const [dragging, setDragging] = React.useState(false);
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const restaurantfeature = ["restaurantManagement", "promote", "menu", "profile"]

    var searchInput = React.createRef();

    useEffect(() => {
        getRestaurantList()
    }, [])

    const getRestaurantList = async () => {
        setLoadingRestaurantList(true)
        let restaurantList = await restaurantService.getAllRestaurant();
        if (restaurantList) {
            setLoadingRestaurantList(false)
            setRestaurantList(restaurantList)
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
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
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

    const columnsAccount = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            ...getColumnSearchProps('Name'),
        },
        {
            title: 'Gender',
            dataIndex: 'Gender',
            key: 'Gender',
        },
        {
            title: 'Age',
            dataIndex: 'Age',
            key: 'Age',
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            filters: [
                { text: 'User', value: 'User' },
                { text: 'Restaurant', value: 'Restaurant' },
            ],
            onFilter: (value, record) => record.Type.includes(value),
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tag color="green" key={record.length} style={{ cursor: "pointer" }} onClick={() => setEdifProfileModalShow(true)}>
                        Edit
                    </Tag>
                    <Tag color="red" key={record.length + 10} style={{ cursor: "pointer" }}>
                        Delete
                    </Tag>
                </Space>
            ),
        }
    ]






    const [columns, setColumns] = React.useState([
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Switch defaultChecked onChange={onChange} />
                    {/* <Button style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => (setSelectCategory(record.category), setMenuModalShow(true))}>Add Menu</Button>
                    <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Edit</Button>
                    <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button> */}
                    <Tag color="blue" key={text + 1} style={{ cursor: "pointer" }} onClick={() => (setSelectCategory(record.category), setMenuModalShow(true))}>
                        Add Menu
                    </Tag>
                    <Tag color="green" key={text + 2} style={{ cursor: "pointer" }}>
                        Edit
                    </Tag>
                    <Tag color="red" key={text + 3} style={{ cursor: "pointer" }}>
                        Delete
                    </Tag>
                </Space>
            ),
        },
    ]);


    const handleAdd = (data) => {
        const dataSource = category;
        console.log(data)
        const newData = {
            key: (category.length + 1),
            category: data
        };

        setCategory([...dataSource, newData])
    };

    const columnsTable = columns.map((col) => {
        return {
            ...col
        };
    });



    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    }

    const handleChange = (info, type) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                switch (type) {
                    case 'PromoteImage': setPromoteImageUrl(imageUrl); break;
                    case 'RestaurantLogo': setRestaurantLogoUrl(imageUrl); break;
                    default: break;
                }
            }
            );
        }
    };

    const expandedRowRender = () => {
        const columns = [
            { title: 'No', dataIndex: 'id', key: 'id' },
            { title: 'Image', dataIndex: 'image', key: 'image', width: 300 },
            { title: 'Menu', dataIndex: 'menu', key: 'menu' },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Switch defaultChecked onChange={onChange} />
                        {/* <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Edit</Button>
                        <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button> */}
                        <Tag color="green" key={text + 2} style={{ cursor: "pointer" }}>
                            Edit
                        </Tag>
                        <Tag color="red" key={text + 3} style={{ cursor: "pointer" }}>
                            Delete
                        </Tag>
                    </Space>
                ),
            },
        ];

        let data = [];
        for (let i = 0; i < 3; ++i) {
            data = [
                {
                    id: 1,
                    image: (<img src="/images/food4.jpg" />),
                    menu: 'ยำรวมมิตร',
                    description: '',
                    price: 120
                },
                {
                    id: 2,
                    menu: 'แซลมอน',
                    image: (<img src="/images/food9.jpg" />),
                    description: '',
                    price: 250
                },
                {
                    id: 3,
                    image: (<img src="/images/food8.jpg" />),
                    menu: 'ลูกชิ้น',
                    description: '',
                    price: 50
                },
            ]
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const onClick = (data) => {
        // your code
        setTableSelected(data.tableNumber)
        setViewOrderModalShow(true)
    }

    const onDrop = (event) => {

        // your code
    }

    const onDrag = () => {

        setDragging(true)
    }

    const onStop = (data) => {
        setDragging(false)
        if (dragging) {
            onDrop()
        } else {
            onClick(data)
        }
    }

    function onChangePrice(value) {
        console.log('value: ', value);
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
    }

    let tableManagement = table && table.map((data) =>
        <Draggable
            bounds="parent"
            defaultPosition={{ x: data.x, y: data.y }}
            onDrag={() => onDrag()}
            onStop={() => onStop(data)}
        >
            <div style={{ width: containerWidth / 10, height: containerWidth / 10, cursor: "pointer", backgroundImage: `url(${data.tableImage})`, backgroundSize: 'contain' }}  >
                {/* <Image src={data.tableImage} className={styles.img} /> */}
                <div className={styles.tableNumber} >
                    {data.tableNumber}
                </div>
            </div>
        </Draggable>
    )

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64Antd(file.originFileObj);
        }
        console.log(file.preview)
        setPreviewImage(file.url || file.preview,)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1),)
        setPreviewVisible(true)
    };
    const uploadButton = (

        <div >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChangeUploadRestaurant = ({ fileList }) => {
        setRestaurantfileList(fileList)
    }


    const handleChangeMenu = value => {
        setMenuSelected(value)
        console.log(value)
    }

    function onChangeRestaurant(restaurantId) {
        setRestaurantId(restaurantId)
    }

    function onSearchRestaurantName(val) {
        console.log('search:', val);
    }

    const handleImageUploadBefore = (files, info, uploadHandler) => {
        console.log(files, info)
    }
    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
    }
    const handleImageUploadError = (errorMessage, result) => {
        console.log(errorMessage, result)
    }


    const onChangeTab = (key) => {
        setCurrentTab(key)
    }


    return (
        <Layout containerType="center">
            <Container className={!isMobileResolution ? styles.container : utilStyles.container_sm + " " + utilStyles.background_white}>

                {
                    !isMobileResolution ? (
                        //PC Version
                        <>
                            <Tab.Container id="left-tabs-management-admin" defaultActiveKey="restaurantManagement" onSelect={onChangeTab}>
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column" style={{ fontSize: "16px" }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="restaurantManagement">Table Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="promote">Promote</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="menu">Menu</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="restaurantListManagement">Restaurant List</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="email">Email</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="approvePromotion">Approve Promotion</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="accountManagement">Account Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="businessDistrict">Business District Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="banUser">Ban user</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="viewContactUs">View Contact Us</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="foodData">Food Data</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="setting">Setting </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            {
                                                // check tab is restaurant feature?
                                                restaurantfeature.indexOf(currentTab) > -1 && (
                                                    <SelectRestaurant
                                                        onChangeRestaurant={onChangeRestaurant}
                                                        restauran_list={restaurantList}
                                                        restaurant_id={restaurantId}
                                                    />
                                                )
                                            }

                                            <Tab.Pane eventKey="restaurantManagement">
                                                <Spin spinning={loadingRestaurantList} tip="Loading...">
                                                    <RestaurantManagement
                                                        restaurant_id={restaurantId}
                                                        current_tab={currentTab}
                                                    />
                                                </Spin>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="promote">
                                                <Spin spinning={loadingRestaurantList} tip="Loading...">
                                                    <Promote
                                                        restaurant_id={restaurantId}
                                                    />
                                                </Spin>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="menu">
                                                <Menu
                                                    restaurant_id={restaurantId}
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="profile">
                                                <Profile
                                                    restaurant_id={restaurantId}
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="restaurantListManagement">
                                                <RestaurantListManagemnet
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="email">
                                                <SendEmail />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="approvePromotion">
                                                <ApprovePromotions
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="accountManagement">
                                                <AccountManagement
                                                    restaurant_list={restaurantList}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="businessDistrict">
                                                <BusinessDistrictManagement
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="banUser">
                                                <BanUserManagement
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="viewContactUs">
                                                <ContactUsMessage
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="foodData">
                                                <FoodDataManagement
                                                    current_tab={currentTab}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="setting">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                                                    Term Agreement
                                                </div>
                                                <Card title="Term Agreements" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
                                                    {termAgreement.text}
                                                </Card>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </>
                    ) : (
                        //Mobile Version
                        <>
                            <div style={{ padding: "15px" }}>
                                <Select defaultValue="restaurantManagement" value={menuSelected} style={{ width: '100%' }} onChange={(value) => handleChangeMenu(value)}>
                                    <Option value="restaurantManagement">Restaurant Management</Option>
                                    <Option value="promote">Promote</Option>
                                    <Option value="menu">Menu Management</Option>
                                    <Option value="profile">Profile Management</Option>
                                    <Option value="restaurantListManagement">Restaurant List Management</Option>
                                    <Option value="email">Email</Option>
                                    <Option value="directMessage">Direct Message</Option>
                                    <Option value="approvePromotion">Approve Promotion</Option>
                                    <Option value="accountManagement">Account Management</Option>
                                    <Option value="businessDistrict">BusinessDistrict</Option>
                                    <Option value="banUser">Ban user</Option>
                                    <Option value="viewContactUs">View Contact Us</Option>
                                    <Option value="foodData">Food Data Management</Option>
                                    <Option value="setting">Setting</Option>
                                </Select>
                            </div>

                            {
                                menuSelected == 'restaurantManagement' ? (
                                    <Spin spinning={loadingRestaurantList} tip="Loading...">
                                        <SelectRestaurant
                                            onChangeRestaurant={onChangeRestaurant}
                                            restauran_list={restaurantList}
                                        />
                                        <RestaurantManagement
                                            restaurant_id={restaurantId}
                                            current_tab={menuSelected}
                                        />
                                    </Spin>
                                ) : null
                            }

                            {
                                menuSelected == 'promote' ? (
                                    <Spin spinning={loadingRestaurantList} tip="Loading...">
                                        <SelectRestaurant
                                            onChangeRestaurant={onChangeRestaurant}
                                            restauran_list={restaurantList}
                                        />
                                        <Promote
                                            restaurant_id={restaurantId}
                                        />
                                    </Spin>
                                ) : null
                            }
                            {
                                menuSelected == 'menu' ? (
                                    <>
                                        <SelectRestaurant
                                            onChangeRestaurant={onChangeRestaurant}
                                            restauran_list={restaurantList}
                                        />
                                        <Menu
                                            restaurant_id={restaurantId}
                                            current_tab={menuSelected}
                                        />
                                    </>
                                ) : null
                            }
                            {
                                menuSelected == 'profile' ? (
                                    <>
                                        <SelectRestaurant
                                            onChangeRestaurant={onChangeRestaurant}
                                            restauran_list={restaurantList}
                                        />
                                        <Profile
                                            restaurant_id={restaurantId}
                                            current_tab={menuSelected}
                                        />
                                    </>
                                ) : null
                            }
                            {
                                menuSelected == 'restaurantListManagement' ? (
                                    <Tab.Pane eventKey="restaurantListManagement">
                                        <RestaurantListManagemnet
                                            current_tab={menuSelected}
                                        />
                                    </Tab.Pane>
                                ) : null
                            }


                            {
                                menuSelected == 'email' ? (
                                    <SendEmail />
                                ) : null
                            }
                            {
                                menuSelected == 'directMessage' ? (
                                    <DirectMessageAdmin />
                                ) : null
                            }
                            {
                                menuSelected == 'approvePromotion' ? (
                                    <ApprovePromotions
                                        current_tab={menuSelected}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'accountManagement' ? (
                                    <AccountManagement
                                        restaurant_list={restaurantList}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'businessDistrict' ? (
                                    <BusinessDistrictManagement
                                        current_tab={menuSelected}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'banUser' ? (
                                    <BanUserManagement
                                        current_tab={menuSelected}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'viewContactUs' ? (
                                    <ContactUsMessage
                                        current_tab={menuSelected}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'foodData' ? (
                                    <FoodDataManagement
                                        current_tab={menuSelected}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'setting' ? (
                                    <Card title="Term Agreements" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
                                        {termAgreement.text}
                                    </Card>
                                ) : null
                            }

                        </>
                    )
                }

            </Container >
        </Layout >
    )
}




export default Admin

Admin.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        login: PropTypes.string,
        avatarUrl: PropTypes.string,
    }),
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get('user')
    const roles = ['admin']
    let havePermission = false

    if (user) {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get(`${process.env.API_URL}/profile`, config)
        let profile = reponse.data

        profile.roles.forEach((userRole) => {
            roles.forEach((role) => {
                if (userRole === role) {
                    havePermission = true
                }
            })
        })

        console.log('havePermission', havePermission)

        if (!havePermission) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        } else {
            user.profile = profile
        }

    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { user },
    }
})
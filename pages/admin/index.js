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
import FoodDataManagement from '../../components/Admin/FoodDataManagement';

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


export default function Admin() {
    const isMobileResolution = useMediaQuery(768)
    const [currentTab, setCurrentTab] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [loadingRestaurantList, setLoadingRestaurantList] = React.useState(false);

    const [promoteImageUrl, setPromoteImageUrl] = React.useState("data:image/png;base64,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");
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState("data:image/png;base64,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");
    const [categoryModalShow, setCategoryModalShow] = React.useState(false);
    const [menuModalShow, setMenuModalShow] = React.useState(false);
    const [viewOrderModalShow, setViewOrderModalShow] = React.useState(false);
    const [selectCategory, setSelectCategory] = React.useState();
    const [category, setCategory] = React.useState([]);
    const [addTableModalShow, setAddTableModalShow] = React.useState(false);
    const [initialTable, setInitialTable] = React.useState(3);
    const refTableManagement = React.createRef()
    const [table, setTable] = React.useState();
    const [containerWidth, setContainerWidth] = React.useState();
    const [tableSelected, setTableSelected] = React.useState();
    const [dragging, setDragging] = React.useState(false);
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [logoFileList, setLogoFileList] = React.useState([]);
    const [restaurantfileList, setRestaurantfileList] = React.useState([]);
    const [imageUrl, setImageUrl] = React.useState('');
    const [tableNumber, setTableNumber] = React.useState('1');
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const [checkBoxAllEmail, setCheckBoxAllEmail] = React.useState();
    const options = ['All Users', 'All Restaurants']
    const [edifProfileModalShow, setEdifProfileModalShow] = React.useState();
    const [profileEdited, setProfileEdited] = React.useState();
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [searchText, setSearchText] = React.useState('');
    const [foodDataModalShow, setFoodDataModalShow] = React.useState(false);
    const [foodItemSelectedForEdit, setFoodItemSelectedForEdit] = React.useState();
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
                            <Tab.Container id="left-tabs-management-admin" defaultActiveKey="foodData" onSelect={onChangeTab}>
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
                                                <Nav.Link eventKey="email">Email</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="directMessage">Direct Message</Nav.Link>
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
                                                <Nav.Link eventKey="foodData">Food Data</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="setting">Setting </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="restaurantManagement">
                                                <Spin spinning={loadingRestaurantList} tip="Loading...">
                                                    <SelectRestaurant
                                                        onChangeRestaurant={onChangeRestaurant}
                                                        restauran_list={restaurantList}
                                                    />
                                                    <RestaurantManagement
                                                        restaurant_id={restaurantId}
                                                        current_tab={currentTab}
                                                    />
                                                </Spin>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="promote">
                                                <Spin spinning={loadingRestaurantList} tip="Loading...">
                                                    <SelectRestaurant
                                                        onChangeRestaurant={onChangeRestaurant}
                                                        restauran_list={restaurantList}
                                                    />
                                                    <Promote
                                                        restaurant_id={restaurantId}
                                                    />
                                                </Spin>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="menu">
                                                <SelectRestaurant
                                                    onChangeRestaurant={onChangeRestaurant}
                                                    restauran_list={restaurantList}
                                                />
                                                <Menu
                                                    restaurant_id={restaurantId}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="profile">
                                                <SelectRestaurant
                                                    onChangeRestaurant={onChangeRestaurant}
                                                    restauran_list={restaurantList}
                                                />
                                                <Profile
                                                    restaurant_id={restaurantId}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="email">
                                                <SendEmail />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="directMessage">
                                                <DirectMessageAdmin />
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
                                    <Option value="email">Email</Option>
                                    <Option value="directMessage">Direct Message</Option>
                                    <Option value="approvePromotion">Approve Promotion</Option>
                                    <Option value="accountManagement">Account Management</Option>
                                    <Option value="businessDistrict">BusinessDistrict</Option>
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
                                            current_tab={currentTab}
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
                                        />
                                    </>
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
                                        current_tab={currentTab}
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
                                        current_tab={currentTab}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'foodData' ? (
                                    <FoodDataManagement
                                        current_tab={currentTab}
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




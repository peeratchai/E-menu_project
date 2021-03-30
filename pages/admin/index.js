import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Tab, Modal, Container, Tabs, Nav } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, message, Table, Space, Switch, Select, Slider, Checkbox, Tag, Radio, Input, Button, Card } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined, DeleteOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import AntdModal from "../../components/AntdModal"
import useMediaQuery from "../../utils/utils";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import DirectMessageAdmin from '../../components/DirectMessageAdmin/index'
import { SearchOutlined } from '@ant-design/icons';
import termAgreement from '../../utils/termAgreement.json'

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
    const isBreakpoint = useMediaQuery(768)

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
    var searchInput = React.createRef();

    const columnsApprovePromotion = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            width: 70,
        },
        {
            title: 'Promotions',
            dataIndex: 'Promotions',
            key: 'Promotions',
            width: 300,
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'RestaurantName',
            key: 'RestaurantName',
            width: 200,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (text, record) => (
                <Space size="middle">
                    <Tag color="green" key={record.length} style={{ cursor: "pointer" }}>
                        Approve
                    </Tag>
                    <Tag color="red" key={record.length + 10} style={{ cursor: "pointer" }}>
                        Reject
                    </Tag>
                </Space>
            ),
        }
    ]

    const dataAccount = [
        {
            key: "1",
            No: "1",
            Name: "Peeratchai Kittisupap",
            Gender: "ชาย",
            Age: "25",
            Type: "Restaurant"
        },
        {
            key: "2",
            No: "2",
            Name: "Peeratchai Kittisupap",
            Gender: "ชาย",
            Age: "30",
            Type: "User"
        },
        {
            key: "3",
            No: "3",
            Name: "Peeratchai Kittisupap",
            Gender: "หญิง",
            Age: "27",
            Type: "User"
        }
    ]

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
            width: 70,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            width: 250,
            ...getColumnSearchProps('Name'),
        },
        {
            title: 'Gender',
            dataIndex: 'Gender',
            key: 'Gender',
            width: 100,
        },
        {
            title: 'Age',
            dataIndex: 'Age',
            key: 'Age',
            width: 100,
        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            width: 200,
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
            width: 200,
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

    const dataApprovePromotionTable = [
        {
            key: '1',
            No: '1',
            Promotions: 'Promotions 1',
            RestaurantName: 'RestaurantName 1',
        },
        {
            key: '2',
            No: '2',
            Promotions: 'Promotions 2',
            RestaurantName: 'RestaurantName 2',
        },
    ]


    useEffect(() => {
        if (!isBreakpoint) {
            let containerWidth = refTableManagement.current.offsetWidth
            setContainerWidth(containerWidth)
            let containerHeight = refTableManagement.current.offsetHeight
            console.log(containerWidth)
            console.log(refTableManagement.current.offsetHeight)
            ratioTableImages(containerWidth, containerHeight);
        }
    }, [])

    const ratioTableImages = (width, height) => {
        let realWidth = width / 10
        // let realHeight = height / 10
        setTable(
            [
                {
                    tableNumber: 1,
                    tableImage: '/images/table-triangle-M.png',
                    x: 0,
                    y: 0
                },
                {
                    tableNumber: 2,
                    tableImage: '/images/table-square-M.png',
                    x: realWidth + 15,
                    y: -realWidth
                },
                {
                    tableNumber: 3,
                    tableImage: '/images/table-square-L.png',
                    x: (realWidth * 2) + 15,
                    y: -(realWidth * 2)
                }
            ]
        )
    }

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

    function onChangeRestaurantName(value) {
        console.log(`selected ${value}`);
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
    function onChangeCheckbox(checkedValues) {
        // if(checkBoxAllEmail == 'All users'){

        // }else{

        // }
        console.log('checked = ', checkedValues);
    }

    return (
        <Layout center>
            <Container className={!isBreakpoint ? styles.container : utilStyles.container_sm + " " + utilStyles.background_white}>

                {
                    !isBreakpoint ? (
                        //PC Version
                        <>
                            {/* <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                Restaurant Name : &nbsp;
                                <Select
                                    showSearch
                                    style={{ width: 400 }}
                                    placeholder="Select a restaurant name"
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
                            </div> */}

                            <Tab.Container id="left-tabs-example" defaultActiveKey="tableManagement">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column" style={{ fontSize: "16px" }}>
                                            <Nav.Item>
                                                <Nav.Link eventKey="tableManagement">Table Management</Nav.Link>
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
                                                <Nav.Link eventKey="setting">Setting </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="tableManagement">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                    Restaurant Name : &nbsp;
                                                        <Select
                                                        showSearch
                                                        style={{ width: 400 }}
                                                        placeholder="Select a restaurant name"
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
                                                <div className={styles.tab}>
                                                    <Row>
                                                        <Col xs={10}>
                                                            <Form>
                                                                <Form.Group controlId="areaName">
                                                                    <Form.Control type="text" placeholder="ชื่อบริเวณ" />
                                                                </Form.Group>
                                                            </Form>
                                                        </Col>
                                                        <Col xs={2} style={{ textAlign: "right" }}>
                                                            <Button type="primary" onClick={() => setAddTableModalShow(true)}>
                                                                Add
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ height: "30rem" }} ref={refTableManagement}>
                                                            <div className={styles.container2}>
                                                                {tableManagement}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="promote">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                    Restaurant Name : &nbsp;
                                                        <Select
                                                        showSearch
                                                        style={{ width: 400 }}
                                                        placeholder="Select a restaurant name"
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
                                                <div className={styles.tab}>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <Row>
                                                                <Col>
                                                                    <img src={promoteImageUrl} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col>
                                                                    <Upload
                                                                        showUploadList={false}
                                                                        beforeUpload={beforeUpload}
                                                                        onChange={(e) => handleChange(e, 'PromoteImage')}
                                                                        style={{ width: "100%" }}
                                                                    // onPreview={(e) => onPreview(e)}
                                                                    >
                                                                        <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Promote Image</Button>
                                                                    </Upload>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col sm={6}>
                                                            <Form>
                                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                                    <Form.Label className={utilStyles.cardTitle}>Promoted contents</Form.Label>
                                                                    <Form.Control as="textarea" rows={4} />
                                                                </Form.Group>
                                                                <div style={{ textAlign: "right" }}>
                                                                    <Button type="primary">
                                                                        Post
                                                                    </Button>
                                                                </div>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="menu">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                    Restaurant Name : &nbsp;
                                                    <Select
                                                        showSearch
                                                        style={{ width: 400 }}
                                                        placeholder="Select a restaurant name"
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
                                                <div className={styles.tab}>
                                                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                                        <Button className={utilStyles.fontContent} onClick={() => setCategoryModalShow(true)} type="primary">Add Category</Button>
                                                    </div>
                                                    <Table columns={columnsTable} dataSource={category} expandable={{ expandedRowRender }} />
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="profile">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                    Restaurant Name : &nbsp;
                                                    <Select
                                                        showSearch
                                                        style={{ width: 400 }}
                                                        placeholder="Select a restaurant name"
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
                                                <div className={styles.tab}>
                                                    <Row>
                                                        <Col sm={6}>
                                                            {/* Upload restaurants logo */}
                                                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                                <Row style={{ marginBottom: "10px" }}>
                                                                    <Col>
                                                                        <div>
                                                                            Restaurant Logo
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row style={{ textAlign: "center" }}>
                                                                    <Col>
                                                                        <Row>
                                                                            <Col>
                                                                                <img src={restaurantLogoUrl} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
                                                                            </Col>
                                                                        </Row>
                                                                        <br />
                                                                        <Row>
                                                                            <Col>
                                                                                <Upload
                                                                                    showUploadList={false}
                                                                                    beforeUpload={beforeUpload}
                                                                                    onChange={(e) => handleChange(e, 'RestaurantLogo')}
                                                                                    style={{ width: "100%" }}
                                                                                // onPreview={(e) => onPreview(e)}
                                                                                >
                                                                                    <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Restaurant Logo</Button>
                                                                                </Upload>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                                <Row style={{ marginBottom: "10px" }}>
                                                                    <Col>
                                                                        <div>
                                                                            Restaurant Picture
                                                </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Upload
                                                                            listType="picture-card"
                                                                            fileList={restaurantfileList}
                                                                            onPreview={(e) => handlePreview(e)}
                                                                            onChange={(e) => handleChangeUploadRestaurant(e)}
                                                                            className="upload-restaurant-list"
                                                                        >
                                                                            {restaurantfileList.length > 3 ? null : uploadButton}
                                                                        </Upload>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <AntdModal
                                                                previewVisible={previewVisible}
                                                                previewTitle={previewTitle}
                                                                footer={null}
                                                                onCancel={handleCancel}
                                                                previewImage={previewImage}
                                                            />


                                                        </Col>
                                                        <Col sm={6}>
                                                            <Form>
                                                                <Form.Group controlId="restaurantName">
                                                                    <Form.Label>Restaurant Name</Form.Label>
                                                                    <Form.Control type="text" placeholder="Enter Restaurant Name" />
                                                                </Form.Group>
                                                                <Form.Group controlId="location">
                                                                    <Form.Label>Location</Form.Label>
                                                                    <Form.Control type="text" placeholder="Location" />
                                                                </Form.Group>
                                                                <Form.Group controlId="openingTime">
                                                                    <Form.Label>Opening Time</Form.Label>
                                                                    <Form.Control type="text" placeholder="Opening Time" />
                                                                </Form.Group>
                                                                <Form.Group controlId="priceRange">
                                                                    <Form.Label>Price Range</Form.Label>
                                                                    <br />
                                                                    <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePrice} />
                                                                    <div className={utilStyles.fontContent}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                                                </Form.Group>

                                                                <div style={{ textAlign: "right" }}>
                                                                    <Button type="primary" >
                                                                        Save
                                            </Button>
                                                                </div>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="email">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                                                    Email
                                                </div>
                                                <div className={styles.tab}>
                                                    <div style={{ textAlign: "right", marginBottom: "15px" }}>
                                                        <Checkbox.Group options={options} onChange={(checkedValues) => onChangeCheckbox(checkedValues)} />
                                                    </div>
                                                    <Form>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2">
                                                                From
                                            </Form.Label>
                                                            <Col sm="10">
                                                                <Form.Control defaultValue="" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2">
                                                                To
                                            </Form.Label>
                                                            <Col sm="10">
                                                                <Form.Control defaultValue="" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2">
                                                                CC
                                            </Form.Label>
                                                            <Col sm="10">
                                                                <Form.Control defaultValue="" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2">
                                                                Subject
                                            </Form.Label>
                                                            <Col sm="10">
                                                                <Form.Control defaultValue="" />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2">
                                                                Message
                                            </Form.Label>
                                                            <Col sm="10">
                                                                {/* <ReactRichEditor
                                                    onCodeChange={e => console.log(e)}
                                                    height={200}
                                                /> */}
                                                                <SunEditor
                                                                    onChange={(content) => console.log(content)}
                                                                    onImageUpload={(targetImgElement, index, state, imageInfo, remainingFilesCount) => handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount)}
                                                                    // onImageUploadBefore={(files, info, uploadHandler) => handleImageUploadBefore(files, info, uploadHandler)}
                                                                    onImageUploadError={(errorMessage, result) => handleImageUploadError(errorMessage, result)}
                                                                    setOptions={{
                                                                        height: 200,
                                                                        buttonList: [[
                                                                            'align',
                                                                            'font',
                                                                            'fontColor',
                                                                            'fontSize',
                                                                            'formatBlock',
                                                                            'hiliteColor',
                                                                            'horizontalRule',
                                                                            'lineHeight',
                                                                            'list',
                                                                            'paragraphStyle',
                                                                            'table',
                                                                            'template',
                                                                            'textStyle',
                                                                            /** Dialog */
                                                                            'image',
                                                                            'link']]// Or Array of button list, eg. [['font', 'align'], ['image']]
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Form.Group>


                                                        <div style={{ textAlign: "right" }}>
                                                            <Button type="primary" >
                                                                Send Email
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="directMessage">
                                                <DirectMessageAdmin />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="approvePromotion">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                                                    Approve Promotion
                                                </div>
                                                <Table columns={columnsApprovePromotion} dataSource={dataApprovePromotionTable} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="accountManagement">
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                                                    Account Management
                                                </div>
                                                <Table columns={columnsAccount} dataSource={dataAccount} style={{ overflow: "auto" }} />
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

                            {/* <Tabs defaultActiveKey="restaurantManagement" id="uncontrolled-tab-example">
                                <Tab eventKey="restaurantManagement" title="Restaurant Management">
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col xs={11}>
                                                <Form>
                                                    <Form.Group controlId="areaName">
                                                        <Form.Control type="text" placeholder="ชื่อบริเวณ" />
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                            <Col xs={1}>
                                                <Button onClick={() => setAddTableModalShow(true)}>
                                                    Add
                                    </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ height: "30rem" }} ref={refTableManagement}>
                                                <div className={styles.container2}>
                                                    {tableManagement}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab eventKey="promote" title="Promote">
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col sm={6}>
                                                <Row>
                                                    <Col>
                                                        <img src={promoteImageUrl} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col>
                                                        <Upload
                                                            showUploadList={false}
                                                            beforeUpload={beforeUpload}
                                                            onChange={(e) => handleChange(e, 'PromoteImage')}
                                                            style={{ width: "100%" }}
                                                        // onPreview={(e) => onPreview(e)}
                                                        >
                                                            <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Promote Image</Button>
                                                        </Upload>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label className={utilStyles.cardTitle}>Promoted contents</Form.Label>
                                                        <Form.Control as="textarea" rows={4} />
                                                    </Form.Group>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button variant="primary" type="submit">
                                                            Post
                                            </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab eventKey="menu" title="Menu">
                                    <div className={styles.tab}>
                                        <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                            <Button className={utilStyles.fontContent} onClick={() => setCategoryModalShow(true)}>Add Category</Button>
                                        </div>
                                        <Table columns={columnsTable} dataSource={category} expandable={{ expandedRowRender }} />
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Profile">
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col sm={6}>
                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <div>
                                                                Restaurant Logo
                                                </div>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ textAlign: "center" }}>
                                                        <Col>
                                                            <Row>
                                                                <Col>
                                                                    <img src={restaurantLogoUrl} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col>
                                                                    <Upload
                                                                        showUploadList={false}
                                                                        beforeUpload={beforeUpload}
                                                                        onChange={(e) => handleChange(e, 'RestaurantLogo')}
                                                                        style={{ width: "100%" }}
                                                                    // onPreview={(e) => onPreview(e)}
                                                                    >
                                                                        <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Restaurant Logo</Button>
                                                                    </Upload>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <div>
                                                                Restaurant Picture
                                                </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Upload
                                                                listType="picture-card"
                                                                fileList={restaurantfileList}
                                                                onPreview={(e) => handlePreview(e)}
                                                                onChange={(e) => handleChangeUploadRestaurant(e)}
                                                                className="upload-restaurant-list"
                                                            >
                                                                {restaurantfileList.length > 3 ? null : uploadButton}
                                                            </Upload>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <AntdModal
                                                    previewVisible={previewVisible}
                                                    previewTitle={previewTitle}
                                                    footer={null}
                                                    onCancel={handleCancel}
                                                    previewImage={previewImage}
                                                />


                                            </Col>
                                            <Col sm={6}>
                                                <Form>
                                                    <Form.Group controlId="restaurantName">
                                                        <Form.Label>Restaurant Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Restaurant Name" />
                                                    </Form.Group>
                                                    <Form.Group controlId="location">
                                                        <Form.Label>Location</Form.Label>
                                                        <Form.Control type="text" placeholder="Location" />
                                                    </Form.Group>
                                                    <Form.Group controlId="openingTime">
                                                        <Form.Label>Opening Time</Form.Label>
                                                        <Form.Control type="text" placeholder="Opening Time" />
                                                    </Form.Group>
                                                    <Form.Group controlId="priceRange">
                                                        <Form.Label>Price Range</Form.Label>
                                                        <br />
                                                        <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePrice} />
                                                        <div className={utilStyles.fontContent}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                                    </Form.Group>

                                                    <div style={{ textAlign: "right" }}>
                                                        <Button variant="primary" >
                                                            Save
                                            </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>
                                <Tab eventKey="email" title="Email">
                                    <div className={styles.tab}>
                                        <div style={{ textAlign: "right", marginBottom: "15px" }}>
                                            <Checkbox.Group options={options} onChange={(checkedValues) => onChangeCheckbox(checkedValues)} />
                                        </div>
                                        <Form>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    From
                                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    To
                                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    CC
                                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    Subject
                                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    Message
                                            </Form.Label>
                                                <Col sm="10">
                                                    {/* <ReactRichEditor
                                                    onCodeChange={e => console.log(e)}
                                                    height={200}
                                                /> 
                            <SunEditor
                                onChange={(content) => console.log(content)}
                                onImageUpload={(targetImgElement, index, state, imageInfo, remainingFilesCount) => handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount)}
                                // onImageUploadBefore={(files, info, uploadHandler) => handleImageUploadBefore(files, info, uploadHandler)}
                                onImageUploadError={(errorMessage, result) => handleImageUploadError(errorMessage, result)}
                                setOptions={{
                                    height: 200,
                                    buttonList: [[
                                        'align',
                                        'font',
                                        'fontColor',
                                        'fontSize',
                                        'formatBlock',
                                        'hiliteColor',
                                        'horizontalRule',
                                        'lineHeight',
                                        'list',
                                        'paragraphStyle',
                                        'table',
                                        'template',
                                        'textStyle',
                                        'image',
                                        'link']]// Or Array of button list, eg. [['font', 'align'], ['image']]
                                }}
                            />
                        </Col>
                                            </Form.Group>


            <div style={{ textAlign: "right" }}>
                <Button variant="primary" >
                    Send Email
                                            </Button>
            </div>
                                        </Form>
                                    </div >
                                </Tab >
                                <Tab eventKey="directMessage" title="Direct Message">
                                    <DirectMessageAdmin />
                                </Tab>
                                <Tab eventKey="approvePromotion" title="Approve Promotion">
                                    <Table columns={columnsApprovePromotion} dataSource={dataApprovePromotionTable} />
                                </Tab>
                                <Tab eventKey="setting" title="Setting">
            Sign Out
                                    <br />
                                Term Agreement
                            </Tab> 
                            </Tabs > */}
                        </>
                    ) : (
                        //Mobile Version
                        <>
                            <div style={{ padding: "15px" }}>
                                <Select defaultValue="restaurantManagement" value={menuSelected} style={{ width: '100%' }} onChange={(value) => handleChangeMenu(value)}>
                                    <Option value="restaurantManagement">Restaurant Management</Option>
                                    <Option value="promote">Promote</Option>
                                    <Option value="menu">Menu</Option>
                                    <Option value="profile">Profile</Option>
                                    <Option value="email">Email</Option>
                                    <Option value="directMessage">Direct Message</Option>
                                    <Option value="approvePromotion">Approve Promotion</Option>
                                    <Option value="accountManagement">Account Management</Option>
                                    <Option value="setting">Setting</Option>
                                </Select>
                            </div>

                            {
                                menuSelected == 'restaurantManagement' ? (
                                    <Row >
                                        <Col xs={12} style={{ borderRight: "1px solid #DEDEDE" }}>
                                            {/* Table list */}
                                            <Row>
                                                <Col>
                                                    <div style={{ margin: "10px", fontWeight: "600", textAlign: "center", borderRadius: "5px", backgroundColor: "gainsboro" }}>
                                                        Order Management
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={tableNumber == 1 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(1)}>
                                                <Col>
                                                    <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                        <Row >
                                                            <Col>
                                                                <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T1
                                            </Col>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }}>
                                                                    <b>1,059 THB</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                                    14:14:59 - 20/03/2021
                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={tableNumber == 2 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(2)}>
                                                <Col>
                                                    <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                        <Row >
                                                            <Col>
                                                                <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T2
                                            </Col>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }}>
                                                                    <b>860 THB</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                                    14:14:59 - 20/03/2021
                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={tableNumber == 3 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                                <Col>
                                                    <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                        <Row >
                                                            <Col>
                                                                <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T3
                                            </Col>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }}>
                                                                    <b>1530 THB</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                                    14:14:59 - 20/03/2021
                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {/* Order Details */}

                                        <Col xs={12}>
                                            <Row>
                                                <Col>
                                                    <div style={{ margin: "10px 10px 15px 10px", fontWeight: "600", textAlign: "center", borderRadius: "5px", backgroundColor: "gainsboro" }}>
                                                        Order Details of Table {tableNumber}
                                                    </div>
                                                </Col>
                                            </Row>

                                            {
                                                tableNumber == '1' ? (
                                                    <>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Col>
                                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                                    <Row >
                                                                        <Col xs={4}>
                                                                            <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div>
                                                                                <Row>
                                                                                    <Col xs={8}>
                                                                                        <div>
                                                                                            <b>ผัดไทย</b>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs={4}>
                                                                                        <div className={utilStyles.fontContentSM} style={{ textAlign: "center" }}>
                                                                                            <Button type="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div>
                                                                                <b>x 1</b>
                                                                            </div>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                Price : 80 THB
                                                </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Col>
                                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                                    <Row >
                                                                        <Col xs={4}>
                                                                            <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div>
                                                                                <Row>
                                                                                    <Col xs={8}>
                                                                                        <div>
                                                                                            <b>ยำปลาหมึก</b>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs={4}>
                                                                                        <div className={utilStyles.fontContentSM} style={{ textAlign: "center" }}>
                                                                                            <Button type="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div>
                                                                                <b>x 2</b>
                                                                            </div>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                Price : 160 THB
                                                </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Col>
                                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                                    <Row >
                                                                        <Col xs={4}>
                                                                            <Image src="/images/food6.jpg" rounded style={{ height: "100%" }} />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div>
                                                                                <Row>
                                                                                    <Col xs={8}>
                                                                                        <div>
                                                                                            <b>ยำ</b>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs={4}>
                                                                                        <div className={utilStyles.fontContentSM} style={{ textAlign: "center" }}>
                                                                                            <Button type="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div>
                                                                                <b>x 1</b>
                                                                            </div>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                Price : 80 THB
                                                </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                ) : null
                                            }
                                            {
                                                tableNumber == '2' ? (
                                                    <>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Col>
                                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                                    <Row >
                                                                        <Col xs={4}>
                                                                            <Image src="/images/food3.jpg" rounded style={{ height: "100%" }} />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div>
                                                                                <Row>
                                                                                    <Col xs={8}>
                                                                                        <div>
                                                                                            <b>ไก่ทอด</b>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs={4}>
                                                                                        <div className={utilStyles.fontContentSM} style={{ textAlign: "center" }}>
                                                                                            <Button type="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div>
                                                                                <b>x 1</b>
                                                                            </div>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                Price : 120 THB
                                                </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ paddingBottom: "10px" }}>
                                                            <Col>
                                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                                    <Row >
                                                                        <Col xs={4}>
                                                                            <Image src="/images/food4.jpg" rounded style={{ height: "100%" }} />
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div>
                                                                                <Row>
                                                                                    <Col xs={8}>
                                                                                        <div>
                                                                                            <b>ยำปลาหมึก</b>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col xs={4}>
                                                                                        <div className={utilStyles.fontContentSM} style={{ textAlign: "center" }}>
                                                                                            <Button type="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            <div>
                                                                                <b>x 2</b>
                                                                            </div>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                Price : 160 THB
                                                </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                ) : null
                                            }
                                        </Col>
                                    </Row>
                                ) : null
                            }

                            {
                                menuSelected == 'promote' ? (
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col sm={6}>
                                                <Row>
                                                    <Col>
                                                        <img src={promoteImageUrl} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col>
                                                        <Upload
                                                            showUploadList={false}
                                                            beforeUpload={beforeUpload}
                                                            onChange={(e) => handleChange(e, 'PromoteImage')}
                                                            style={{ width: "100%" }}
                                                        // onPreview={(e) => onPreview(e)}
                                                        >
                                                            <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Promote Image</Button>
                                                        </Upload>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm={6}>
                                                <Form>
                                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label className={utilStyles.cardTitle}>Promoted contents</Form.Label>
                                                        <Form.Control as="textarea" rows={4} />
                                                    </Form.Group>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Button type="primary" type="submit">
                                                            Post
                                            </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : null
                            }
                            {
                                menuSelected == 'menu' ? (
                                    <div className={styles.tab}>
                                        <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                            <Button className={utilStyles.fontContent} onClick={() => setCategoryModalShow(true)}>Add Category</Button>
                                        </div>
                                        <Table columns={columnsTable} dataSource={category} expandable={{ expandedRowRender }} style={{ overflow: "auto" }} />
                                    </div>
                                ) : null
                            }
                            {
                                menuSelected == 'profile' ? (
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col sm={6}>
                                                {/* Upload restaurants logo */}
                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <div>
                                                                Restaurant Logo
                                                </div>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ textAlign: "center" }}>
                                                        <Col>
                                                            <Row>
                                                                <Col>
                                                                    <img src={restaurantLogoUrl} alt="avatar" style={{ width: '100%', height: '10rem', border: "1px solid #555", borderRadius: "5px", objectFit: "contain" }} />
                                                                </Col>
                                                            </Row>
                                                            <br />
                                                            <Row>
                                                                <Col>
                                                                    <Upload
                                                                        showUploadList={false}
                                                                        beforeUpload={beforeUpload}
                                                                        onChange={(e) => handleChange(e, 'RestaurantLogo')}
                                                                        style={{ width: "100%" }}
                                                                    // onPreview={(e) => onPreview(e)}
                                                                    >
                                                                        <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Restaurant Logo</Button>
                                                                    </Upload>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <div>
                                                                Restaurant Picture
                                                </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Upload
                                                                listType="picture-card"
                                                                fileList={restaurantfileList}
                                                                onPreview={(e) => handlePreview(e)}
                                                                onChange={(e) => handleChangeUploadRestaurant(e)}
                                                                className="upload-restaurant-list"
                                                            >
                                                                {restaurantfileList.length > 3 ? null : uploadButton}
                                                            </Upload>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <AntdModal
                                                    previewVisible={previewVisible}
                                                    previewTitle={previewTitle}
                                                    footer={null}
                                                    onCancel={handleCancel}
                                                    previewImage={previewImage}
                                                />


                                            </Col>
                                            <Col sm={6}>
                                                <Form>
                                                    <Form.Group controlId="restaurantName">
                                                        <Form.Label>Restaurant Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Restaurant Name" />
                                                    </Form.Group>
                                                    <Form.Group controlId="location">
                                                        <Form.Label>Location</Form.Label>
                                                        <Form.Control type="text" placeholder="Location" />
                                                    </Form.Group>
                                                    <Form.Group controlId="openingTime">
                                                        <Form.Label>Opening Time</Form.Label>
                                                        <Form.Control type="text" placeholder="Opening Time" />
                                                    </Form.Group>
                                                    <Form.Group controlId="priceRange">
                                                        <Form.Label>Price Range</Form.Label>
                                                        <br />
                                                        <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePrice} />
                                                        <div className={utilStyles.fontContent}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                                    </Form.Group>

                                                    <div style={{ textAlign: "right" }}>
                                                        <Button type="primary" >
                                                            Save
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : null
                            }
                            {
                                menuSelected == 'email' ? (
                                    <div className={styles.tab}>
                                        <div style={{ textAlign: "right", marginBottom: "15px" }}>
                                            <Checkbox.Group options={options} onChange={(checkedValues) => onChangeCheckbox(checkedValues)} />
                                        </div>
                                        <Form>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    From
                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    To
                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    CC
                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    Subject
                            </Form.Label>
                                                <Col sm="10">
                                                    <Form.Control defaultValue="" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label column sm="2">
                                                    Message
                            </Form.Label>
                                                <Col sm="10">
                                                    {/* <ReactRichEditor
                                    onCodeChange={e => console.log(e)}
                                    height={200}
                                /> */}
                                                    <SunEditor
                                                        onChange={(content) => console.log(content)}
                                                        onImageUpload={(targetImgElement, index, state, imageInfo, remainingFilesCount) => handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount)}
                                                        // onImageUploadBefore={(files, info, uploadHandler) => handleImageUploadBefore(files, info, uploadHandler)}
                                                        onImageUploadError={(errorMessage, result) => handleImageUploadError(errorMessage, result)}
                                                        setOptions={{
                                                            height: 200,
                                                            buttonList: [[
                                                                'align',
                                                                'font',
                                                                'fontColor',
                                                                'fontSize',
                                                                'formatBlock',
                                                                'hiliteColor',
                                                                'horizontalRule',
                                                                'lineHeight',
                                                                'list',
                                                                'paragraphStyle',
                                                                'table',
                                                                'template',
                                                                'textStyle',
                                                                /** Dialog */
                                                                'image',
                                                                'link']]// Or Array of button list, eg. [['font', 'align'], ['image']]
                                                        }}
                                                    />
                                                </Col>
                                            </Form.Group>


                                            <div style={{ textAlign: "right", paddingBottom: "15px" }}>
                                                <Button type="primary" >
                                                    Send Email
                                            </Button>
                                            </div>
                                        </Form>
                                    </div>
                                ) : null
                            }
                            {
                                menuSelected == 'directMessage' ? (
                                    <DirectMessageAdmin />
                                ) : null
                            }
                            {
                                menuSelected == 'approvePromotion' ? (
                                    <Table columns={columnsApprovePromotion} dataSource={dataApprovePromotionTable} style={{ overflow: "auto" }} />
                                ) : null
                            }                            {
                                menuSelected == 'accountManagement' ? (
                                    <Table columns={columnsAccount} dataSource={dataAccount} style={{ overflow: "auto" }} />
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
            <AddCategoryModal
                show={categoryModalShow}
                onHide={() => setCategoryModalShow(false)}
                addCategory={(data) => (handleAdd(data), console.log(data))}
            />
            <AddMenuModal
                show={menuModalShow}
                onHide={() => setMenuModalShow(false)}
                title={selectCategory}
            />
            <AddTableModal
                show={addTableModalShow}
                onHide={() => setAddTableModalShow(false)}
                title={initialTable}
            />
            <ViewOrderModal
                show={viewOrderModalShow}
                onHide={() => setViewOrderModalShow(false)}
                tableNumber={tableSelected}
            />
            <EditProfile
                show={edifProfileModalShow}
                onHide={() => setEdifProfileModalShow(false)}
                profile={profileEdited}
            />
        </Layout >
    )
}

//Modal : Add Category
function AddCategoryModal(props) {

    const [categoryName, setCategoryName] = React.useState();

    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.addCategory(categoryName)
        props.onHide()
    }

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="categoryName">
                            <Form.Control
                                type="text"
                                placeholder="Enter Category Name"
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { saveMenu() }} type="primary">
                    Submit
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}

//Modal : Add Menu
function AddMenuModal(props) {

    const [categoryName, setCategoryName] = React.useState();
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState("data:image/png;base64,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");

    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.onHide()
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Category : {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={6}>
                            <Row>
                                <Col>
                                    <img src={restaurantLogoUrl} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <Upload
                                        showUploadList={false}
                                        // beforeUpload={beforeUpload}
                                        // onChange={(e) => handleChange(e, 'RestaurantLogo')}
                                        style={{ width: "100%" }}
                                    // onPreview={(e) => onPreview(e)}
                                    >
                                        <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Menu Image</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId="restaurantName">
                                    <Form.Label>Menu Name</Form.Label>
                                    <Form.Control type="text" placeholder="Menu Name" />
                                </Form.Group>
                                <Form.Group controlId="location">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Description" />
                                </Form.Group>
                                <Form.Group controlId="priceRange">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price" />
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { saveMenu() }}>
                    Add
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}

//Modal : Add table
function AddTableModal(props) {

    const [categoryName, setCategoryName] = React.useState();
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState("data:image/png;base64,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");
    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.onHide()
    }
    const [tableSize, setTableSize] = React.useState('เล็ก');
    const [tableType, setTableType] = React.useState('square');
    const tableImages = {
        'เล็ก': {
            'square': 'images/table-square-S.png',
            'triangle': 'images/table-triangle-S.png',
            'rectangle': 'images/table-rectangle-S.png',
        },
        'กลาง': {
            'square': 'images/table-square-M.png',
            'triangle': 'images/table-triangle-M.png',
            'rectangle': 'images/table-rectangle-M.png',
        },
        'ใหญ่': {
            'square': 'images/table-square-L.png',
            'triangle': 'images/table-triangle-L.png',
            'rectangle': 'images/table-rectangle-L.png',
        }
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    โต๊ะ {props.title + 1}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Image src={tableImages[tableSize][tableType]} style={{ objectFit: "contain" }} />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Form>
                                <Form.Group controlId="areaName">
                                    <Form.Control type="text" placeholder="ชื่อโต๊ะ" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div onClick={() => setTableSize('เล็ก')} className={tableSize == 'เล็ก' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize} >
                                เล็ก
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('กลาง')} className={tableSize == 'กลาง' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                กลาง
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableSize('ใหญ่')} className={tableSize == 'ใหญ่' ? styles.selected + ' ' + styles.btnTableSize : styles.notSelected + ' ' + styles.btnTableSize}>
                                ใหญ่
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <div onClick={() => setTableType('square')} className={tableType == 'square' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/square.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableType('triangle')} className={tableType == 'triangle' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/triangle.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                        <Col>
                            <div onClick={() => setTableType('rectangle')} className={tableType == 'rectangle' ? styles.selected + ' ' + styles.btnTableType : styles.notSelected + ' ' + styles.btnTableType}>
                                <Image src="/images/rectangle.png" style={{ height: "50px", objectFit: "contain" }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { saveMenu() }}>
                    Add
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}

//Modal : View order each table
function ViewOrderModal(props) {

    const [categoryName, setCategoryName] = React.useState();
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState("data:image/png;base64,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");
    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.onHide()
    }
    const [tableSize, setTableSize] = React.useState('เล็ก');
    const [tableType, setTableType] = React.useState('square');
    const [tableNumber, setTableNumber] = React.useState(props.tableNumber)
    const tableImages = {
        'เล็ก': {
            'square': 'images/table-square-S.png',
            'triangle': 'images/table-triangle-S.png',
            'rectangle': 'images/table-rectangle-S.png',
        },
        'กลาง': {
            'square': 'images/table-square-M.png',
            'triangle': 'images/table-triangle-M.png',
            'rectangle': 'images/table-rectangle-M.png',
        },
        'ใหญ่': {
            'square': 'images/table-square-L.png',
            'triangle': 'images/table-triangle-L.png',
            'rectangle': 'images/table-rectangle-L.png',
        }
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    All bills
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{ height: "80vh" }}>
                    <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                        {/* Table list */}
                        <Row className={tableNumber == 1 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(1)}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T1
                                            </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>1,059 THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                14:14:59 - 20/03/2021
                                                </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className={tableNumber == 2 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(2)}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T2
                                            </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>860 THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                14:14:59 - 20/03/2021
                                                </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className={tableNumber == 3 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T3
                                            </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>1530 THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.fontContentSM}>
                                                14:14:59 - 20/03/2021
                                                </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <Row style={{ paddingBottom: "10px" }}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col xs={2}>
                                            <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                        </Col>
                                        <Col xs={10}>
                                            <div>
                                                <b>ผัดไทย</b>
                                            </div>
                                            <div>
                                                <b>x 1</b>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                Price : 80 THB
                                                </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: "10px" }}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col xs={2}>
                                            <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                        </Col>
                                        <Col xs={10}>
                                            <div>
                                                <b>ยำปลาหมึก</b>
                                            </div>
                                            <div>
                                                <b>x 2</b>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                Price : 160 THB
                                                </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}

//Modal : View order each table
function EditProfile(props) {
    const isBreakpoint = useMediaQuery(768)

    const [profileImage, setProfileImage] = React.useState("data:image/png;base64,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");
    const [gender, setGender] = React.useState('ชาย');

    return (

        <Modal
            centered
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col>
                                <img src={profileImage} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => handleChange(e, 'RestaurantLogo')}
                                    style={{ width: "100%" }}
                                // onPreview={(e) => onPreview(e)}
                                >
                                    <Button icon={<UploadOutlined />} className={utilStyles.cardText} style={{ width: "100%", backgroundColor: "#cfcfcf", color: "black", border: "none" }}>Click to Upload Profile Image</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={6}>
                        <Form>
                            <Form.Group controlId="restaurantName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Gender">
                                <Form.Label>Gander</Form.Label>
                                <div>
                                    <Radio.Group onChange={(e) => onChangeGender(e)} value={gender}>
                                        <Radio value="ชาย">ชาย</Radio>
                                        <Radio value="หญิง">หญิง</Radio>
                                    </Radio.Group>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            {
                                !isBreakpoint ? (
                                    //PC Version
                                    <div style={{ textAlign: "right" }}>
                                        <Button type="primary" >
                                            Save
                                    </Button>
                                    </div>
                                ) : (
                                    //Mobile Version
                                    <div style={{ textAlign: "left" }}>
                                        <Button type="primary" >
                                            Save
                                    </Button>
                                    </div>
                                )
                            }
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}
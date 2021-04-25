import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Form, Image, Button, Tab, Tabs, Modal, Container, Nav } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Upload, message, Table, Space, Switch, Select, Slider, Card, TimePicker } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import AntdModal from "../../components/AntdModal"
import useMediaQuery from "../../utils/utils";
import termAgreement from '../../utils/termAgreement.json'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

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

export default function Partner() {
    const isMobileResolution = useMediaQuery(768)

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

    useEffect(() => {
        if (!isMobileResolution) {
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
                    <Button style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => (setSelectCategory(record.category), setMenuModalShow(true))}>Add Menu</Button>
                    <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Edit</Button>
                    <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
                </Space>
            ),
        },
    ]);


    const handleAddCategory = (categoryName) => {
        const existingCategory = category;
        const newCategory = {
            key: (category.length + 1),
            category: categoryName
        };
        console.log([...existingCategory, newCategory])
        setCategory([...existingCategory, newCategory])
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
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Edit</Button>
                        <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
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
    function onChangePeriod(value) {
        console.log(`selected ${value}`);
    }

    function onSearchPeriod(val) {
        console.log('search:', val);
    }

    return (
        <Layout containerType="center">
            <Container className={!isMobileResolution ? styles.container : utilStyles.container_sm + " " + utilStyles.background_white}>

                {
                    !isMobileResolution ? (
                        //PC Version

                        <Tab.Container id="left-tabs-management-admin" defaultActiveKey="restaurantManagement">
                            <Row>
                                <Col sm={2}>
                                    <Nav variant="pills" className="flex-column" style={{ fontSize: "16px" }}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="restaurantManagement">Restaurant Management</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
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
                                            <Nav.Link eventKey="setting">Setting</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="restaurantManagement">
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="dashboard">

                                            <div className={styles.tab}>
                                                <Row style={{ height: "80vh" }}>
                                                    <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                                                        {/* Table list */}
                                                        <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                            Period : &nbsp;
                                                    <Select
                                                                showSearch
                                                                style={{ width: '70%' }}
                                                                placeholder="Select period"
                                                                optionFilterProp="children"
                                                                onChange={() => onChangePeriod}
                                                                onSearch={() => onSearchPeriod}
                                                                filterOption={(input, option) =>
                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                }
                                                            >
                                                                <Option value="5 Jan 2021">5 Jan 2021</Option>
                                                                <Option value="4 Jan 2021">4 Jan 2021</Option>
                                                                <Option value="3 Jan 2021">3 Jan 2021</Option>
                                                                <Option value="2 Jan 2021">2 Jan 2021</Option>
                                                                <Option value="1 Jan 2021">1 Jan 2021</Option>
                                                            </Select>
                                                        </div>

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
                                                                        <Col xs={4} style={{ fontSize: "14px" }}>
                                                                            <b>Completed</b>
                                                                        </Col>
                                                                        <Col xs={8}>
                                                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                                        <Col xs={4} style={{ fontSize: "14px" }}>
                                                                            <b>Completed</b>
                                                                        </Col >
                                                                        <Col xs={8}>
                                                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                &nbsp;&nbsp; T1
                                            </Col>
                                                                        <Col>
                                                                            <div style={{ textAlign: "right" }}>
                                                                                <b>1530 THB</b>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col xs={4} style={{ fontSize: "14px" }}>
                                                                            <b>Completed</b>
                                                                        </Col >
                                                                        <Col xs={8} >
                                                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                        <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                                                            Total is : 240 บาท
                                                        </div>


                                                    </Col>

                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="promote">
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
                                                            <Form.Group controlId="promoted.contents">
                                                                <Form.Label >Promoted contents</Form.Label>
                                                                <Form.Control as="textarea" rows={4} />
                                                            </Form.Group>
                                                            <Form.Group controlId="banner.text">
                                                                <Form.Label >Banner Text</Form.Label>
                                                                <Form.Control as="textarea" rows={2} />
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="menu">
                                            <div className={styles.tab}>
                                                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                                                    <Button className={utilStyles.fontContent} onClick={() => setCategoryModalShow(true)}>Add Category</Button>
                                                </div>
                                                <Table columns={columnsTable} dataSource={category} expandable={{ expandedRowRender }} />
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="profile">
                                            <div className={styles.tab}>
                                                <Row>
                                                    {/* Left section */}
                                                    <Col sm={6}>
                                                        {/* Upload restaurants logo */}
                                                        <div style={{ borderBottom: "1px solid #DEDEDE", marginBottom: "10px", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col>
                                                                    <div>
                                                                        <b>Restaurant Logo</b>
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
                                                                        <b>Restaurant Banner Picture</b>
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
                                                        <div style={{ marginTop: "20px", paddingLeft: "18px", paddingBottom: "10px" }}>
                                                            <Row style={{ marginBottom: "15px" }}>
                                                                <Col>
                                                                    <QueryBuilderIcon /> &nbsp; <b>OPENING HOURS</b>
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Monday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Tuesday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Wednesday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Thursday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Friday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Saturday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: "10px" }}>
                                                                <Col xs={3}>
                                                                    Sunday
                                                                </Col>
                                                                <Col xs={9}>
                                                                    <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
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
                                                    {/* Right section */}
                                                    <Col sm={6}>
                                                        <Row style={{ marginBottom: "10px" }}>
                                                            <Col>
                                                                <div>
                                                                    <b>Restaurant Details</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Form>
                                                            <Form.Group controlId="restaurantName">
                                                                <Form.Label>Restaurant Name</Form.Label>
                                                                <Form.Control type="text" placeholder="Enter Restaurant Name" />
                                                            </Form.Group>
                                                            <Form.Group controlId="location">
                                                                <Form.Label>Location</Form.Label>
                                                                <Form.Control type="text" placeholder="Location" />
                                                            </Form.Group>
                                                            <Form.Group controlId="phoneNumber">
                                                                <Form.Label>Phone Number</Form.Label>
                                                                <Form.Control type="text" placeholder="Phone Number" />
                                                            </Form.Group>
                                                            <Form.Group controlId="webSiteUrl">
                                                                <Form.Label>Website URL</Form.Label>
                                                                <Form.Control type="text" placeholder="Phone Number" />
                                                            </Form.Group>
                                                            <Form.Group controlId="facebookURL">
                                                                <Form.Label>Facebook URL</Form.Label>
                                                                <Form.Control type="text" placeholder="Phone Number" />
                                                            </Form.Group>
                                                            <Form.Group controlId="twitter">
                                                                <Form.Label>Twitter URL</Form.Label>
                                                                <Form.Control type="text" placeholder="Phone Number" />
                                                            </Form.Group>
                                                            <Form.Group controlId="priceRange">
                                                                <Form.Label>Price Range (Generated by system)</Form.Label>
                                                                <br />
                                                                {/* Price range is generated by system */}
                                                                <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} disabled={true} />
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="setting">
                                            <Card title="Term Agreements" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
                                                {termAgreement.text}
                                            </Card>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>

                    ) : (
                        //Mobile Version
                        <>
                            <div style={{ padding: "15px" }}>
                                <Select defaultValue="restaurantManagement" value={menuSelected} style={{ width: '100%' }} onChange={(value) => handleChangeMenu(value)}>
                                    <Option value="restaurantManagement">Restaurant Management</Option>
                                    <Option value="dashboard">Dashboard</Option>
                                    <Option value="promote">Promote</Option>
                                    <Option value="menu">Menu</Option>
                                    <Option value="profile">Profile</Option>
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
                                                                <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                                <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                                <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                                                        <div className={utilStyles.font_size_sm} style={{ textAlign: "center" }}>
                                                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                                                        <div className={utilStyles.font_size_sm} style={{ textAlign: "center" }}>
                                                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                                                        <div className={utilStyles.font_size_sm} style={{ textAlign: "center" }}>
                                                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                                                        <div className={utilStyles.font_size_sm} style={{ textAlign: "center" }}>
                                                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                                                        <div className={utilStyles.font_size_sm} style={{ textAlign: "center" }}>
                                                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                menuSelected == 'dashboard' ? (
                                    <div className={styles.tab}>
                                        <Row style={{ minHeight: "80vh" }}>
                                            <Col xs={12} style={{ borderRight: "1px solid #DEDEDE", maxHeight: "53vh", overflow: "auto" }}>
                                                {/* Table list */}
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                                                    Period : &nbsp;
                                                    <Select
                                                        showSearch
                                                        style={{ width: '70%' }}
                                                        placeholder="Select period"
                                                        optionFilterProp="children"
                                                        onChange={() => onChangePeriod}
                                                        onSearch={() => onSearchPeriod}
                                                        filterOption={(input, option) =>
                                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Option value="5 Jan 2021">5 Jan 2021</Option>
                                                        <Option value="4 Jan 2021">4 Jan 2021</Option>
                                                        <Option value="3 Jan 2021">3 Jan 2021</Option>
                                                        <Option value="2 Jan 2021">2 Jan 2021</Option>
                                                        <Option value="1 Jan 2021">1 Jan 2021</Option>
                                                    </Select>
                                                </div>

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
                                                                <Col xs={4} style={{ fontSize: "14px" }}>
                                                                    <b>Completed</b>
                                                                </Col>
                                                                <Col xs={8}>
                                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                                <Col xs={4} style={{ fontSize: "14px" }}>
                                                                    <b>Completed</b>
                                                                </Col >
                                                                <Col xs={8}>
                                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                &nbsp;&nbsp; T1
                                            </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        <b>1530 THB</b>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={4} style={{ fontSize: "14px" }}>
                                                                    <b>Completed</b>
                                                                </Col >
                                                                <Col xs={8} >
                                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                                        14:14:59 - 20/03/2021
                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className={tableNumber == 4 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                                    <Col>
                                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                            <Row >
                                                                <Col>
                                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T1
                                            </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        <b>1530 THB</b>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={4} style={{ fontSize: "14px" }}>
                                                                    <b>Completed</b>
                                                                </Col >
                                                                <Col xs={8} >
                                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                                        14:14:59 - 20/03/2021
                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className={tableNumber == 5 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                                    <Col>
                                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                            <Row >
                                                                <Col>
                                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                &nbsp;&nbsp; T1
                                            </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        <b>1530 THB</b>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={4} style={{ fontSize: "14px" }}>
                                                                    <b>Completed</b>
                                                                </Col >
                                                                <Col xs={8} >
                                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                                        14:14:59 - 20/03/2021
                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12}>
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                                                    Order Details
                                                </div>
                                                <Row style={{ paddingBottom: "10px" }}>
                                                    <Col>
                                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                                            <Row >
                                                                <Col xs={4}>
                                                                    <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                                                </Col>
                                                                <Col xs={8}>
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
                                                                <Col xs={4}>
                                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                                </Col>
                                                                <Col xs={8}>
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
                                    </div>
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
                                                        <Button variant="primary" type="submit">
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
                                        <Table columns={columnsTable} dataSource={category} expandable={{ expandedRowRender }} />
                                    </div>
                                ) : null
                            }
                            {
                                menuSelected == 'profile' ? (
                                    <div className={styles.tab}>
                                        <Row>
                                            <Col xd={12}>
                                                {/* Upload restaurants logo */}
                                                <div style={{ borderBottom: "1px solid #DEDEDE", marginBottom: "10px", paddingBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "10px", paddingLeft: "18px" }}>
                                                        <Col>
                                                            <div>
                                                                <b>Restaurant Logo</b>
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
                                                                <b>Restaurant Banner Picture</b>
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
                                                <div style={{ marginTop: "20px", paddingLeft: "18px", paddingBottom: "10px", borderBottom: "1px solid #DEDEDE", marginBottom: "10px" }}>
                                                    <Row style={{ marginBottom: "15px" }}>
                                                        <Col>
                                                            <QueryBuilderIcon /> &nbsp; <b>OPENING HOURS</b>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Monday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Tuesday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Wednesday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Thursday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Friday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Saturday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "5px" }}>
                                                        <Col>
                                                            Sunday
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <TimePicker onChange={(e) => console.log(e)} /> - <TimePicker onChange={(e) => console.log(e)} />
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

                                                <div style={{ padding: "0 18px" }}>
                                                    <Row style={{ marginBottom: "10px" }}>
                                                        <Col>
                                                            <div>
                                                                <b>Restaurant Details</b>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Form>
                                                        <Form.Group controlId="restaurantName">
                                                            <Form.Label>Restaurant Name</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="location">
                                                            <Form.Label>Location</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="phoneNumber">
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="webSiteUrl">
                                                            <Form.Label>Website URL</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="facebookURL">
                                                            <Form.Label>Facebook URL</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="twitter">
                                                            <Form.Label>Twitter URL</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                        <Form.Group controlId="priceRange">
                                                            <Form.Label>Price Range (Generated by system)</Form.Label>
                                                            <br />
                                                            <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} disabled={true} />
                                                            <div className={utilStyles.fontContent}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                                        </Form.Group>

                                                        <div style={{ textAlign: "right" }}>
                                                            <Button variant="primary" >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
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

            </Container>
            <AddCategoryModal
                show={categoryModalShow}
                onHide={() => setCategoryModalShow(false)}
                addcategory={(data) => (handleAddCategory(data))}
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
        </Layout>


    )
}

//Modal : Add Category
function AddCategoryModal(props) {

    const [categoryName, setCategoryName] = React.useState();

    const saveMenu = () => {
        console.log('categoryName ->', categoryName)
        setCategoryName("")
        props.addcategory(categoryName)
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
                <Button onClick={() => { saveMenu() }}>
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
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==");
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
                                <Image src={tableImages[tableSize][tableType]} className={utilStyles.image_size_160x160} style={{ objectFit: "contain" }} />
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

    const [tableNumber, setTableNumber] = React.useState(props.tableNumber)

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    All tables
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs">
                    <Tab eventKey="newOrder" title="New order">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="inOrder" title="In Order">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
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
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="completed" title="Completed">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
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
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <b>Completed</b>
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
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <b>Completed</b>
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
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Modal.Body >
        </Modal >
    );
}
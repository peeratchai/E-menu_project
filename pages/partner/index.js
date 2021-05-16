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
import Promote from '../../components/Partner/Promote'
import Menu from '../../components/Partner/Menu'
import Profile from '../../components/Partner/Profile'
import RestaurantManagement from '../../components/Partner/ReataurantMangement'
import ZoneManagement from '../../components/Partner/ZoneManagement'
const { Option } = Select;

export default function Partner() {
    const isMobileResolution = useMediaQuery(768)
    const notDisplay = null
    const defaultImage = "data:image/png;base64,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"
    const [restaurantLogoUrl, setRestaurantLogoUrl] = React.useState(defaultImage);
    const [category, setCategory] = React.useState([]);
    const [addTableModalShow, setAddTableModalShow] = React.useState(false);
    const refTableManagement = React.createRef()
    const [table, setTable] = React.useState();
    const [containerWidth, setContainerWidth] = React.useState();
    const [tableSelected, setTableSelected] = React.useState();
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [restaurantfileList, setRestaurantfileList] = React.useState([]);
    const [tableNumber, setTableNumber] = React.useState('1');
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [currentTab, setCurrentTab] = React.useState();

    useEffect(() => {

        if (typeof window !== 'undefined') {
            let profile = window.localStorage.getItem('profile');
            if (profile !== undefined) {
                console.log('profile', JSON.parse(profile))
                profile = JSON.parse(profile)
                let restaurantId = profile.restaurant_employee.restaurant.id
                setRestaurantId(restaurantId)
            }
        }

    }, [])

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

    const onChangeTab = (key) => {
        setCurrentTab(key)
    }

    return (
        <Layout containerType="center">
            <Container className={!isMobileResolution ? styles.container : utilStyles.container_sm + " " + utilStyles.background_white}>

                {
                    !isMobileResolution ? (
                        //PC Version
                        <Tab.Container id="left-tabs-management-admin" defaultActiveKey="restaurantManagement" onSelect={onChangeTab}>
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
                                            <Nav.Link eventKey="zone">Zone Management</Nav.Link>
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
                                            <RestaurantManagement
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                            />
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
                                            <Promote
                                                restaurant_id={restaurantId}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="menu">
                                            <Menu
                                                restaurant_id={restaurantId}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="zone">
                                            <ZoneManagement
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="profile">
                                            <Profile
                                                restaurant_id={restaurantId}
                                            />
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
                                    <Promote
                                        restaurant_id={restaurantId}
                                    />
                                ) : notDisplay
                            }
                            {
                                menuSelected == 'menu' ? (
                                    <Menu
                                        restaurant_id={restaurantId}
                                    />
                                ) : null
                            }
                            {
                                menuSelected == 'profile' ? (
                                    <Profile
                                        restaurant_id={restaurantId}
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

            </Container>

        </Layout>


    )
}

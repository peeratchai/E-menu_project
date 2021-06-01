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
import RestaurantManagement from '../../components/Partner/RestaurantManagement'
import ZoneManagement from '../../components/Partner/ZoneManagement'
import Dashboard from '../../components/Partner/Dashboard'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
const axios = require('axios')
const { Option } = Select;



const Partner = ({ user }) => {

    const isMobileResolution = useMediaQuery(768)
    const notDisplay = null
    const [tableNumber, setTableNumber] = React.useState('1');
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [restaurantName, setRestaurantName] = React.useState();
    const [currentTab, setCurrentTab] = React.useState('restaurantManagement');

    useEffect(() => {
        console.log('user', user)
        if (user) {
            let profile = user.profile
            let restaurantId = profile.restaurant_employee.restaurant.id
            let restaurantName = profile.restaurant_employee.restaurant.name
            setRestaurantId(restaurantId)
            setRestaurantName(restaurantName)
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
                        <Tab.Container id="left-tabs-management-partner" defaultActiveKey="restaurantManagement" onSelect={onChangeTab}>
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
                                                restaurant_name={restaurantName}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="dashboard">
                                            <Dashboard
                                                restaurant_id={restaurantId}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="promote">
                                            <Promote
                                                restaurant_id={restaurantId}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="menu">
                                            <Menu
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
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
                                                current_tab={currentTab}
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
                                    <RestaurantManagement
                                        restaurant_id={restaurantId}
                                        current_tab={currentTab}
                                        restaurant_name={restaurantName}
                                    />
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
                                    <Card title="Term Agreements V.20.5.9.15" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
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


export default Partner

Partner.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
        login: PropTypes.string,
        avatarUrl: PropTypes.string,
    }),
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get('user')
    const roles = ['employee', 'partner', 'admin']
    let havePermission = false

    if (user) {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get('http://localhost:8080/profile', config)
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
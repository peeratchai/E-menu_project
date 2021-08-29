import Layout from '../../components/Layout'
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
import PromoteList from '../../components/Partner/PromoteList'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
const axios = require('axios')
const { Option } = Select;



const Partner = ({ user }) => {

    const isMobileResolution = useMediaQuery(768)
    const notDisplay = null
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [restaurantName, setRestaurantName] = React.useState();
    const [currentTab, setCurrentTab] = React.useState('restaurantManagement');
    const [roles, setRoles] = React.useState([]);

    useEffect(() => {
        if (user) {
            let profile = user.profile
            let restaurantId = profile.restaurant_employee.restaurant.id
            let restaurantName = profile.restaurant_employee.restaurant.name
            let roles = profile.roles
            setRoles(roles)
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
                                        {
                                            roles.find((role) => role === 'partner') ? (
                                                <>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="promote">Promote</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="promoteList">Promote List</Nav.Link>
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
                                                </>
                                            ) : notDisplay
                                        }

                                    </Nav>
                                </Col>
                                <Col sm={10}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="restaurantManagement">
                                            <RestaurantManagement
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                                restaurant_name={restaurantName}
                                                type="partner"
                                                current_user_roles={roles}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="dashboard">
                                            <Dashboard
                                                restaurant_id={restaurantId}
                                                type="partner"
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="promote">
                                            <Promote
                                                restaurant_id={restaurantId}
                                                type="partner"
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="promoteList">
                                            <PromoteList
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="menu">
                                            <Menu
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                                type="partner"
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="zone">
                                            <ZoneManagement
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                                type="partner"
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="profile">
                                            <Profile
                                                restaurant_id={restaurantId}
                                                current_tab={currentTab}
                                                user_profile={user}
                                                type="partner"
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
                                    {
                                        roles.find((role) => role === 'partner') ? (
                                            <>
                                                <Option value="dashboard">Dashboard</Option>
                                                <Option value="promote">Promote</Option>
                                                <Option value="promoteList">Promote List</Option>
                                                <Option value="menu">Menu</Option>
                                                <Option value="zone">Zone</Option>
                                                <Option value="profile">Profile</Option>
                                                <Option value="setting">Setting</Option>
                                            </>
                                        ) : notDisplay
                                    }

                                </Select>
                            </div>

                            {
                                menuSelected == 'restaurantManagement' && (
                                    <RestaurantManagement
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                        restaurant_name={restaurantName}
                                    />
                                )
                            }
                            {
                                menuSelected == 'dashboard' && (
                                    <Dashboard
                                        restaurant_id={restaurantId}
                                    />
                                )
                            }
                            {
                                menuSelected == 'promote' && (
                                    <Promote
                                        restaurant_id={restaurantId}
                                    />
                                )
                            }
                            {
                                menuSelected == 'promoteList' && (
                                    <PromoteList
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                    />
                                )
                            }
                            {
                                menuSelected == 'menu' && (
                                    <Menu
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                    />
                                )
                            }
                            {
                                menuSelected == 'profile' && (
                                    <Profile
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                        user_profile={user}
                                    />
                                )
                            }
                            {
                                menuSelected == 'zone' && (
                                    <ZoneManagement
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                    />
                                )
                            }
                            {
                                menuSelected == 'setting' && (
                                    <Card title="Term Agreements V.20.5.9.15" style={{ marginTop: "15px", maxHeight: "60vh", overflow: "auto" }}>
                                        {termAgreement.text}
                                    </Card>
                                )
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
    const roles = ['employee', 'partner']
    let havePermission = false

    if (user) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get(`${process.env.API_URL}/profile`, config)
        let profile = reponse.data

        if (profile) {
            profile.roles.forEach((userRole) => {
                roles.forEach((role) => {
                    if (userRole === role) {
                        havePermission = true
                    }
                })
            })

            console.log('havePermission', havePermission)

            if (havePermission && profile.restaurant_employee !== null) {
                user.profile = profile
            } else {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
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
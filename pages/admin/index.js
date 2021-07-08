import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Tab, Container, Nav } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { message, Select, Card, Spin } from 'antd';
import React, { useEffect } from 'react'
import useMediaQuery from "../../utils/utils";
import DirectMessageAdmin from '../../components/DirectMessageAdmin'
import termAgreement from '../../utils/termAgreement.json'
import AccountManagement from '../../components/Admin/AccountManagement'
import RestaurantManagement from '../../components/Partner/RestaurantManagement'
import Dashboard from '../../components/Partner/Dashboard'
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
import ZoneManagement from '../../components/Partner/ZoneManagement'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
const axios = require('axios')

const { Option } = Select;

const Admin = ({ user }) => {
    const isMobileResolution = useMediaQuery(768)
    const [currentTab, setCurrentTab] = React.useState('restaurantManagement');
    const [restaurantId, setRestaurantId] = React.useState();
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [loadingRestaurantList, setLoadingRestaurantList] = React.useState(false);
    const [menuSelected, setMenuSelected] = React.useState('restaurantManagement');
    const restaurantfeature = ["restaurantManagement", "dashboard", "promote", "menu", "profile", "zone"]
    const [userProfile, setUserProfile] = React.useState()
    const [currentUserRoles, setCurrentUserRoles] = React.useState([]);

    useEffect(() => {
        getRestaurantList()
        if (user && user.profile) {
            setUserProfile(user.profile)
            let roles = user.profile.roles
            setCurrentUserRoles(roles)
        }
    }, [user])

    const getRestaurantList = async () => {
        setLoadingRestaurantList(true)
        let restaurantList = await restaurantService.getAllRestaurant();
        if (restaurantList) {
            console.log('restaurantList', restaurantList)
            let restaurantSelected = restaurantList.find((restaurant) => restaurant.id === restaurantId)
            if (!restaurantSelected) {
                setRestaurantId(undefined)
            }
            setLoadingRestaurantList(false)
            setRestaurantList(restaurantList)
        }
    }

    const handleChangeMenu = value => {
        setMenuSelected(value)
        console.log(value)
    }

    function onChangeRestaurant(restaurantId) {
        setRestaurantId(restaurantId)
        console.log('restaurantId', restaurantId)
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
                                                <Nav.Link eventKey="restaurantListManagement">Restaurant List</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="zone">Zone Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="email">Email</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="approvePromotion">Approve Promotion</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="businessDistrict">Business District Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="viewContactUs">View Contact Us</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="accountManagement">Account Management</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="banUser">Ban user</Nav.Link>
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
                                                        current_user_roles={currentUserRoles}
                                                    />
                                                </Spin>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="dashboard">
                                                <Spin spinning={loadingRestaurantList} tip="Loading...">
                                                    <Dashboard
                                                        restaurant_id={restaurantId}
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
                                                    get_restaurant_list={getRestaurantList}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="restaurantListManagement">
                                                <RestaurantListManagemnet
                                                    current_tab={currentTab}
                                                    get_restaurant_list={getRestaurantList}
                                                />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="zone">
                                                <ZoneManagement
                                                    restaurant_id={restaurantId}
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
                                                    current_user_profile={userProfile}
                                                    current_tab={currentTab}
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
                                                <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#78100E", padding: "15px", textAlign: "center" }}>
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
                                    <Option value="zone">Zone</Option>
                                    <Option value="email">Email</Option>
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
                                // check tab is restaurant feature?
                                restaurantfeature.indexOf(menuSelected) > -1 && (
                                    <SelectRestaurant
                                        onChangeRestaurant={onChangeRestaurant}
                                        restauran_list={restaurantList}
                                        restaurant_id={restaurantId}
                                    />
                                )
                            }
                            {
                                menuSelected == 'restaurantManagement' ? (
                                    <Spin spinning={loadingRestaurantList} tip="Loading...">
                                        <RestaurantManagement
                                            restaurant_id={restaurantId}
                                            current_tab={menuSelected}
                                            current_user_roles={currentUserRoles}
                                        />
                                    </Spin>
                                ) : null
                            }

                            {
                                menuSelected == 'promote' ? (
                                    <Spin spinning={loadingRestaurantList} tip="Loading...">
                                        <Promote
                                            restaurant_id={restaurantId}
                                        />
                                    </Spin>
                                ) : null
                            }
                            {
                                menuSelected == 'menu' ? (
                                    <>
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
                                menuSelected == 'zone' && (
                                    <ZoneManagement
                                        restaurant_id={restaurantId}
                                        current_tab={menuSelected}
                                    />
                                )
                            }
                            {
                                menuSelected == 'email' ? (
                                    <SendEmail />
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
                                        current_user_profile={userProfile}
                                        current_tab={menuSelected}
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

        if (profile) {
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
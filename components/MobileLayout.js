import styles from "./MobileLayout.module.css";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { Button, Layout, Input, Row, Col, Badge, Typography, Divider } from "antd";
import ActiveLink from "./ActiveLink";
import React, { useEffect } from "react";
import LoginModal from "./Modal/Login";
import { ShoppingCartOutlined, FilterOutlined, UserOutlined } from "@ant-design/icons";
import "react-chat-widget/lib/styles.css";
import UserProfileModal from "./Modal/UserProfileModal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import checkUserPermission from "../lib/checkUserPermission";
import fetchJson from "../lib/fetchJson";
import profileService from "../services/profile";
import NormalButton from "./Button/NormalButton"
import shoppingCartService from "../services/shoppingCart";
import orderService from "../services/order";
import HomeIcon from '@material-ui/icons/Home';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export default function MobileLayout(props) {
  const {
    children,
    containerType,
    searchFunc,
    filterFunc,
    haveMenuFooter = true,
    is_show_shopping_cart = true,
    is_show_login_modal = false,
    set_is_show_login_modal,
    is_show_filter = true,
    is_show_search = true,
    sub_header = null
  } = props;
  const { user, mutateUser } = checkUserPermission();

  const router = useRouter();

  //// Set state
  const [loginModalShow, setLoginModalShow] = React.useState(false);
  const [islogin, setIsLogin] = React.useState();
  const [containerStyle, setContainerStyle] = React.useState(null);
  const [buttonNavbar, setButtonNavbar] = React.useState();
  const [total_menu_in_basket, setTotal_menu_in_basket] = React.useState(0);
  const [haveOrderActive, setHaveOrderActive] = React.useState(false)
  const [isPartner, setIsPartner] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [userProfileModalShow, setUserProfileModalShow] = React.useState(false);
  const [isExpandedSubMenu, setIsExpandedSubMenu] = React.useState(false)
  ////

  const setStyleOfContainer = (containerType) => {
    let style = "";
    switch (containerType) {
      case "mobile":
        style = styles.containerMobile;
        break;
      case "center":
        style = styles.container;
        break;
      default:
        break;
    }

    setContainerStyle(style);
  };

  useEffect(() => {
    if (is_show_login_modal) {
      setLoginModalShow(true);
      set_is_show_login_modal();
    }
    if (user) {
      setIsLogin(user.isLoggedIn);
      checkPermission(user);
    }
    checkShoppingCart()
    setStyleOfContainer(containerType);
  }, [props, islogin, user]);

  const checkPermission = (user = null) => {
    let roles = ["employee", "partner", "admin"];
    let accessToken;
    if (user === null) {
      accessToken = null;
    } else {
      accessToken = user.accessToken;
    }

    profileService
      .getProfile(accessToken)
      .then((userProfile) => {
        let isPartner = false;
        let isAdmin = false;
        userProfile.roles.forEach((userRole) => {
          roles.forEach((role) => {
            if (userRole === role) {
              if (role === "employee" || role === "partner") {
                isPartner = true;
              }
              if (role === "admin") {
                isAdmin = true;
              }
            }
          });
        });

        setIsPartner(isPartner);
        setIsAdmin(isAdmin);
      })
      .catch((error) => {
        console.log("Layout,checkPermission,error", error);
        // message.error('Cannot get user profile.')
      });
  };

  const checkShoppingCart = async () => {

    let shoppingCartData
    let numberOfOrderInCart = 0
    let haveOrderActive = false
    if (user) {
      //// if user logged will get shopping cart data from Database
      try {
        let response_shopping_cart_datbase = await shoppingCartService.getShoppingCart()
        console.log('response_shopping_cart_datbase', response_shopping_cart_datbase)
        if (response_shopping_cart_datbase) {
          shoppingCartData = response_shopping_cart_datbase.shopping_cart_items
          if (shoppingCartData.length > 0) {
            //// have order in shopping cart
            shoppingCartData.forEach((orderData) => {
              numberOfOrderInCart++
            })
          }
        }

        try {
          let response_order_active = await orderService.getOrderActive()
          if (response_order_active) {
            haveOrderActive = true
          }
        } catch (error) {
          console.log('get order active error: ', error)
        }

        console.log('numberOfOrderInCart', numberOfOrderInCart)
        console.log('haveOrderActive', haveOrderActive)

        setTotal_menu_in_basket(numberOfOrderInCart)
        setHaveOrderActive(haveOrderActive)
      } catch (error) {
        console.log('get shopping cart error: ', error)
      }
    } else {
      //// if user not yet login it get shopping cart data from localstorage

    }

  }

  const signOut = async () => {
    mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
    window.localStorage.removeItem("accessToken");
    setIsPartner(false);
    setIsExpandedSubMenu(false)
    setIsAdmin(false);
    window.location.reload();
  };

  const expandableSubMenu = () => {
    setIsExpandedSubMenu(!isExpandedSubMenu)
  }

  const onShowUserProfileModal = () => {
    setUserProfileModalShow(true)
    setIsExpandedSubMenu(false)
  }

  const MenuHeader = (
    <div>
      <Image
        src="/images/CeeMenuLogo.png"
        style={{ margin: "auto", width: "40px", height: "40px" }}
        onClick={() => {
          router.push({
            pathname: "/newspaper",
          })
        }}
      />
      {
        is_show_filter && (
          <div style={{ display: 'inline-block', marginLeft: "10px" }}>
            <FilterOutlined style={{ fontSize: "25px" }} onClick={() => filterFunc()} />
          </div>
        )
      }
      {
        is_show_search && (
          <div style={{ display: 'inline-block', marginLeft: "10px", width: "35%" }}>
            <Search size="small" placeholder="ค้นหาอาหาร" onSearch={() => searchFunc()} style={{ verticalAlign: "middle" }} />
          </div>
        )
      }
      <div style={{ float: 'right' }}>
        {
          islogin ? (
            <UserOutlined style={{ fontSize: "20px" }} onClick={() => expandableSubMenu()} />
          ) : (
            <NormalButton button_name="Login" font_size="10px" height="24px" function_on_click={() => setLoginModalShow(true)} />
          )
        }
      </div>
    </div>
  )

  const MenuFooter = (
    <Row style={{ height: '100%', position: "relative" }}>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        <ActiveLink href="/">
          <HomeIcon className={styles.menuIcon} />
        </ActiveLink>
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        <ActiveLink href="/menuFeeding">
          <ImportContactsIcon className={styles.menuIcon} />
        </ActiveLink>
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        <LocationOnIcon className={styles.menuIcon} />
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto', fontSize: '19px' }}>
        <AttachMoneyIcon className={styles.menuIcon} />
      </Col>
    </Row>
  )

  const Submenu = (
    <>
      <div style={{ padding: '16px 24px' }} onClick={() => onShowUserProfileModal()}>
        <span>ข้อมูลโปรไฟล์</span>
      </div>
      <div style={{ padding: '16px 24px' }}>
        ประวัติการสั่งอาหาร
      </div>
      <div style={{ padding: '16px 24px' }}>
        <ActiveLink href="/checkout">
          <span>ตะกร้า</span>
        </ActiveLink>
      </div>
      <div style={{ padding: '16px 24px' }}>
        ติดต่อ
      </div>
      <div style={{ padding: '16px 24px' }}>
        ตั้งค่า
      </div>
      <div style={{ padding: '16px 24px' }} onClick={() => signOut()}>
        ออกจากระบบ
      </div>
    </>
  )


  return (
    <div style={{ paddingBottom: "5px" }}>
      <Layout>
        <Header style={{ backgroundColor: 'white', padding: '0 25px' }}>{MenuHeader}</Header>
        <Content>
          <div style={{ height: isExpandedSubMenu ? '45vh' : '0', width: '100vw', position: 'absolute', backgroundColor: "#eaeff3", borderBottom: "2px solid #DEDEDE", transition: "all .5s ease-in-out", zIndex: "1000", overflow: 'hidden' }} >{Submenu}</div>
          <div className={containerStyle} style={{ minHeight: "90vh" }}> {children}</div>
        </Content>
        {
          haveMenuFooter && (
            <Footer style={{ position: "sticky", bottom: "0", backgroundColor: "#78100e", height: "50px", padding: "0" }}>{MenuFooter}</Footer>
          )
        }
      </Layout>
      {
        is_show_shopping_cart && (haveOrderActive || total_menu_in_basket > 0) && (
          <div className={styles.button_circle}>
            <ActiveLink href="/checkout">
              <Badge count={total_menu_in_basket} size="default">
                <ShoppingCartOutlined className={styles.shopping_cart_icon} />
              </Badge>
            </ActiveLink>
          </div>
        )
      }

      <LoginModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
        setlogin={setIsLogin}
        check_permission={checkPermission}
        sub_header={sub_header}
      />
      <UserProfileModal
        show={userProfileModalShow}
        onHide={() => setUserProfileModalShow(false)}
        user={user}
      />
    </div>
  );
}

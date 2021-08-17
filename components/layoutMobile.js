import styles from "./layout.module.css";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { Button, Layout, Input, Row, Col, List, Typography, Divider } from "antd";
import ActiveLink from "./ActiveLink";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect } from "react";
import LoginModal from "./Modal/Login";
import { ShoppingCartOutlined, FilterOutlined, UserOutlined } from "@ant-design/icons";
import "react-chat-widget/lib/styles.css";
import UserProfileModal from "./Modal/UserProfileModal";
import MessengerCustomerChat from "react-messenger-customer-chat";
import checkUserPermission from "../lib/checkUserPermission";
import fetchJson from "../lib/fetchJson";
import profileService from "../services/profile";
import NormalButton from "../components/Button/NormalButton"
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export default function LayoutMobile(props) {
  const {
    children,
    containerType,
    searchFunc,
    haveMenuFooter = true,
    menuInBasket,
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
      setTotal_menu_in_basket(menuInBasket);
    }
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

  const signOut = async () => {
    mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
    window.localStorage.removeItem("accessToken");
    setIsPartner(false);
    setIsExpandedSubMenu(false)
    setIsAdmin(false);
    window.location.reload();
  };

  const navToCheckout = () => {
    router.push({
      pathname: "/checkout",
    });
  };

  const onSearch = (value) => {
    console.log('value', value)
  }

  const MenuFooter = (
    <Row style={{ height: '100%', position: "relative" }}>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        A
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        B
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        C
      </Col>
      <Col span={6} style={{ textAlign: "center", margin: 'auto' }}>
        D
      </Col>
    </Row>
  )

  const expandableSubMenu = () => {
    setIsExpandedSubMenu(!isExpandedSubMenu)
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
            <FilterOutlined style={{ fontSize: "25px" }} />
          </div>
        )
      }
      {
        is_show_search && (
          <div style={{ display: 'inline-block', marginLeft: "10px", width: "35%" }}>
            <Search size="small" placeholder="ค้นหาอาหาร" onSearch={onSearch} style={{ verticalAlign: "middle" }} />
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

  const Submenu = (
    <>
      <div style={{ padding: '16px 24px' }}>
        Update User Profile
      </div>
      <div style={{ padding: '16px 24px' }}>
        Order History
      </div>
      <div style={{ padding: '16px 24px' }}>
        Contact Us
      </div>
      <div style={{ padding: '16px 24px' }}>
        Setting
      </div>
      <div style={{ padding: '16px 24px' }} onClick={() => signOut()}>
        Log out
      </div>
    </>
  )


  return (
    <div style={{ paddingBottom: "5px" }}>
      <Layout>
        <Header style={{ backgroundColor: 'white', padding: '0 25px' }}>{MenuHeader}</Header>
        <Content>
          <div style={{ height: isExpandedSubMenu ? '50vh' : '0', width: '100vw', position: 'absolute', backgroundColor: "#eaeff3", transition: "all .5s ease-in-out", zIndex: "99999", overflow: 'hidden' }} >{Submenu}</div>
          <div className={containerStyle}>{children}</div>
        </Content>
        {
          haveMenuFooter && (
            <Footer style={{ position: "sticky", bottom: "0", backgroundColor: "#78100e", height: "50px", padding: "0" }}>{MenuFooter}</Footer>
          )
        }
      </Layout>

      <MessengerCustomerChat
        pageId={process.env.FACEBOOK_PAGE_ID}
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      />
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

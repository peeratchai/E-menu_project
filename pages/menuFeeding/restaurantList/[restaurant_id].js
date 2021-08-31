import "antd/dist/antd.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { message, Spin } from "antd";
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from "../../../components/MenuFeeding/Mobile/RestaurantDetail";
import RestaurantDetailWeb from "../../../components/MenuFeeding/Web/RestaurantDetail";
import restaurantService from "../../../services/restaurant";
import checkUserPermission from "../../../lib/checkUserPermission";
import fetchJson from "../../../lib/fetchJson";
import shoppingCartService from "../../../services/shoppingCart";
import utilStyles from "../../../styles/utils.module.css";
import Layout from "../../../components/layout";
import MobileLayout from "../../../components/MobileLayout";
import partnerSerivce from "../../../services/partner";
import orderService from "../../../services/order";

export default function Restaurant() {
  const isMobileResolution = useMediaQuery(768);
  const router = useRouter();
  const { locationId, locationName, restaurantId, tableId, tableName } =
    router.query;
  ////Set State
  const [restaurantDetail, setRestaurantDetail] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { mutateUser } = checkUserPermission();
  const [shoppingCart, setShoppingCart] = React.useState();
  const [isInitialCart, setIsInitialCart] = React.useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = React.useState(false);
  const [numberOfCartItem, setNumberOfCartItem] = React.useState(0);
  const [notificationLoginModal, setNotificationLoginModal] =
    React.useState(false);
  const [qrcodeDetails, setQrcodeDetails] = React.useState()
  const [isUserSignin, setIsUserSignin] = React.useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    React.useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (restaurantId === undefined) {
        router.push({
          pathname: "/menuFeeding",
        });
      } else {
        setLoading(true);
        setInitialData();
      }
    }
  }, [router.isReady]);

  const setInitialData = async () => {
    console.log("shoppingCart response");
    getRestaurantDetail(restaurantId)
      .then(async (restaurantDetail) => {
        shoppingCartService
          .getShoppingCart()
          .then(async (response) => {
            console.log("shoppingCart response", response);

            if (tableId && restaurantId) {
              try {
                let await_responseTableData = partnerSerivce.checkHaveTableBycustomer(tableId)
                let await_restaurantData = restaurantService.getRestaurantById(restaurantId)

                let responseTableData = await await_responseTableData
                let restaurantData = await await_restaurantData
                if (responseTableData && restaurantData) {
                  if (responseTableData.id && restaurantData.id) {

                    if (response !== "Not Login") {
                      //// If user logged in it wiil check leftover orders in system if have existing order it will check bill all
                      console.log('tableId', tableId)
                      try {
                        let response_check_bill_except = await orderService.checkBillExcept(tableId)
                        console.log('response_check_bill_except', response_check_bill_except)
                        if (response_check_bill_except.data.is_success === true) {
                          console.log('check bill success')
                          window.location.reload()
                        } else {
                          console.log('bill not found')
                        }
                      } catch (error) {
                        console.log('response_check_bill_except error', error)
                      }
                    }

                    setQrcodeDetails({
                      tableId: tableId,
                      restaurantId: restaurantId
                    })
                    message.success(
                      `You've checked in ${responseTableData.name} at ${restaurantDetail.name}. Let's start ordering!`,
                      4
                    );

                    try {
                      await saveTableOnScanQrCode();
                    } catch (error) {
                      console.log(
                        "saveTableOnScanQrCode",
                        saveTableOnScanQrCode
                      );
                    }
                  }
                } else {
                  message.warning('Qr code ไม่ถูกต้อง! กรุณาแสกนใหม่อีกครั้งค่ะ')
                }
              } catch (error) {
                console.log('error', error)
              }
            }

            if (response === "Not Login") {
              //// Not yet login 
              //// Get shopping cart from localstorage
              let shoppingCart = window.localStorage.getItem('shoppingCart')
              if (shoppingCart) {
                shoppingCart = JSON.parse(shoppingCart)
                if (shoppingCart.hasOwnProperty('shopping_cart_items')) {
                  if (shoppingCart.shopping_cart_items.length === 0) {
                    setShoppingCart(shoppingCart);
                    setNumberOfCartItem(0);
                  } else {
                    setIsInitialCart(true);
                    let numberOfCartItem = 0;
                    shoppingCart.shopping_cart_items.forEach((cartItem) => {
                      numberOfCartItem += cartItem.quantity;
                    });
                    setNumberOfCartItem(numberOfCartItem);
                    setShoppingCart(shoppingCart);
                  }
                } else {
                  setNumberOfCartItem(0);
                }
                console.log('shoppingCart', shoppingCart)
              } else {
                setNumberOfCartItem(0);
              }
            } else {
              //// Get cart from database
              setIsUserSignin(true);
              let shoppingCartDatabase = response;
              setIsInitialCart(true);

              //// Check have shopping cart in localstorage shoppingCartService.updateShoppingCart(newCartItemData).then((response) => {
              let shoppingCartLocal = window.localStorage.getItem('shoppingCart')
              let haveShoppingCartInLocal = false
              if (shoppingCartLocal) {
                shoppingCartLocal = JSON.parse(shoppingCartLocal)
                if (shoppingCartLocal.hasOwnProperty('shopping_cart_items')) {
                  if (shoppingCartLocal.shopping_cart_items.length !== 0) {
                    haveShoppingCartInLocal = true
                  }
                }
              }
              ////

              if (shoppingCartDatabase === "") {

                //// No have menu in cart of this account
                if (haveShoppingCartInLocal) {

                  //// Have menu in localstorage and update the shopping cart to database 
                  let numberOfCartItem = 0;
                  let cartItems = [];
                  let newShoppingCart

                  shoppingCartLocal.shopping_cart_items.forEach((cartItem) => {
                    numberOfCartItem += cartItem.quantity;
                    cartItems.push({
                      menu: {
                        id: cartItem.menu.id,
                        name: cartItem.menu.name,
                        image_url: cartItem.menu.image_url
                      },
                      quantity: cartItem.quantity,
                      price: cartItem.price,
                      total: cartItem.total,
                      special_instruction: cartItem.special_instruction,
                    });
                  });

                  newShoppingCart = {
                    restaurant: shoppingCartLocal.restaurant.id,
                    shopping_cart_items: cartItems,
                  };

                  try {
                    let res = await shoppingCartService.updateShoppingCart(newShoppingCart)
                    window.localStorage.removeItem('shoppingCart')
                    console.log('updateShoppingCart', res)
                  } catch (error) {
                    console.log('error', error)
                  }

                  setShoppingCart(shoppingCartLocal);
                  setNumberOfCartItem(numberOfCartItem);
                } else {

                  //// No have menu in cart of localstorage
                  setShoppingCart(shoppingCartDatabase);
                  setNumberOfCartItem(0);
                }

              } else {
                //// Has menu in cart in database
                let cartItems = [];
                let numberOfCartItem = 0;
                let newShoppingCart

                shoppingCartDatabase.shopping_cart_items.forEach((cartItem) => {
                  numberOfCartItem += cartItem.quantity;
                  cartItems.push({
                    menu: {
                      id: cartItem.menu.id,
                      name: cartItem.menu.name,
                      image_url: cartItem.menu.image_url
                    },
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                    total: cartItem.total,
                    special_instruction: cartItem.special_instruction,
                  });
                });

                newShoppingCart = {
                  restaurant: {
                    id: shoppingCartDatabase.restaurant.id
                  },
                  shopping_cart_items: cartItems,
                };

                if (haveShoppingCartInLocal) {
                  //// Have menu in localstorage and merge shopping cart between local stroage and database 

                  if (shoppingCartLocal.restaurant.id === shoppingCartDatabase.restaurant.id) {
                    //// Shopping cart between localstorage and database is the same restaurant 
                    //// Sum all menu and update shopping cart to database

                    shoppingCartLocal.shopping_cart_items.forEach((cartItem) => {
                      numberOfCartItem += cartItem.quantity;
                      cartItems.push({
                        menu: {
                          id: cartItem.menu.id,
                          name: cartItem.menu.name,
                          image_url: cartItem.menu.image_url
                        },
                        quantity: cartItem.quantity,
                        price: cartItem.price,
                        total: cartItem.total,
                        special_instruction: cartItem.special_instruction,
                      });
                    });

                    newShoppingCart = {
                      restaurant: {
                        id: shoppingCartDatabase.restaurant.id
                      },
                      shopping_cart_items: cartItems,
                    };

                    try {
                      let res = await shoppingCartService.updateShoppingCart(newShoppingCart)
                      console.log('updateShoppingCart', res)
                      window.localStorage.removeItem('shoppingCart')
                    } catch (error) {
                      console.log('error', error)
                    }
                  } else {
                    ////  Shopping cart between local storage and database has different restaurant 
                    cartItems = []
                    numberOfCartItem = 0
                    shoppingCartLocal.shopping_cart_items.forEach((cartItem) => {
                      numberOfCartItem += cartItem.quantity;
                      cartItems.push({
                        menu: {
                          id: cartItem.menu.id,
                          name: cartItem.menu.name,
                          image_url: cartItem.menu.image_url
                        },
                        quantity: cartItem.quantity,
                        price: cartItem.price,
                        total: cartItem.total,
                        special_instruction: cartItem.special_instruction,
                      });
                    });

                    newShoppingCart = {
                      restaurant: shoppingCartLocal.restaurant.id,
                      shopping_cart_items: cartItems,
                    };

                    let res_delete_shopping_cart = await shoppingCartService.deleteShoppingCart()
                    let res_update_shopping_cart = await shoppingCartService.updateShoppingCart(newShoppingCart)

                    console.log('res_delete_shopping_cart', res_delete_shopping_cart)
                    console.log('res_update_shopping_cart', res_update_shopping_cart)
                    window.localStorage.removeItem('shoppingCart')
                  }
                }

                setNumberOfCartItem(numberOfCartItem);
                setShoppingCart(newShoppingCart);
              }

            }


          })
          .catch((error) => {
            console.log("error", error);
          });
        setRestaurantDetail(restaurantDetail);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const saveTableOnScanQrCode = async () => {
    await mutateUser(
      fetchJson("/api/saveTable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableId: tableId, restaurantId: restaurantId }),
      })
    );
  };

  const getRestaurantDetail = async (restaurantId) => {
    let response = await restaurantService.getRestaurantById(restaurantId);
    return response;
  };

  const settingNumberOfCart = (numberOfCart) => {
    setNumberOfCartItem(numberOfCart);
  }

  const settingShoppintCart = (shoppingCart) => {
    console.log("setShoppingCart", shoppingCart);

    setShoppingCart(shoppingCart);
  };

  const resetShoppingCart = () => {
    setShoppingCart("");
    saveTableOnScanQrCode()
      .then((response) => {
        console.log("response", response);
        if (tableName) {
          message.success(
            `You've checked in ${tableName} at ${restaurantDetail.name}. Let's start ordering!`,
            4
          );
        } else {
          message.success(
            `You've checked at ${restaurantDetail.name}. Let's start ordering!`,
            4
          );
        }
        setNotificationModalVisible(false);
      })
      .catch((error) => {
        console.log("error", error);
        setNotificationModalVisible(false);
      });
  };

  const setDefaultShowLoginModal = () => {
    setIsShowLoginModal(false);
  };

  return (
    <>
      {!isMobileResolution ? (
        // PC Version

        <Layout
          is_show_login_modal={isShowLoginModal}
          set_is_show_login_modal={setDefaultShowLoginModal}
        >
          <RestaurantDetailWeb
            restaurant_detail={restaurantDetail}
            location_name={locationName}
            location_id={locationId}
            restaurant_id={restaurantId}
            table_id={tableId}
            loading={loading}
            qrcode_details_from_url={qrcodeDetails}
            shopping_cart={shoppingCart}
            set_shopping_cart={settingShoppintCart}
            is_initial_cart={isInitialCart}
            is_user_signin={isUserSignin}
            notification_login_modal_show={() =>
              setNotificationLoginModal(true)
            }
          />
        </Layout>
      ) : (
        // Mobile Version
        <MobileLayout
          containerType="mobile"
          filterFunc={() => console.log("none")}
          page="restaurantDetails"
          menuInBasket={numberOfCartItem}
          is_show_login_modal={isShowLoginModal}
          is_show_filter={false}
          is_show_shopping_cart={false}
          is_show_search={false}
          set_is_show_login_modal={setDefaultShowLoginModal}
          haveMenuFooter={false}
        >
          <RestaurantDetailMobile
            restaurant_detail={restaurantDetail}
            location_name={locationName}
            location_id={locationId}
            restaurant_id={restaurantId}
            table_id={tableId}
            loading={loading}
            qrcode_details_from_url={qrcodeDetails}
            shopping_cart={shoppingCart}
            set_number_of_cart={settingNumberOfCart}
            set_shopping_cart={settingShoppintCart}
            is_initial_cart={isInitialCart}
            is_user_signin={isUserSignin}
            notification_login_modal_show={() =>
              setNotificationLoginModal(true)
            }
          />
        </MobileLayout>
      )}
      <NotificationShoppingCartModal
        show={notificationModalVisible}
        onHide={() => setNotificationModalVisible(false)}
        set_shopping_cart={resetShoppingCart}
      />
      <NotificationLoginModal
        show={notificationLoginModal}
        onHide={() => setNotificationLoginModal(false)}
        show_login_modal={() => setIsShowLoginModal(true)}
      />
    </>
  );
}

function NotificationShoppingCartModal(props) {
  const [loading, setLoading] = React.useState(false);

  const onDeleteShopping = () => {
    setLoading(true);
    shoppingCartService
      .deleteShoppingCart()
      .then((response) => {
        if (response && response.is_success) {
          props.set_shopping_cart();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ padding: "1.3rem" }}
    >
      <Modal.Body>
        <Spin spinning={loading} tip="Loading...">
          <Row>
            <Col>
              <div
                style={{ textAlign: "center" }}
                className={utilStyles.fontContent}
              >
                มีรายการสินค้าค้างอยู่ในตะกร้าจากร้านอื่น
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{ textAlign: "center", color: "#85878b" }}
                className={utilStyles.font_size_sm}
              >
                ต้องการยกเลิกรายการในตะกร้าและสั่งใหม่หรือไม่
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{
                    width: "90%",
                    backgroundColor: "#c0cacc",
                    border: "1px solid #c0cacf",
                  }}
                  onClick={props.onHide}
                  className={utilStyles.fontContent}
                >
                  ยกเลิก
                </Button>
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{
                    width: "90%",
                    backgroundColor: "#78100E",
                    border: "#78100E",
                  }}
                  onClick={() => onDeleteShopping()}
                  className={utilStyles.fontContent}
                >
                  ยืนยัน
                </Button>
              </div>
            </Col>
          </Row>
        </Spin>
      </Modal.Body>
    </Modal>
  );
}

function NotificationLoginModal(props) {
  const goTologin = () => {
    props.show_login_modal();
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ padding: "1.3rem" }}
    >
      <Modal.Body>
        <Row>
          <Col>
            <div
              style={{ textAlign: "center" }}
              className={utilStyles.fontContent}
            >
              Please login before placing order.
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <div style={{ textAlign: "center" }}>
              <Button
                style={{
                  width: "50%",
                  backgroundColor: "#78100E",
                  border: "#78100E",
                }}
                onClick={() => goTologin()}
                className={utilStyles.fontContent}
              >
                Go to Login
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

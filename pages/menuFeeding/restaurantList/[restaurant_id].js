
import utilStyles from '../../../styles/utils.module.css'
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import styles from './index.module.css'
import React, { useEffect, useRef } from 'react'
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from '../../../components/MenuFeeding/Mobile/RestaurantDetail'
import RestaurantDetailWeb from '../../../components/MenuFeeding/Web/RestaurantDetail'
import restaurantService from '../../../services/restaurant'
import checkLogin from '../../../services/checkLogin'
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
// Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


export default function Restaurant({ props }) {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId } = router.query;
    const { asPath } = useRouter()

    ////Set State

    const [slidingPxCategoryNav, setslidingPxCategoryNav] = React.useState(0);

    const [widthCategoryNav, setWidthCategoryNav] = React.useState();
    const [widthCategoryList, setWidthCategoryList] = React.useState();
    const [categoryList, setCategoryList] = React.useState([{ categoryName: 'เมนูยำ', isActive: true }, { categoryName: 'เมนูข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน7', isActive: false }, { categoryName: 'เมนูแซลม่อน8', isActive: false }, { categoryName: 'เมนูแซลม่อน9', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }]);
    const [menuList, setMenuList] = React.useState(
        {
            'เมนูยำ': [
                { name: 'ยำรวมมิตร', price: 100, image: "/images/food4.jpg" },
                { name: 'ยำหมึกกระดอง', price: 150, image: "/images/food5.jpg" },
                { name: 'ยำหมึกสาย', price: 120, image: "/images/food6.jpg" }
            ],
            'เมนูข้าว': [
                { name: 'ข้าวผัดทะเลรวมมิตร', price: 80, image: "/images/food7.jpg" },
            ],
            'เมนูลูกชิ้น': [
                { name: 'Meatball', price: 60, image: "/images/food8.jpg" },

            ],
            'เมนูแซลม่อน': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน7': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน8': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน9': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ]
        }
    );

    const [restaurantDetail, setRestaurantDetail] = React.useState()
    // const [categoryList, setCategoryList] = React.useState([{ categoryName: 'ยำ', isActive: true }, { categoryName: 'ข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'foodType', isActive: false }, { categoryName: 'foodType', isActive: false }, { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodTypeFinal', isActive: false }]);
    ////

    ////Set Ref
    const refCategoryNav = React.useRef();
    const refCategoryList = React.useRef();
    const refEachCategory = React.useRef({});
    const refsCategory = useRef([]);
    ////



    const toggleClassSelectedCategory = (index) => {
        let currentCategoryList = categoryList
        currentCategoryList.filter((category) => category.isActive == true).forEach(category => category.isActive = false)
        currentCategoryList[index].isActive = !currentCategoryList[index].isActive
        console.log(currentCategoryList)
        setCategoryList(currentCategoryList)
        activeCategory()
    }

    useEffect(async () => {
        if (!router.isReady) {
            // console.log('not ready')
        } else {
            if (locationId === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                let accessToken = await checkLogin()
                let restaurantDetail = await getRestaurantDetail(accessToken, restaurantId)
                await getAddressOnGoogleMaps(restaurantDetail)
                // setRestaurantDetail(restaurantDetail)
            }
        }
    }, [router.isReady])


    const getAddressOnGoogleMaps = async (restaurantDetail) => {
        let point, substringPotion, splitPotion, latLong, lat, long
        point = 'POINT(13.724035849919018 100.57927717448996)';
        substringPotion = point.substring(5)
        splitPotion = substringPotion.split('(').join('').split(')');
        latLong = splitPotion[0].split(' ')
        lat = latLong[0]
        long = latLong[1]
        let address = await Geocode.fromLatLng(lat, long).then(
            (response) => {
                const address = response.results[0].formatted_address;
                return address
            },
            (error) => {
                console.error(error);
            }
        );
        restaurantDetail.googleMapsAddress = address
        setRestaurantDetail(restaurantDetail)
        console.log('restaurantDetail', restaurantDetail)

    }

    // const getQuery = () => {
    //     console.log(asPath)
    //     let splitPath = asPath.split('?')
    //     splitPath = splitPath[1].split('&')
    //     let SplitLocationId = splitPath[0].split('=')
    //     let locationId = SplitLocationId[1]
    //     let SplitLocationName = splitPath[1].split('=')
    //     let locationName = SplitLocationName[1]
    //     let SplitRestaurantId = splitPath[2].split('=')
    //     let restaurantId = SplitRestaurantId[1]
    //     return { locationId: locationId, locationName: locationName, restaurantId: restaurantId }
    // }

    const getRestaurantDetail = async (accessToken, restaurantId) => {
        let response = await restaurantService.getRestaurantById(accessToken, restaurantId)
        return response.data
    }

    const setClassNameCategoryNav = (category, index) => {
        if (category.isActive) {
            if (index == 0) {
                return styles.category_first_child_active
            } else {
                return styles.category_active
            }
        } else {
            if (index == 0) {
                return styles.category_first_child
            } else {
                return styles.category
            }
        }
    }

    const activeCategory = () => {

        let widthCategoryNav = refCategoryNav.current.offsetWidth
        let widthCategoryList = refCategoryList.current.offsetWidth
        // console.log('widthCategoryNav', widthCategoryNav)
        // console.log('widthCategoryList', widthCategoryList)
        if (widthCategoryList <= widthCategoryNav) {
            setStyleButtonRight(styles.nav_scroller_button_right + " " + styles.hide)
        } else {
            setStyleButtonRight(styles.nav_scroller_button_right)
        }

        let tempCategoryNav = categoryList.map((category, index) =>
        (
            <div ref={(elementRef) => refEachCategory.current[index] = elementRef} className={setClassNameCategoryNav(category, index) + " " + utilStyles.font_size_md + " " + styles.category_nav} key={category.categoryName + index} onClick={() => { toggleClassSelectedCategory(index), scrollToCategorySection(index) }}>
                {category.categoryName}
            </div>
        ))

        setWidthCategoryList(widthCategoryList)
        setWidthCategoryNav(widthCategoryNav)
        setCategoryNav(tempCategoryNav)
        setWidthOfEechCategoryButton()
    }

    const setWidthOfEechCategoryButton = () => {
        let currentCategoryList = categoryList
        currentCategoryList.map((category, index) => {
            try {
                category.width = refEachCategory.current[index].offsetWidth
                category.offsetTop = refsCategory.current[index].offsetTop
            } catch (error) {
                // console.log(refEachCategory)
            }
        })
        // console.log(currentCategoryList)

    }

    const scrollToCategorySection = (index) => {
        if (refsCategory.current[index] !== undefined) {
            refsCategory.current[index].scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollCategoryNav = (direction) => {
        let differentWidthBetweenNavAndCategoryList = (widthCategoryList - widthCategoryNav)
        let currentslidingPxCategoryNav = slidingPxCategoryNav
        let slidingPx = 0


        if (direction === 'right') {
            if ((currentslidingPxCategoryNav - (widthCategoryNav / 2)) > (-differentWidthBetweenNavAndCategoryList)) {
                slidingPx = currentslidingPxCategoryNav - (widthCategoryNav / 2)
                setslidingPxCategoryNav(slidingPx)
            }
            if ((currentslidingPxCategoryNav - (widthCategoryNav / 2)) <= (-differentWidthBetweenNavAndCategoryList)) {
                slidingPx = -(differentWidthBetweenNavAndCategoryList)
                setslidingPxCategoryNav(slidingPx)
            }
        }

        if (direction === 'left') {
            if ((currentslidingPxCategoryNav + (widthCategoryNav / 2)) < 0) {
                slidingPx = currentslidingPxCategoryNav + (widthCategoryNav / 2)
                setslidingPxCategoryNav(slidingPx)
            }
            if ((currentslidingPxCategoryNav + (widthCategoryNav / 2)) >= 0) {
                setslidingPxCategoryNav(slidingPx)
            }
        }

        // console.log('slidingPx', slidingPx)
        // console.log('differentWidthBetweenNavAndCategoryList', differentWidthBetweenNavAndCategoryList)

        if (slidingPx < 0) {
            setStyleButtonLeft(styles.nav_scroller_button_left)
        } else {
            setStyleButtonLeft(styles.nav_scroller_button_left + " " + styles.hide)
        }

        if (slidingPx === -(differentWidthBetweenNavAndCategoryList)) {
            setStyleButtonRight(styles.nav_scroller_button_right + " " + styles.hide)
        } else {
            setStyleButtonRight(styles.nav_scroller_button_right)
        }
    }

    // const renderMenuList = () => {
    //     // console.log(menuList)
    //     let categorySection = categoryList.map((category, index) => {
    //         // console.log(menuList[category.categoryName])
    //         let menucard = menuList[category.categoryName].map((menu) =>
    //             <Col xs={6} className={styles.menu_card} onClick={() => setModalShow(true)}>
    //                 <Cardantd
    //                     cover={
    //                         <img
    //                             alt="example"
    //                             src={menu.image}
    //                             style={{ height: '200px' }}
    //                         />
    //                     }
    //                     actions={[
    //                         <b>{menu.price + "Baht"}</b>
    //                     ]}
    //                 >
    //                     <Meta
    //                         title={menu.name}
    //                         description="This is the description"
    //                     />
    //                 </Cardantd>
    //             </Col>
    //         )

    //         return (
    //             <div>
    //                 <div ref={(categoryRef) => (refsCategory.current[index] = categoryRef)} style={{ position: "relative", top: '-65px' }}>

    //                 </div>
    //                 <Row className={styles.category_section} >
    //                     <Col xs={12}>
    //                         <div className={utilStyles.font_size_xl + " " + styles.categoryHeader}>
    //                             {category.categoryName}
    //                         </div>
    //                     </Col>
    //                     <Col xs={12}>
    //                         <Row className={styles.menu_section}>
    //                             {menucard}
    //                         </Row>
    //                     </Col>
    //                 </Row>
    //             </div>
    //         )
    //     })
    //     // console.log(categorySection)

    //     setMenuEachCategory(categorySection)
    // }

    return (
        <>
            {
                !isMobileResolution ? (
                    // PC Version
                    <RestaurantDetailWeb
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                    />
                ) : (
                    // Mobile Version
                    <RestaurantDetailMobile />
                )
            }
        </>
    )
}
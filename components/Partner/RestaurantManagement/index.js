import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import WebComponent from './Web'
import MobileComponent from "./Mobile";
import partnerSerivce from '../../../services/partner'
import { message, Spin } from "antd";
import { FormatColorResetOutlined } from "@material-ui/icons";

export default function RestaurantManagement(props) {
    const { restaurant_id, current_tab, restaurant_name } = props
    const isMobileResolution = useMediaQuery(768)
    const [zone, setZone] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        console.log('restaurant_id', restaurant_id)
        if (restaurant_id && current_tab === 'restaurantManagement') {
            getZone()
        }
    }, [props])

    const getZone = async () => {
        setLoading(true)
        partnerSerivce.getZoneByRestaurantId(restaurant_id).then((zone) => {
            setZone(zone)
            setLoading(false)
        }).catch(error => {
            message.error('Cannot access to database.')
            console.log('error', error)
        })
    }

    let RestaurantManagementComponent
    if (isMobileResolution) {
        RestaurantManagementComponent = (
            <MobileComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
            />
        )
    } else {
        RestaurantManagementComponent = (
            <WebComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
            />
        )
    }
    return (
        <Spin spinning={loading} tip="Loading...">
            {RestaurantManagementComponent}
        </Spin>
    )
}
import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import WebComponent from './Web'
import MobileComponent from "./Mobile";
import partnerSerivce from '../../../services/partner'
import { message, Spin } from "antd";

export default function RestaurantManagement(props) {
    const { restaurant_id, current_tab, restaurant_name, type, current_user_roles } = props
    const isMobileResolution = useMediaQuery(768)
    const [zone, setZone] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [zoneNumberSelected, setZoneNumberSelected] = React.useState(0)

    useEffect(() => {
        if (restaurant_id && current_tab === 'restaurantManagement') {
            getZone()

        }
    }, [restaurant_id, current_tab])

    const getZone = async (zoneNumberSelected = null) => {
        if (zoneNumberSelected !== null) {
            setZoneNumberSelected(zoneNumberSelected)
        }
        setLoading(true)
        partnerSerivce.getZoneByRestaurantId(restaurant_id).then((zoneList) => {
            setZone(zoneList.filter((zone) => zone.is_active === true))
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
                zone_number_selected={zoneNumberSelected}
                current_user_roles={current_user_roles}
                type={type}
            />
        )
    }
    return (
        <Spin spinning={loading} tip="Loading...">
            {RestaurantManagementComponent}
        </Spin>
    )
}
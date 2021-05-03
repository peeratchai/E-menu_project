import React, { useEffect, useLayoutEffect } from 'react'
import styles from './index.module.css'
import utilStyles from '../../styles/utils.module.css'

export default function ShowFiilterSelected(props) {

    const [filterData, setFilterData] = React.useState(
        {
            what: null,
            where: null,
            food_type: null,
            price_from: null,
            price_to: null,
            payment_option: null,
            distance: null,
            is_open_now: null,
            have_parking: null,
            sort_by: null
        }
    );

    const setFormatFilter = (type, value) => {
        switch (type) {
            case 'price_to_price_from':
                let split = value.split(" ")
                let price_from = split[0]
                let price_to = split[1]
                return (price_from + " - " + price_to + " baht")
                break;
            case 'price_to':
                if (filterData.price_from === null) {
                    return ("0 - " + value + " baht")
                } else {
                    return (filterData.price_from + " - " + value + " baht")
                };
            case 'distance': return value + " km"
            case 'is_open_now':
                if (value === true) {
                    return 'Open now'
                } else {
                    break;
                }
            case 'have_parking':
                if (value === true) {
                    return 'Have parking'
                } else {
                    break;
                }
            default: return value
        }
    }

    useLayoutEffect(() => {

        if (props.filter !== undefined) {
            if (Object.keys(props.filter).length > 0) {
                console.log(props.filter)
                setFilterData(props.filter)
            }
        }
    }, [props])

    const filterArray = Object.keys(filterData)
    const filterList = filterArray.map((filterObject, index) => {
        if (filterData[filterObject] !== null && filterData[filterObject] !== "" && filterData[filterObject] !== 0 && filterData[filterObject] !== false && filterData[filterObject] !== "0 0" && filterObject !== 'business_location') {
            console.log(filterData[filterObject])

            let filter = setFormatFilter(filterObject, filterData[filterObject])
            return (
                <div className={styles.FilterButton + " " + utilStyles.fontMobileSM + " " + utilStyles.backgroundColorTheme} key={filterObject + index}>
                    {filter}
                </div>
            )
        }
    })

    return (
        <div className={styles.filterLayout}>
            {filterList}
        </div>
    )
}
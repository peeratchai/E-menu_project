import React, { useEffect } from 'react'
import styles from './index.module.css'
import utilStyles from '../../styles/utils.module.css'

export default function ShowFiilterSelected() {

    const [filterData, setFilterData] = React.useState({ foodType: 'Bread', paymentOption: 'Cash', Distance: '1 กิโลเมตร' });

    const filterArray = Object.keys(filterData)
    console.log(filterArray)
    const filterList = filterArray.map((filterObject, index) =>
    (
        <div className={styles.FilterButton + " " + utilStyles.fontMobileSM + " " + utilStyles.backgroundColorTheme} key={filterObject + index}>
            {filterData[filterObject]}
        </div>
    ))

    return (
        <div className={styles.filterLayout}>
            {filterList}
        </div>
    )
}
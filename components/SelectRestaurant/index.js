import { Select } from 'antd';
import 'antd/dist/antd.css';
import React from 'react'
import useMediaQuery from "../../utils/utils";

const { Option } = Select;


export default function SelectRestaurant(props) {
    const isMobileResolution = useMediaQuery(768)

    const { restauran_list, onChangeRestaurant } = props

    let restauranList = restauran_list && restauran_list.map((restaurant, index) => {
        return (
            <Option value={restaurant.id} key={restaurant.id + index}>{restaurant.name}</Option>
        )
    })

    return (
        <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
            Restaurant Name : &nbsp;
            <Select
                showSearch
                style={{ width: isMobileResolution ? '100%' : 400 }}
                placeholder="Select a restaurant name"
                optionFilterProp="children"
                onChange={(e) => onChangeRestaurant(e)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {restauranList}
            </Select>
        </div>
    )
}
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Select, Checkbox, Space } from 'antd';
import React, { useEffect } from 'react'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import utilStyles from '../../../../styles/utils.module.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SearchIcon from '@material-ui/icons/Search';

const { Option } = Select;

export default function WebFilter(props) {

    const { filter_master_data_list } = props
    const [filterOptions, setFilterOptions] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState();
    const [form, setForm] = React.useState({
        food_type: '',
        payment_option: '',
        distance: 0,
        price_to: null,
        price_from: null,
        is_open_now: false,
        have_parking: false,
        sort_by: null
    })

    useEffect(() => {
        if (filter_master_data_list) {
            setFilterOptionsFromMasterData()
        }
    }, [filter_master_data_list])

    const setFilterOptionsFromMasterData = () => {
        let filterOptions = [{
            label: 'Open now',
            value: 'Open now',
        },
        {
            label: 'Have Parking',
            value: 'Have Parking',
        }]

        filter_master_data_list.peymentOptionsMasterData.forEach((peymentOptions) => {
            filterOptions.push({
                label: peymentOptions.name,
                value: peymentOptions.name
            })
        })

        console.log('filterOptions', filterOptions)

        setFilterOptions(filterOptions)
    }


    const setform = (fieldName, value) => {
        setForm({
            ...form,
            [fieldName]: value
        })
    }


    let FootTypeDropDown = filter_master_data_list.foodTypeMasterData && filter_master_data_list.foodTypeMasterData.map((foodType) => (
        <Option value={foodType.name}>{foodType.name}</Option>
    ))

    let DistanceDropDown = filter_master_data_list.distanceMasterData && filter_master_data_list.distanceMasterData.map((distance) => (
        <Option value={distance.name}>{distance.name}</Option>
    ))

    return (
        <div className={styles.banner}>
            <div className={utilStyles.container} style={{ position: "relative", zIndex: "9999" }}>
                <Row style={{ marginBottom: "2rem", paddingTop: "50px" }}>
                    <div>
                        <h1 style={{ fontWeight: "600" }}>
                            Discover
                        <p style={{ fontWeight: "300" }}>your amazing city</p>
                        </h1>
                        <h5>
                            <p style={{ color: "#666666", fontSize: "" }}>Find great places to stay, eat, shop, or visit from local experts.</p>
                        </h5>
                    </div>
                </Row>

                <Row style={{ marginBottom: "2rem" }}>
                    <Col md={3} style={{ padding: "0", backgroundColor: "white", borderRadius: "2px", borderRight: "1px solid #dee2e6" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Food Type</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a foodtype"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(value) => setform('food_type', value)}
                                        className={'myfilter'}
                                    >
                                        <Option value={null}>-</Option>
                                        {FootTypeDropDown}
                                    </Select>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={3} style={{ padding: "0", backgroundColor: "white", borderRadius: "2px", borderRight: "1px solid #dee2e6" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Distance</b>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a distance"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(value) => setform('distance', value)}
                                        className={'myfilter'}
                                    >
                                        <Option value={null}>-</Option>
                                        {DistanceDropDown}
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={5} style={{ padding: "0", backgroundColor: "white", borderRadius: "2px" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Filter</b>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {/* <Checkbox onChange={(e) => setform('is_open_now', e.target.checked)} >Open Now</Checkbox>
                                    <Checkbox onChange={(e) => setform('have_parking', e.target.checked)} >Parking</Checkbox> */}
                                    <Space
                                        direction="vertical"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Select
                                            allowClear={true}
                                            showArrow={true}
                                            mode='multiple'
                                            style={{ width: '100%' }}
                                            value={filterValue}
                                            options={filterOptions}
                                            onChange={(value) => {
                                                setform('filter', value)
                                                setFilterValue(value)
                                            }}
                                            placeholder='Select Filters...'
                                            maxTagCount='responsive'
                                            className={'myfilter'} />
                                    </Space>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col md={1} >
                        <Button style={{ textAlign: "center", width: "100%", height: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md} onClick={() => props.onSearch(form)}>
                            <SearchIcon />
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <div style={{ fontSize: "1.125rem", color: "#666666", marginBottom: "1.25rem" }}>
                        Or browse the highlights
                    </div>
                </Row>

                {/* Highlights */}
                <Row>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <StarOutlined style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                Poppular
                        </div>
                        </div>
                    </div>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <LocationOnIcon style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                near you
                        </div>
                        </div>
                    </div>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <WatchLaterIcon style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                Open now
                        </div>
                        </div>
                    </div>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <FireOutlined style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                Hot price
                        </div>
                        </div>
                    </div>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <LocationOnIcon style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                near you
                        </div>
                        </div>
                    </div>
                    <div className={styles.boxHighlight}>
                        <div className={styles.cardHighlight}>
                            <div>
                                <LocationOnIcon style={{ fontSize: "22px" }} />
                            </div>
                            <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                near you
                        </div>
                        </div>
                    </div>
                </Row>
            </div>

        </div>

    )
}
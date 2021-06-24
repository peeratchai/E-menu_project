
import WebProfileComponent from './Web'
import MobileProfileComponent from './Mobile'
import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import restaurantService from '../../../services/restaurant'
import uploadService from '../../../services/upload'
import adminService from '../../../services/admin'
import { message } from 'antd';
export default function Profile(props) {
    const { restaurant_id, current_tab, type } = props
    const { get_restaurant_list } = props
    const isMobileResolution = useMediaQuery(768)
    const [formErrors, setFormErrors] = React.useState({});
    const defaultImage = "data:image/png;base64,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"
    const [businessDistrict, setBusinessDistrict] = React.useState([])
    const [restaurantForm, setRestaurantForm] = React.useState({
        business_hour: [
            {
                'day': 'Monday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Tuesday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Wednesday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Thursday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Friday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Saturday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            },
            {
                'day': 'Sunday',
                'opening_time': '8.00',
                'closing_time': '16.00'
            }
        ],
        facebook: '',
        description: '',
        have_parking: null,
        image_url: defaultImage,
        instragram: '',
        location: '',
        name: '',
        name_eng: '',
        description_eng: '',
        food_type: '',
        businessDistrict: '',
        Line: '',
        is_active: '',
        image: null,
        banner: [],
        payment_option: [],
        phone: '',
        price_from: '',
        price_to: '',
        restaurant_pictures: [],
        website: ''
    })
    const defaultBusinessHour = [
        {
            'day': 'Monday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Tuesday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Wednesday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Thursday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Friday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Saturday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        },
        {
            'day': 'Sunday',
            'opening_time': '8.00',
            'closing_time': '16.00'
        }
    ]
    const [loading, setLoading] = React.useState(false)
    useEffect(async () => {
        if (restaurant_id && current_tab === 'profile') {
            console.log('kiki')
            setLoading(true)
            await getAllBusinessDistrict()
            await getRestaurantDetails()
            setLoading(false)
        }
    }, [restaurant_id, current_tab])

    const getAllBusinessDistrict = async () => {
        let businessDistrict = await adminService.getAllLocation()
        setBusinessDistrict(businessDistrict)
    }

    const getRestaurantDetails = async () => {
        let responseRestaurantDetail = await restaurantService.getRestaurantById(restaurant_id)
        let restaurantDetail = responseRestaurantDetail.data
        let businessHour
        if (restaurantDetail) {

            if (restaurantDetail.business_hour.length > 0) {
                businessHour = restaurantDetail.business_hour
            } else {
                businessHour = defaultBusinessHour
            }

            let businessDistrictId = null
            if (restaurantDetail.business_district !== null) {
                businessDistrictId = restaurantDetail.business_district.id
            }
            let paymentOption
            if (restaurantDetail.payment_option !== null) {
                paymentOption = restaurantDetail.payment_option
            }

            console.log('businessHour', businessHour)

            let initialRestaurantForm = {
                business_hour: businessHour,
                facebook: restaurantDetail.facebook,
                description: restaurantDetail.description,
                description_eng: restaurantDetail.description_eng,
                have_parking: restaurantDetail.have_parking,
                image_url: restaurantDetail.image_url,
                instragram: restaurantDetail.instragram,
                location: restaurantDetail.location,
                address: restaurantDetail.address,
                name: restaurantDetail.name,
                Line: restaurantDetail.line,
                name_eng: restaurantDetail.name_eng,
                payment_option: paymentOption,
                phone: restaurantDetail.phone,
                price_from: restaurantDetail.price_from,
                price_to: restaurantDetail.price_to,
                restaurant_pictures: restaurantDetail.restaurant_pictures,
                website: restaurantDetail.website,
                restaurant_id: restaurant_id,
                business_district: businessDistrictId
            }
            setRestaurantForm(initialRestaurantForm)
        } else {
            console.log('restaurantDetail', restaurantDetail)
            message.error('Cannot get restaurant details.')
        }


    }

    const updateRestaurantDetails = async (restaurantForm) => {
        // console.log(restaurantForm)
        if (restaurant_id) {
            const { restaurantLogo, bannerImage, business_hour } = restaurantForm
            let dataForm = { ...restaurantForm }
            if (restaurantLogo === undefined) {
                dataForm.image = null
            } else {
                dataForm.image = restaurantLogo
            }
            let bannerImageFileList = []
            let restaurant_pictures = []
            let imageUrlArray = []
            if (bannerImage !== undefined) {
                if (bannerImage.length > 0) {
                    bannerImage.map((bannerImageData) => {
                        console.log('bannerImageData', bannerImageData)
                        if (bannerImageData.name !== null) {
                            bannerImageFileList.push(bannerImageData)
                        } else {
                            restaurant_pictures.push({
                                "restaurant": restaurant_id,
                                "title": bannerImageData.name,
                                "is_active": true,
                                "image_url": bannerImageData.url
                            })
                        }
                    })
                } else {
                    dataForm.banner = null
                    dataForm.restaurant_pictures = []
                }

                if (bannerImageFileList.length === 0) {
                    dataForm.banner = null
                } else {
                    let imageResponse
                    await Promise.all(bannerImageFileList.map(async (bannerImageData) => {
                        imageResponse = await uploadService.uploadImage(bannerImageData.originFileObj)
                        console.log('imageResponse', imageResponse)
                        imageUrlArray.push(imageResponse)
                    }))
                    console.log('imageUrlArray', imageUrlArray)

                    imageUrlArray.forEach((imageUrl) => {
                        restaurant_pictures.push({
                            "restaurant": restaurant_id,
                            "title": null,
                            "is_active": true,
                            "image_url": imageUrl
                        })
                    })
                }
            } else {
                dataForm.banner = null
            }

            dataForm.restaurant_pictures = restaurant_pictures
            let businessHour = []
            business_hour.map((business_hour) => {
                businessHour.push({
                    "restaurant": restaurant_id,
                    "day": business_hour.day,
                    "opening_time": parseFloat(business_hour.opening_time.split(":").join(".")),
                    "closing_time": parseFloat(business_hour.closing_time.split(":").join("."))
                })
            })
            dataForm.business_hour = businessHour
            console.log('dataForm', dataForm)
            restaurantService.updateRestaurantDetails(dataForm).then((response) => {
                console.log('response', response)
                if (get_restaurant_list) {
                    get_restaurant_list()
                }
                message.success('Update data successful.')
            }).catch(error => {
                console.log('error', error)
                message.error('Invalid restaurant ! Please contact admin.')
            })
        } else {
            message.warning('Please select restaurant.')
        }

    }

    let profileComponent
    if (isMobileResolution) {
        profileComponent =
            <MobileProfileComponent
                restaurant_form={restaurantForm}
                form_errors={formErrors}
                spin_loading={loading}
                update_restaurant_details={updateRestaurantDetails}
                business_district={businessDistrict}
                restaurant_id={restaurant_id}
            />
    } else {
        profileComponent =
            <WebProfileComponent
                restaurant_form={restaurantForm}
                form_errors={formErrors}
                spin_loading={loading}
                update_restaurant_details={updateRestaurantDetails}
                business_district={businessDistrict}
                restaurant_id={restaurant_id}
                type={type}
            />
    }
    return profileComponent
}
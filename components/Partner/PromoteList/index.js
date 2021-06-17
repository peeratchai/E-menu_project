import React, { useEffect } from 'react'
import EditPromoteModal from '../../Modal/EditPromoteModal'
import EditApprovedPromoteModal from '../../Modal/EditApprovedPromoteModal'
import ViewPromoteModal from '../../Modal/ViewPromoteModal'
import { Table, Tabs, Space, Tag, Spin, Popconfirm, message } from 'antd';
import partner from '../../../services/partner'
import partnerSerivce from '../../../services/partner';

const { TabPane } = Tabs;

export default function PromoteList(props) {

    const { current_tab, restaurant_id } = props
    const [viewPromoteShowModal, setViewPromoteShowModal] = React.useState(false);
    const [editPromoteShowModal, setEditPromoteShowModal] = React.useState(false);
    const [editApprovedPromoteShowModal, setEditApprovedPromoteShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [pendingPromotions, setpendingPromotions] = React.useState([])
    const [approvedPromotions, setApprovedPromotions] = React.useState([])
    const [rejectPromotions, setRejectPromotions] = React.useState([])
    const [promotionSelected, setPromotionSelected] = React.useState({
        image_url: 'data:image/png;base64,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',
        promotedContent: '',
        bannerText: ''
    })

    useEffect(() => {
        if (current_tab === 'promoteList') {
            getPromotions()
        }
    }, [current_tab])

    const getPromotions = async () => {
        setLoading(true)
        console.log('restaurant_id', restaurant_id)
        await partner.getPromotionsByRestaurant(restaurant_id).then((promotions) => {
            let promotionsGroupStatus = promotions.reduce((promotionsGroup, currentPromotions) => {
                if (!promotionsGroup[currentPromotions.status]) promotionsGroup[currentPromotions.status] = [];
                promotionsGroup[currentPromotions.status].push(currentPromotions);
                return promotionsGroup
            }, {})

            let pendingPromotions = [], pendingPromotionsDataTable = []
            let approvedPromotions = [], approvedPromotionsDataTable = []
            let rejectPromotions = [], rejectPromotionsDataTable = []

            let statusArray = Object.keys(promotionsGroupStatus)
            statusArray.forEach((status) => {
                console.log('promotionsGroupStatus[status]', promotionsGroupStatus[status])
                switch (status) {
                    case 'pending': return pendingPromotions = promotionsGroupStatus[status];
                    case 'approved': return approvedPromotions = promotionsGroupStatus[status];
                    case 'reject': return rejectPromotions = promotionsGroupStatus[status];
                }
            })

            console.log('approvedPromotions', approvedPromotions)
            if (pendingPromotions.length > 0) {
                pendingPromotions.forEach((promotions, index) => {
                    pendingPromotionsDataTable.push({
                        key: promotions.id,
                        no: index + 1,
                        promotionId: promotions.id,
                        promotedContent: promotions.promote_content,
                        bannerText: promotions.title,
                        status: promotions.status,
                        restaurantName: promotions.restaurant.name,
                        image_url: promotions.image_url
                    })
                })
            }
            if (approvedPromotions.length > 0) {
                approvedPromotions.forEach((promotions, index) => {
                    approvedPromotionsDataTable.push({
                        key: promotions.id,
                        no: index + 1,
                        promotionId: promotions.id,
                        promotedContent: promotions.promote_content,
                        bannerText: promotions.title,
                        status: promotions.status,
                        restaurantName: promotions.restaurant.name,
                        image_url: promotions.image_url
                    })
                })
            }
            if (rejectPromotions.length > 0) {
                rejectPromotions.forEach((promotions, index) => {
                    rejectPromotionsDataTable.push({
                        key: promotions.id,
                        no: index + 1,
                        promotionId: promotions.id,
                        promotedContent: promotions.promote_content,
                        bannerText: promotions.title,
                        status: promotions.status,
                        restaurantName: promotions.restaurant.name,
                        image_url: promotions.image_url
                    })
                })
            }

            setpendingPromotions(pendingPromotionsDataTable)
            setApprovedPromotions(approvedPromotionsDataTable)
            setRejectPromotions(rejectPromotionsDataTable)
            setLoading(false)

            console.log('promotionsGroupStatus', promotionsGroupStatus)

        })
    }

    const confirmDeletePromotion = async (promotionsId) => {
        console.log('promotionsId', promotionsId)
        partnerSerivce.deletePromotion(promotionsId).then(() => {
            message.success('Delete promotion successful.')
            getPromotions()
        }).catch(error => {
            console.log('confirmDeletePromotion', error)
            message.error('Cannot change promotion status!. Please try again.')
        })
    }

    const columnsPendingPromotion = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Promoted content',
            dataIndex: 'promotedContent',
            key: 'promotedContent',
        },
        {
            title: 'Banner text',
            dataIndex: 'bannerText',
            key: 'bannerText',
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'restaurantName',
            key: 'restaurantName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (promotion, record) => (
                <Space size="middle">
                    <Tag color="blue" key={record.length + 1} style={{ cursor: "pointer" }} onClick={() => (setPromotionSelected(promotion), setEditPromoteShowModal(true))}>
                        Edit
                    </Tag>
                    <Popconfirm
                        title="Are you sure to delete this promotion?"
                        onConfirm={() => confirmDeletePromotion(promotion.promotionId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tag color="red" key={record.length + 1} style={{ cursor: "pointer" }} >
                            Delete
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const columnsApprovedPromotion = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Promoted content',
            dataIndex: 'promotedContent',
            key: 'promotedContent',
        },
        {
            title: 'Banner text',
            dataIndex: 'bannerText',
            key: 'bannerText',
        },
        {
            title: 'Restaurant Name',
            dataIndex: 'restaurantName',
            key: 'restaurantName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (promotion, record) => (
                <Space size="middle">
                    <Tag color="blue" key={record.length + 1} style={{ cursor: "pointer" }} onClick={() => (setPromotionSelected(promotion), setEditApprovedPromoteShowModal(true))}>
                        Edit
                    </Tag>
                    <Tag color="blue" key={record.length + 1} style={{ cursor: "pointer" }} onClick={() => (setPromotionSelected(promotion), setViewPromoteShowModal(true))}>
                        View Content
                    </Tag>
                    <Popconfirm
                        title="Are you sure to delete this promotion?"
                        onConfirm={() => confirmDeletePromotion(promotion.promotionId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tag color="red" key={record.length + 1} style={{ cursor: "pointer" }} >
                            Delete
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        }
    ]


    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Promotion List
            </div>

            <Spin spinning={loading} tip='loading...'>
                <Tabs defaultActiveKey="pending" >
                    <TabPane tab="pending" key="pending">
                        <Table columns={columnsPendingPromotion} dataSource={pendingPromotions} scroll={{ x: 'max-content' }} />
                    </TabPane>
                    <TabPane tab="Approved" key="approved">
                        <Table columns={columnsApprovedPromotion} dataSource={approvedPromotions} scroll={{ x: 'max-content' }} />
                    </TabPane>
                    <TabPane tab="Reject" key="reject">
                        <Table columns={columnsApprovedPromotion} dataSource={rejectPromotions} scroll={{ x: 'max-content' }} />
                    </TabPane>
                </Tabs>
            </Spin>

            <EditPromoteModal
                show={editPromoteShowModal}
                onHide={() => setEditPromoteShowModal(false)}
                promotion_selected={promotionSelected}
                title="Promote Details"
                restaurant_id={restaurant_id}
                get_promotions={getPromotions}
            />
            <EditApprovedPromoteModal
                show={editApprovedPromoteShowModal}
                onHide={() => setEditApprovedPromoteShowModal(false)}
                promotion_selected={promotionSelected}
                title="Promote Details"
                restaurant_id={restaurant_id}
                get_promotions={getPromotions}
            />
            <ViewPromoteModal
                show={viewPromoteShowModal}
                onHide={() => setViewPromoteShowModal(false)}
                promotion={promotionSelected}
                title="Promote Details"
            />
        </>

    )
}
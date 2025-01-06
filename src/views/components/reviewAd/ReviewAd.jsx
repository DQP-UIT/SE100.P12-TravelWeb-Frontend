import React, { useEffect } from 'react';
import { Button, Rate, Table, Tag, Tooltip, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesByUserID } from '../../../viewModel/invoiceActions';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CommentStatistics = () => {
const token = localStorage.getItem("token");
  let decodedToken = token ? jwtDecode(token) : {};
  const { invoice, loading } = useSelector((state) => state.invoice);
   // Lấy danh sách hóa đơn dựa trên userID
   const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getInvoicesByUserID(decodedToken?.userId));
      console.log("HELLLO")
    }, [dispatch]);
    console.log("DIT",invoice)
let tableData =[]
if(invoice.length>0 ){
    tableData = invoice?.filter(item => item.review)?.map((item, index) => ({
    key: index,
    serviceName: item.serviceID?.serviceName || "N/A",
    room: item.roomID?.roomType || "Không áp dụng",
    address: item.serviceID?.locationID?.locationName    || "N/A",
    comment: item.review?.positiveComment || "Không có đánh giá",
    stars: item.review?.stars || 0,
    id: item.roomID?.hotelID
  }));
  
}
  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Số sao',
      dataIndex: 'stars',
      key: 'stars',
      render: (stars) => <Rate disabled defaultValue={stars} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
          <Button type="primary" onClick={() =>{ handleViewDetail(record.id); console.log(record)} }>
            Xem dịch vụ
          </Button>
        </div>
      ),
    },
  ];
  const { Title } = Typography;
  const data = [
    {
      key: '1',
      serviceName: 'Dịch vụ A',
      room: 'Phòng 101',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      comment: 'Dịch vụ rất tốt, nhân viên nhiệt tình.',
      ratingText: 'Tốt',
      stars: 5,
    },
    {
      key: '2',
      serviceName: 'Dịch vụ B',
      room: 'Phòng 202',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      comment: 'Phòng sạch sẽ nhưng hơi nhỏ.',
      ratingText: 'Trung bình',
      stars: 3,
    },
    {
      key: '3',
      serviceName: 'Dịch vụ C',
      room: 'Không áp dụng',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      comment: 'Thức ăn ngon nhưng phục vụ hơi chậm.',
      ratingText: 'Khá',
      stars: 4,
    },
   
  ];
    const navigate = useNavigate();
  const handleViewDetail = (id) => {
    if(id){
      navigate(`/detail/${id}`);
    }
  };

  return (
    <div style={{marginTop:'50px'}}>
    <Title level={3}>Thống kê đánh giá</Title>
    <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 10 }} />;
    </div>
  ) 
};

export default CommentStatistics;

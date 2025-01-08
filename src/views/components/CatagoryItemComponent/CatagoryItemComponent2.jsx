import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, notification, Typography } from "antd";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearErrors, getUserByUserID } from "../../../viewModel/userActions";
import { fetchLoveList, updateLoveList } from "../../../model/loveListSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { URL } from "../../../model/constants/URL";

const CatagoryItemComponent = ({ title }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const { loveList, error } = useSelector((state) => state.loveList);
  
  const token = localStorage.getItem("token");
  let decodedToken = {};
  if (token) {
    decodedToken = jwtDecode(token);
  } else {
    console.log("Không có token để giải mã.");
  }

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLoveList(decodedToken.userID));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearErrors());
    }
    dispatch(getUserByUserID(id));
  }, [dispatch, error, id]);

  useEffect(() => {
    setAttributes(loveList);
  }, [loveList]);

  const handleAttributeClick = (record) => {
    setSelectedAttributeId(record.serviceID);
  };

  const handleDelete = (record) => {
    // Remove the selected service from the loveList
    const updatedLoveList = loveList.filter((item) => item.serviceID !== record.serviceID);

    // Dispatch an action to update the loveList in the store
    dispatch(updateLoveList({ userID: decodedToken.userID, loveList: updatedLoveList }));

    // Show a notification to inform the user
    notification.success({
      message: "Đã xóa khỏi yêu thích",
      description: `Bạn vừa xóa "${record.serviceName}" khỏi danh sách yêu thích.`,
      placement: "topRight",
    });
  };

  const handleView = async (record) => {
    try {
      // Gửi yêu cầu API để lấy hotelID
      const response = await axios.get(`${URL}/api/services/${record._id}/hotel`);
      navigate(`/detail/${response.data.hotelID}`);
      // Log hotelID ra console
      console.log("HotelID:", response.data.hotelID);
    } catch (error) {
      console.error("Error fetching hotelID:", error);
    }
  };
  

  const handleEdit = (record) => {
    // Redirect to the edit page (you can change the route as needed)
    //navigate(`/detail/${room.id}`);
  };
console.log(loveList)
  const attributeColumns = [
    { title: "ID", dataIndex: "serviceID", key: "serviceID" },
    { title: "Loại", dataIndex: "type", key: "type" },
    { title: "Tên", dataIndex: "serviceName", key: "serviceName" },
    {
      title: "Địa chỉ",
      dataIndex: ["locationID", "locationName"],
      key: "locationName",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (value) => (value === "Active" ? "Hoạt động" : "Không hoạt động"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ marginRight: "8px" }}
          />
          
          <Button
  type="danger"
  icon={<DeleteOutlined />}
  onClick={() => handleDelete(record)}
  style={{ backgroundColor: "red", borderColor: "red", color: "black" ,font: '10px'}}
/>

        </div>
      ),
    },
  ];

  return (
    <div style={{marginTop:'50px'}}>
      <Typography.Title level={3}>Dịch vụ bạn đã thích</Typography.Title>
      <Col
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "16px",
          margin: "10px",
        }}
      >
        <Row justify="space-between" align="middle">
          <h3>Danh sách Dịch vụ</h3>
        </Row>
        <Table
          dataSource={attributes && attributes.length > 0 ? [...attributes].reverse() : []}
          columns={attributeColumns}
          rowKey="serviceID"
          onRow={(record) => ({
            onClick: () => handleAttributeClick(record),
          })}
          rowClassName={(record) => (selectedAttributeId === record.serviceID ? "" : "")}
          rowStyle={(record) => ({
            backgroundColor: selectedAttributeId === record.serviceID ? "#f0f9ff" : "transparent",
          })}
        />
      </Col>
    </div>
  );
};

export default CatagoryItemComponent;

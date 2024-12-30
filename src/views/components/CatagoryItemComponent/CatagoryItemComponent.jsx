import React, { useEffect, useState } from "react";
import { Table, Row, Col, Select, Button, Modal, Input, Form, notification, message, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getUserByUserID } from "../../../viewModel/userActions";
import RoomAvailabilityCalendar from "../roomAvailabilityCalendar/RoomAvailabilityCalendar";
import { createService } from "../../../viewModel/serviceActions";
import { createRoom } from "../../../viewModel/roomActions";
//import { bulkUpdateAttributes, fetchAttributesByType } from "../../../redux/Slicer/attributeSlice";

const { Option } = Select;


const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
  const randomHex = () => Math.random().toString(16).substr(2, 8); // 8 hex chars
  return (timestamp + randomHex() + randomHex()).substr(0, 24); // Đảm bảo đúng 24 ký tự
};
const CatagoryItemComponent = ({ title }) => {
  const dispatch = useDispatch();

    const { id } = useParams();
    const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading khi cập nhật
  console.log(id)
  
  
  const [addSer, setAddSer] = useState(false);
    const {  error, user } = useSelector((state) => state.user);
   
    useEffect(() => {
      if (error) {
        console.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getUserByUserID(id));
      console.log("SLDFHLSDFJLDSF")
      
    }, [addSer ]);


    useEffect(() => {
      setAttributes(user.services)
      
    }, [user ]);
  
    console.log("GÀ",user)
   
  //const reduxAttributes = useSelector((state) => state.attributes.attributes);
const [errorMessage, setErrorMessage] = useState('');
  const [attributes, setAttributes] = useState(user.services);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [isValueModalVisible, setIsValueModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
 
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (title) {
  //     dispatch(fetchAttributesByType(title)); // Lấy dữ liệu từ Redux
  //   }
  // }, [dispatch, title]);

  // useEffect(() => {
  //   if (reduxAttributes) {
  //     setAttributes(reduxAttributes); // Khởi tạo state nội bộ từ Redux
  //   }
  // }, [reduxAttributes]);

console.log("HELLO")
console.log(attributes)
console.log("HELLO")


  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (isAdding) {
        if (isAttributeModalVisible) {
          // Thêm mới thuộc tính
          const newAttribute = {
            _id: generateObjectId(),
            id: Math.random().toString(36).substring(7), // ID tạm
            name: values.attribute,
            status: true,
            type: title,
            values: [],
          };

          const isNameExist = attributes.some(attribute => attribute.name === newAttribute.name);

// Kiểm tra độ dài của values.attribute
if (values.attribute.length < 3) {
  setErrorMessage("Tên thuộc tính phải có ít nhất 3 ký tự.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
} else if (values.attribute.length > 50) {
  setErrorMessage("Tên thuộc tính không được vượt quá 50 ký tự.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
} else if (isNameExist) {
  setErrorMessage("Tên thuộc tính đã bị trùng.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
}
          setAttributes([...attributes, newAttribute]);
        } else if (isValueModalVisible && selectedAttributeId) {
          

          
          // Thêm mới giá trị
          setAttributes(
            attributes.map((attr) =>
              attr.id === selectedAttributeId
                ? { 
                    ...attr,
                    values: [
                      ...attr.values,
                      {
                        _id: generateObjectId(),
                        id: Math.random().toString(36).substring(7), // ID tạm
                        value: values.attribute,
                        status: true,
                      },
                    ],
                  }
                : attr
            )
          );
        }
      } else {
        
        if (isAttributeModalVisible) {
          const isNameExist = attributes.some(attribute => attribute.name === values.attribute);

// Kiểm tra độ dài của values.attribute
if (values.attribute.length < 3) {
  setErrorMessage("Tên thuộc tính phải có ít nhất 3 ký tự.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
} else if (values.attribute.length > 50) {
  setErrorMessage("Tên thuộc tính không được vượt quá 50 ký tự.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
} else if (isNameExist) {
  setErrorMessage("Tên thuộc tính đã bị trùng.");
  return; // Dừng lại và không thực hiện thêm thuộc tính
}
          // Chỉnh sửa thuộc tính
          setAttributes(
            attributes.map((attr) =>
              attr.id === editData.id
                ? { ...attr, name: values.attribute }
                : attr
            )
          );
        } else if (isValueModalVisible && selectedAttributeId) {
          // Chỉnh sửa giá trị
          setAttributes(
            attributes.map((attr) =>
              attr.id === selectedAttributeId
                ? {
                    ...attr,
                    values: attr.values.map((val) =>
                      val.id === editData.id
                        ? { ...val, value: values.attribute, status: values.status === "Hoạt động" }
                        : val
                    ),
                  }
                : attr
            )
          );
        }
      }

      notification.success({
        message: isAdding ? "Thêm mới thành công" : "Cập nhật thành công",
        description: isAdding ? "Dữ liệu đã được thêm thành công!" : "Dữ liệu đã được cập nhật thành công!",
      });

      setIsAttributeModalVisible(false);
      setIsValueModalVisible(false);
      setEditData(null);
      form.resetFields();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const showEditModal = (record, isValue, isAdding = false) => {
    setIsAdding(isAdding);
    setEditData(isAdding ? null : record);
    form.setFieldsValue({
      attribute: isAdding ? "" : record.value || record.name,
      status: isAdding ? "Hoạt động" : record.status ? "Hoạt động" : "Không hoạt động",
    });
    if (isValue) {
      setIsValueModalVisible(true);
    } else {
      setIsAttributeModalVisible(true);
    }
  };

  const handleAttributeClick = (record) => {
    setSelectedAttributeId(record.serviceID);
  };
  const navigate = useNavigate();

  const attributeColumns = [
    
    
    { title: "ID", dataIndex: "serviceID", key: "serviceID" },
    { title: "Loại", dataIndex: "type", key: "type" },
    { title: "Tên", dataIndex: "serviceName", key: "serviceName" },
    { title: "Địa chỉ", dataIndex: ["locationID", "locationName"], key: "locationName" },
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
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/service/${record?.hotels[0]?._id}`)}
          data-testid={`${record.name}`} 
        />
      ),
    },
  ];
  
  const valueColumns = [
    { title: "ID", dataIndex: "roomID", key: "roomID" },
    { title: "Loại phòng", dataIndex: "roomType", key: "roomType" },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá giảm",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    
    {
      title: "Tình trạng",
      dataIndex: "active",
      key: "active",
      render: (value) => (value ? "Hoạt động" : "Không hoạt động"),
    },
   
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/room/${record?._id}`)}
          data-testid={`${record.value}`} 
        />
      ),
    },
  ];
  

  const [isSaved, setIsSaved] = useState(false);
  const roomsAvailable = [
    { id: "1", date: "2025-01-01T00:00:00.000Z", availableRooms: 5 },
    { id: "2", date: "2025-01-02T00:00:00.000Z", availableRooms: 3 },
    { id: "3", date: "2025-01-03T00:00:00.000Z", availableRooms: 0 },
    // ...
  ];
// const handleSave2 = async () => {
//     // Your save logic here
//     dispatch(bulkUpdateAttributes(attributes))
//     .unwrap()
//     .then((response) => {
//         console.log("Update successful:", response);
//         // After successful save, set isSaved to true
//         setIsSaved(true);
//     })
//     .catch((error) => {
//         console.error("Update failed:", error);
//     });
//     message.success("Lưu thành công.");
// };

// Use an effect to trigger re-render when isSaved changes
useEffect(() => {
    if (isSaved) {
        setIsSaved(false); // Reset isSaved state after re-render
        // You can optionally refetch or reset anything here if needed onClick={() => handleSave2()}
    }
}, [isSaved]);
const { Title } = Typography;

  return (
    <div>
    {/* <Button  type="primary" style={{ width: "100px" }} >
            Lưu  
          </Button> */}
          <Title level={3}>Thống kê đánh giá</Title>
      <Row gutter={16}>
      
      <Col
  span={12}
  style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '16px',
     margin:'10px'
  }}
>
  <Row justify="space-between" align="middle">
    <h3>Danh sách Dịch vụ</h3>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
       
      dispatch(createService({providerID: user.services[0].providerID._id}))
      setTimeout(() => {
      setAddSer((prev) => !prev); // Đảo ngược trạng thái sau 3 giây
    }, 0);
    setAttributes(user.services)
      }
      }
    >
      Thêm dịch vụ
    </Button>
  </Row>
  <Table
  dataSource={[...attributes].reverse()} // Đảo ngược thứ tự của attributes
  columns={attributeColumns}
  rowKey="id"
  onRow={(record) => ({
    onClick: () => handleAttributeClick(record),
  })}
/>
</Col>

  <Col span={11}
  style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
     margin:'10px'
  }}>
    <Row justify="space-between" align="middle">
      <h3>
        {selectedAttributeId
          ? `Danh sách phòng của: ${
              attributes.find((attr) => attr.serviceID === selectedAttributeId)?.serviceName || ""
            }`
          : "Vui lòng chọn một Thuộc tính"}
      </h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={!selectedAttributeId}
        onClick={() => {
          
          dispatch(createRoom({hotelID: attributes?.find((attr) => attr.serviceID === selectedAttributeId)?.hotels[0]?._id }))
          setTimeout(() => {
      setAddSer((prev) => !prev); // Đảo ngược trạng thái sau 3 giây
    }, 0);
    setAttributes(user.services)
      }
        }
      >
        Thêm phòng
      </Button>
    </Row>
    <Table
  dataSource={
    attributes
      ?.find((attr) => attr.serviceID === selectedAttributeId)
      ?.hotels[0]?.rooms?.slice().reverse() || [] // Sử dụng slice() để tạo bản sao trước khi reverse
  }
  columns={valueColumns}
  rowKey="id"
  onRow={(record) => ({
    onClick: () => setSelectedRoom(record._id),
  })}
/>

  </Col>
</Row>
 <Col span={23}
  style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
     margin:'10px'
  }}><RoomAvailabilityCalendar roomID = {selectedRoom} /></Col>
 

      <Modal
        visible={isAttributeModalVisible}
        title={isAdding ? "Thêm thuộc tính" : "Chỉnh sửa thuộc tính"}
        onCancel={() => setIsAttributeModalVisible(false)}
        onOk={handleSave}
        okButtonProps={{ "data-testid": "modal-ok-button" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attribute"
            label="Thuộc tính"
            rules={[{ required: true, message: "Vui lòng nhập thuộc tính!" }]}
            data-testid="attribute"
          >
            <Input />
          </Form.Item>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {/* {( !isAdding &&
             <Form.Item name="status" label="Tình trạng">
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item> )} */}
          
        </Form>
      </Modal>
      <Modal
        visible={isValueModalVisible}
        title={isAdding ? "Thêm giá trị" : "Chỉnh sửa giá trị"}
        onCancel={() => setIsValueModalVisible(false)}
        onOk={handleSave}
        okButtonProps={{ "data-testid": "modal-ok-button" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="attribute"
            label="Giá trị"
            rules={[{ required: true, message: "Vui lòng nhập giá trị!" }]}
             data-testid="attribute"
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name="status" label="Tình trạng">
            <Select>
              <Option value="Hoạt động">Hoạt động</Option>
              <Option value="Không hoạt động">Không hoạt động</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default CatagoryItemComponent;

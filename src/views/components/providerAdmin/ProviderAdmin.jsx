import React, { useEffect, useState } from "react";
import { Table, Row, Col, Select, Button, Modal, Input, Form, notification, message, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, getAllUsers, getUserByUserID } from "../../../viewModel/userActions";
import RoomAvailabilityCalendar from "../roomAvailabilityCalendar/RoomAvailabilityCalendar";
import { createService } from "../../../viewModel/serviceActions";
import { createRoom } from "../../../viewModel/roomActions";


const { Option } = Select;


const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
  const randomHex = () => Math.random().toString(16).substr(2, 8); // 8 hex chars
  return (timestamp + randomHex() + randomHex()).substr(0, 24); // Đảm bảo đúng 24 ký tự
};
const CatagoryItemComponent2 = ({ title }) => {
  const dispatch = useDispatch();

    const id = "P002"
    const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading khi cập nhật
  console.log(id)
  
  
  const [addSer, setAddSer] = useState(false);


  const [pro, setPro] = useState("");
    const hello = useSelector((state) => state.user);
   
    // useEffect(() => {
    //   if ( hello.error) {
    //     console.error( hello.error);
    //     dispatch(clearErrors());
    //   }
  
    //   dispatch(getUserByUserID(id));
    //   console.log("SLDFHLSDFJLDSF")
      
    // }, [addSer ]);


    useEffect(() => {
      setAttributes( hello.user.services)
      
    }, [ hello.user ]);
  
    console.log("GÀ", hello.user)
   
  //const reduxAttributes = useSelector((state) => state.attributes.attributes);
const [errorMessage, setErrorMessage] = useState('');
  const [attributes, setAttributes] = useState( hello.user.services);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false);
  const [isValueModalVisible, setIsValueModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
 
  const [form] = Form.useForm();


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
  
   const [userType, setUserType] = useState("provider");
    const [filteredData, setFilteredData] = useState([]);  // Dữ liệu đã lọc
    const [userId, setUserId] = useState(""); // Store user ID for role change
    const [newRole, setNewRole] = useState(""); // Store new role to update
    const [users, setUsers] = useState([]);  // Dữ liệu người dùng (cập nhật khi thay đổi vai trò)
  
    const {  error, user } = useSelector((state) => state.user);
  
    useEffect(() => {
      dispatch(getAllUsers());
  
      return () => {
        dispatch(clearErrors()); // Xóa lỗi khi unmount component
      };
    }, [dispatch]);
  
    useEffect(() => {
      if (user && user.length > 0) {
        setUsers(user);  // Cập nhật dữ liệu người dùng ban đầu
      }
    }, [user]);
    const handleStatusChange = (value, userId) => {
      const updatedData = filteredData.map((item) =>
        item.userID === userId ? { ...item, active: value } : item
      );
      setFilteredData(updatedData); // Cập nhật lại trạng thái cho người dùng
      notification.success({
        message: `Người dùng có id ${userId} đã ${value ? "hoạt động" : "vô hiệu hóa"}`,
      });
    };
    useEffect(() => {
      if (users && users.length > 0) {
        const filtered = users
          .filter((item) => item.role.toLowerCase() === userType)
          .map((item) => ({
            ...item,
            serviceCount: userType === "customer" ? item.serviceCount || 0 : undefined,
            totalAmount: userType === "customer" ? item.totalAmount || 0 : undefined,
          }));
        setFilteredData(filtered);
      }
    }, [users, userType]);
  
    const handleUserTypeChange = (type) => {
      setUserType(type);
    };
  
    const handleRoleChange = () => {
      if (!userId || !newRole) {
        notification.error({ message: "Hãy nhập ID và loại người dùng hợp lệ!" });
        return;
      }
  
      // Cập nhật vai trò người dùng trực tiếp trong bảng
      const updatedData = users.map((item) =>
        item.userID === userId ? { ...item, role: newRole } : item
      );
      setUsers(updatedData); // Cập nhật lại dữ liệu người dùng sau khi thay đổi vai trò
  
      // Xóa các trường nhập liệu
      setUserId("");
      setNewRole("");
      notification.success({ message: "Cập nhật loại người dùng thành công" });
    };
  
    const columns = [
      {title: "ID",
        dataIndex: "userID",
        key: "userID",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              placeholder="Tìm kiếm id"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm
            </Button>
          </div>
        ),
        onFilter: (value, record) =>
          record.userName.toLowerCase().includes(value.toLowerCase()),},
        
      
      {
        title: "Tên đăng nhập",
        dataIndex: "userName",
        key: "userName",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              placeholder="Tìm kiếm tên đăng nhập"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm
            </Button>
          </div>
        ),
        onFilter: (value, record) =>
          record.userName.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "Họ tên",
        dataIndex: "fullName",
        key: "fullName",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              placeholder="Tìm kiếm họ tên"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm
            </Button>
          </div>
        ),
        onFilter: (value, record) =>
          record.fullName.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              placeholder="Tìm kiếm số điện thoại"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm
            </Button>
          </div>
        ),
        onFilter: (value, record) => record.phoneNumber.includes(value),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              placeholder="Tìm kiếm email"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Tìm
            </Button>
          </div>
        ),
        onFilter: (value, record) =>
          record.email.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "Ngày sinh",
        dataIndex: "birthDate",
        key: "birthDate",
        render: (date) => date?.slice(0, 10),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <input
              type="date"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirm();
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              type="primary"
              onClick={confirm}
              style={{ width: 90, marginRight: 8 }}
            >
              Lọc
            </Button>
          </div>
        ),
        onFilter: (value, record) => record.birthDate?.startsWith(value),
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        render: (text, record) => (
          <Select
            defaultValue={record.active}
            onChange={(value) => handleStatusChange(value, record.userID)}
            style={{ width: 120 }}
          >
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt động</Option>
          </Select>
        ),
      },
      userType === "customer" && {
        title: "Số lượng dịch vụ đã sử dụng",
        dataIndex: "serviceCount",
        key: "serviceCount",
        sorter: (a, b) => a.serviceCount - b.serviceCount,
      },
      userType === "customer" && {
        title: "Tổng số tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (amount) => `${amount?.toLocaleString()} VND`,
        sorter: (a, b) => a.totalAmount - b.totalAmount,
      },
    ].filter(Boolean);
  

  const [isSaved, setIsSaved] = useState(false);
  
useEffect(() => {
    if (isSaved) {
        setIsSaved(false); // Reset isSaved state after re-render
        // You can optionally refetch or reset anything here if needed onClick={() => handleSave2()}
    }
}, [isSaved]);
const { Title } = Typography;

  return (
    <div>
    <Title level={3}>Quản lý nhà cung cấp  </Title>
    {/* <Button  type="primary" style={{ width: "100px" }} >
            Lưu  
          </Button> */}
          
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
 <Title level={4}>Danh sách nhà cung cấp  </Title>
  <Table
    columns={columns}
    dataSource={filteredData}
    rowKey="_id"
    loading={loading}
    pagination={{ pageSize: 5 }}
    onRow={(record) => ({
      onClick: () => {
         if ( hello.error) {
        console.error( hello.error);
        dispatch(clearErrors());
      }
  
      dispatch(getUserByUserID(record.userID));
      setPro(record.userID)
      console.log("SLDFHLSDFJLDSF")
      },
    })}
></Table>

</Col>

  <Col span={11}
  style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px',
     margin:'10px'
  }}>
    <Row justify="space-between" align="middle">
    <Title level={4}>Dịch vụ của nhà cung cấp id {pro}  </Title>
    {/* <Button
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
    </Button> */}
  </Row>
  <Table
  dataSource={ attributes? [...attributes]?.reverse() : []} // Đảo ngược thứ tự của attributes
  columns={attributeColumns}
  rowKey="id"
  onRow={(record) => ({
    onClick: () => handleAttributeClick(record),
  })}
/>
  </Col>
</Row>
 
 

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

        </Form>
      </Modal>
    </div>
  );
};

export default CatagoryItemComponent2;

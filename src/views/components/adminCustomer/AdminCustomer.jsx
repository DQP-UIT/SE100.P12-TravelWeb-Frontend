import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Form, Input, Select, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../viewModel/userActions";
import { clearErrors } from "../../../viewModel/hotelAction";
import { Option } from "antd/es/mentions";

const InvoiceTable2 = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [userType, setUserType] = useState("customer");
  const [filteredData, setFilteredData] = useState([]);  // Dữ liệu đã lọc
  const [userId, setUserId] = useState(""); // Store user ID for role change
  const [newRole, setNewRole] = useState(""); // Store new role to update
  const [users, setUsers] = useState([]);  // Dữ liệu người dùng (cập nhật khi thay đổi vai trò)

  const { loading, error, user } = useSelector((state) => state.user);

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


  const handleApproveProvider = (userId) => {
    const updatedData = users?.map((item) =>
      item.userID === userId ? { ...item, role: "provider" } : item
    );
   setUsers(updatedData)
    notification.success({ message: "Duyệt yêu cầu làm nhà cung cấp thành công" });
  };

  const [randomCustomers, setRandomCustomers] = useState([]); // Store 5 random customers for provider approval
  useEffect(() => {
    if(users){
    // Lấy ngẫu nhiên 5 khách hàng từ danh sách người dùng
    const customers = users?.filter((item) => item.role.toLowerCase() === "customer");
   
    setRandomCustomers(customers);
  }
  }, [users]);
  const approveColumns = [
    { title: "ID", dataIndex: "userID", key: "userID" },
    { title: "Tên đăng nhập", dataIndex: "userName", key: "userName" },
    { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleApproveProvider(record.userID)}
        >
          Duyệt
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Quản lý người dùng</Title>
      <div style={{ marginBottom: 16 }}>
        <Button
          type={userType === "customer" ? "primary" : "default"}
          onClick={() => handleUserTypeChange("customer")}
          style={{ marginRight: 8 }}
        >
          Khách hàng
        </Button>
        <Button
          type={userType === "provider" ? "primary" : "default"}
          onClick={() => handleUserTypeChange("provider")}
          style={{ marginRight: 8 }}
        >
          Nhà cung cấp dịch vụ
        </Button>
        <Button
          type={userType === "admin" ? "primary" : "default"}
          onClick={() => handleUserTypeChange("admin")}
        >
          Admin
        </Button>
      </div>

      
      <Table
  columns={columns}
  dataSource={filteredData}
  rowKey="_id"
  loading={loading}
  pagination={{ pageSize: 5 }}
  onRow={(record) => ({
    onClick: () => {
      setUserId(record.userID); // Cập nhật userId từ hàng được chọn
      setNewRole(record.role); // Cập nhật newRole từ vai trò hiện tại của hàng được chọn
    },
  })}

  
/>
{/* Form to update role */}
<div style={{ marginBottom: 16 }}>
<Title level={3}>Phân quyền</Title>
        <Form layout="inline" onFinish={handleRoleChange}>
          <Form.Item label="Nhập ID người dùng" style={{ marginRight: 16 }}>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
            />
          </Form.Item>
          <Form.Item label="Chọn vai trò" style={{ marginRight: 16 }}>
            <Select
              value={newRole}
              onChange={(value) => setNewRole(value)}
              placeholder="Chọn vai trò"
              style={{ width: 200 }}
            >
              <Select.Option value="customer">Khách hàng</Select.Option>
              <Select.Option value="provider">Nhà cung cấp</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật vai trò
            </Button>
          </Form.Item>
        </Form>

        
      </div>
      <Title level={4}>Duyệt yêu cầu làm Provider</Title>
      <Table
        columns={approveColumns}
        dataSource={randomCustomers}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default InvoiceTable2;

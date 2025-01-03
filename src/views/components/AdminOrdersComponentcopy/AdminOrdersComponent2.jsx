import React, { useEffect, useState } from "react";
import { Table, Select, Typography, Button, Input, Tag, Image, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../viewModel/invoiceActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const InvoiceTable = () => {
  const token = localStorage.getItem("token");

  let decodedToken = {};
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  } else {
    console.warn("Không có token để giải mã.");
  }

  const dispatch = useDispatch();
  const { invoice, loading } = useSelector((state) => state.invoice);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [localInvoice, setLocalInvoice] = useState([]); // State quản lý dữ liệu hóa đơn
console.log("HELLO",filteredData)
  let searchInput = null;

  useEffect(() => {
    dispatch(getAllOrders());
    if (invoice?.length > 0) {
      const userInvoices = invoice.filter(
        (inv) => inv?.serviceID?.providerID?.userID === decodedToken.userId
      );
      setFilteredData(userInvoices);
      setLocalInvoice(userInvoices); // Đồng bộ hóa dữ liệu vào localInvoice
    }
  }, [dispatch]);

  console.log(invoice)
  useEffect(() => {
    if (invoice?.length > 0) {
      const userInvoices = invoice.filter(
        (inv) => inv?.serviceID?.providerID?.userID === decodedToken.userId
      );
      setFilteredData(userInvoices);
      setLocalInvoice(userInvoices); // Đồng bộ hóa dữ liệu vào localInvoice
    }
  }, [invoice, decodedToken.userId]);

  const handleStatusChange = (value, recordId) => {
    const updatedInvoices = localInvoice.map((item) =>
      item._id === recordId ? { ...item, status: value } : item
    );
    setLocalInvoice(updatedInvoices);
    setFilteredData(updatedInvoices);
    message.success("Cập nhật trạng thái thành công!");
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const { Title } = Typography;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Tìm
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Xóa
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "invoiceID",
      key: "invoiceID",
      ...getColumnSearchProps("invoiceID"),
    },
    {
      title: "Ngày phát hành",
      dataIndex: "issueDate",
      key: "issueDate",
      render: (date) => date?.slice(0, 10),
      ...getColumnSearchProps("issueDate"),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceID",
      key: "serviceName",
      render: (serviceID) => serviceID?.serviceName || "Chưa có tên dịch vụ",
    },
    {
      title: "Loại phòng",
      dataIndex: "roomID",
      key: "roomType",
      render: (roomID) => roomID?.roomType || "Chưa có loại phòng",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => quantity || "Chưa có số lượng",
      ...getColumnSearchProps("quantity"),
    },
    {
      title: "Ngày nhận phòng",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (date) => date?.slice(0, 10),
      ...getColumnSearchProps("checkInDate"),
    },
    {
      title: "Ngày trả phòng",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (date) => date?.slice(0, 10),
      ...getColumnSearchProps("checkOutDate"),
    },
   
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record._id)}
          options={[
            { value: "chờ xác nhận", label: "Chờ xác nhận" },
            { value: "đã xác nhận", label: "Đã xác nhận" },
            { value: "đã hủy", label: "Đã hủy" },
            { value: "đã dùng", label: "Đã dùng" },
          ]}
        />
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "pictures",
      key: "pictures",
      render: (pictures) =>
        pictures && pictures.length > 0 ? (
          <Image.PreviewGroup>
            {pictures.map((picture, index) => (
              <Image
                key={index}
                width={50}
                src={picture}
                style={{ marginRight: 8 }}
              />
            ))}
          </Image.PreviewGroup>
        ) : (
          "Không có hình ảnh"
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button type="link" onClick={() => handleViewDetail(record._id)}>
            Xem
          </Button>
        </Tooltip>
      ),
    },
  ];

  const handleViewDetail = (id) => {
    console.log("Chi tiết hóa đơn:", id);
    // Xử lý logic hiển thị chi tiết hóa đơn
  };

  return (
    <div>
      <Title level={3}>Đơn hàng của bạn</Title>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default InvoiceTable;

import React, { useEffect, useState } from "react";
import { Table, Tag, Tooltip, Button, Image, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesByUserID } from "../../../viewModel/invoiceActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const { invoice, loading } = useSelector((state) => state.invoice);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(null);

  let searchInput = null;

  useEffect(() => {
    const userID = "6746c92c80b53a817395f3f6"; // ID cố định
    dispatch(getInvoicesByUserID(userID));
  }, [dispatch]);

  useEffect(() => {
    if (invoice?.length > 0) {
      setFilteredData(invoice || []);
    }
  }, [invoice]);

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
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `${amount?.toLocaleString()} VND`,
      ...getColumnSearchProps("totalAmount"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Chờ xác nhận", value: "chờ xác nhận" },
        { text: "Đã xác nhận", value: "đã xác nhận" },
        { text: "Đã hủy", value: "đã hủy" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag
          color={
            status === "chờ xác nhận"
              ? "orange"
              : status === "đã xác nhận"
              ? "blue"
              : "gray"
          }
        >
          {status}
        </Tag>
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
      <Title level={3}>Dịch vụ bạn đã đặt</Title>
    
    <Table
      columns={columns}
      dataSource={filteredData}
      rowKey="_id.$oid"
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
    </div>
  );
};

export default InvoiceTable;

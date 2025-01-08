import React, { useEffect, useState } from "react";
import { Table, Select, Typography, Button, Input, Tag, Image, Tooltip, message, notification, Rate, Form, Modal, InputNumber, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateInvoiceStatus } from "../../../viewModel/invoiceActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const InvoiceTable = () => {
  const token = localStorage.getItem("token");
 const [form] = Form.useForm();
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
  const [filteredData2, setFilteredData2] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [oke, setOke] = useState(true);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [localInvoice, setLocalInvoice] = useState([]); // State quản lý dữ liệu hóa đơn
console.log("HELLO",filteredData)
  let searchInput = null;
  console.log(invoice)
  useEffect(() => {
    dispatch(getAllOrders());
    if (invoice?.length > 0) {
      const userInvoices = invoice.filter(
        (inv) => inv?.serviceID?.providerID?.userID === decodedToken.userId
      );
      if (invoice?.length > 0) {
        const filteredInvoices = invoice.filter(item => item.invoiceType === 'hotel');
  
        console.log("VAIIIII",filteredInvoices)
        const filteredResult = filteredInvoices.map(invoice => ({
          hotel: invoice?.roomID?.hotelID,
          _id: invoice._id,
          invoiceID: invoice.invoiceID,
          issueDate: invoice.issueDate,
          serviceID: invoice.serviceID|| null,
          status: invoice.status,
          quantity: invoice.quantity,
          checkInDate:  invoice.checkInDate,
          checkOutDate: invoice.checkOutDate
         
          
      }));
        setFilteredData([...filteredResult].reverse());
  
        const filteredInvoices2 = invoice.filter(item => item.invoiceType === 'restaurant');
  
        const filteredResult2 = filteredInvoices2.map(invoice => ({
          _id: invoice._id,
          invoiceID: invoice.invoiceID,
          issueDate: invoice.issueDate,
          serviceID: invoice.serviceID|| null,
          status: invoice.status,
          arrivalDate: invoice.arrivalDate,
      arrivalTime: invoice.arrivalTime,
      adults: invoice.adults,
      children1: invoice.checkOutDate
          
      }));
  
        setFilteredData2([...filteredResult2].reverse());
  
      
      }
      setLocalInvoice(userInvoices); // Đồng bộ hóa dữ liệu vào localInvoice
    }
  }, [dispatch,oke]);

  console.log(invoice)
  useEffect(() => {
    if (invoice?.length > 0) {
      const userInvoices = invoice.filter(
        (inv) => inv?.serviceID?.providerID?.userID === decodedToken.userId
      );
      if (invoice?.length > 0) {
        const filteredInvoices = invoice.filter(item => item.invoiceType === 'hotel');
  
        console.log("VAIIIII",filteredInvoices)
        const filteredResult = filteredInvoices.map(invoice => ({
          hotel: invoice?.roomID?.hotelID,
          _id: invoice._id,
          invoiceID: invoice.invoiceID,
          issueDate: invoice.issueDate,
          serviceID: invoice.serviceID|| null,
          status: invoice.status,
          quantity: invoice.quantity,
          checkInDate:  invoice.checkInDate,
          checkOutDate: invoice.checkOutDate
          
      }));
     
        setFilteredData([...filteredResult].reverse());
  
        const filteredInvoices2 = invoice.filter(item => item.invoiceType === 'restaurant');
  
        const filteredResult2 = filteredInvoices2.map(invoice => ({
          _id: invoice._id,
          invoiceID: invoice.invoiceID,
          issueDate: invoice.issueDate,
          serviceID: invoice.serviceID|| null,
          status: invoice.status,
          arrivalDate: invoice.arrivalDate,
      arrivalTime: invoice.arrivalTime,
      adults: invoice.adults,
      children1: invoice.checkOutDate
          
      }));
  
        setFilteredData2([...filteredResult2].reverse());
  
      
      }
    }
  }, [invoice, decodedToken.userId,oke]);

  const handleStatusChange = (value, recordId) => {
    console.log("DLSDJFLDF",    value)
    dispatch(updateInvoiceStatus(recordId, value))
      .then(() => {
        setOke(!oke)
        notification.success({
          message: "Thành công",
          description: "Cập nhật trạng thái thành công!",
        });
      })
      .catch(() => {
        notification.error({
          message: "Lỗi",
          description: "Cập nhật trạng thái thất bại. Vui lòng thử lại.",
        });
      });
  };
  
  
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const [reviewMode, setReviewMode] = useState(false); // Phân biệt modal là để xem hay đánh giá
  const { Title } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
  const showReviewModal = (record, isViewMode = false) => {
    setSelectedRecord(record);
    setReviewMode(isViewMode);
    setIsModalOpen(true);
  };
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
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {record.status === "đã sử dụng" &&
                  (record.review ? (
                    <Tooltip title="Xem đánh giá">
                      <Button type="primary" onClick={() => showReviewModal(record, true)}>
                        Xem đánh giá
                      </Button>
                    </Tooltip>
                  ) : (
                      <div></div>
                  ))}
                <Button type="primary" onClick={() =>{ handleViewDetail(record.hotel); console.log(record)} }>
                  Xem dịch vụ
                </Button>
              </div>
            ),
          
    },
  ];

console.log("VLLLLLL",filteredData)
  const columns2 = [
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
      title: "Ngày đến",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      render: (date) => date?.slice(0, 10),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <DatePicker.RangePicker
            onChange={(dates) => {
              setSelectedKeys(
                dates
                  ? [
                      `${dates[0]?.format("YYYY-MM-DD")},${dates[1]?.format(
                        "YYYY-MM-DD"
                      )}`,
                    ]
                  : []
              );
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: "100%" }}
          >
            Áp dụng
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const [start, end] = value.split(",");
        const date = record.arrivalDate?.slice(0, 10);
        return date >= start && date <= end;
      },
    },
    {
      title: "Thời gian đến",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      filters: [
        { text: "Buổi sáng (00:00 - 12:00)", value: "morning" },
        { text: "Buổi chiều (12:00 - 18:00)", value: "afternoon" },
        { text: "Buổi tối (18:00 - 23:59)", value: "evening" },
      ],
      onFilter: (value, record) => {
        const time = record.arrivalTime?.split(":");
        const hour = parseInt(time[0], 10);
        if (value === "morning") return hour >= 0 && hour < 12;
        if (value === "afternoon") return hour >= 12 && hour < 18;
        if (value === "evening") return hour >= 18 && hour < 24;
        return false;
      },
    },
    {
      title: "Số người lớn",
      dataIndex: "adults",
      key: "adults",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            min={1}
            placeholder="Từ"
            style={{ marginBottom: 8, display: "block", width: "100%" }}
            onChange={(value) => {
              const range = selectedKeys[0]?.split(",") || ["", ""];
              setSelectedKeys([`${value},${range[1] || ""}`]);
            }}
          />
          <InputNumber
            min={1}
            placeholder="Đến"
            style={{ marginBottom: 8, display: "block", width: "100%" }}
            onChange={(value) => {
              const range = selectedKeys[0]?.split(",") || ["", ""];
              setSelectedKeys([`${range[0] || ""},${value}`]);
            }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: "100%" }}
          >
            Áp dụng
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const [min, max] = value.split(",");
        return (
          record.adults >= (parseInt(min, 10) || 0) &&
          record.adults <= (parseInt(max, 10) || Infinity)
        );
      },
    },
    {
      title: "Số trẻ em",
      dataIndex: "children1",
      key: "children1",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            min={0}
            placeholder="Từ"
            style={{ marginBottom: 8, display: "block", width: "100%" }}
            onChange={(value) => {
              const range = selectedKeys[0]?.split(",") || ["", ""];
              setSelectedKeys([`${value},${range[1] || ""}`]);
            }}
          />
          <InputNumber
            min={0}
            placeholder="Đến"
            style={{ marginBottom: 8, display: "block", width: "100%" }}
            onChange={(value) => {
              const range = selectedKeys[0]?.split(",") || ["", ""];
              setSelectedKeys([`${range[0] || ""},${value}`]);
            }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: "100%" }}
          >
            Áp dụng
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const [min, max] = value.split(",");
        return (
          record.children1 >= (parseInt(min, 10) || 0) &&
          record.children1 <= (parseInt(max, 10) || Infinity)
        );
      },
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {record.status === "đã sử dụng" &&
            (record.review ? (
              <Tooltip title="Xem đánh giá">
                <Button type="primary" onClick={() => showReviewModal(record, true)}>
                  Xem đánh giá
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Đánh giá">
                <Button type="primary" onClick={() => showReviewModal(record, false)}>
                  Đánh giá
                </Button>
              </Tooltip>
            ))}
          <Button type="primary" onClick={() =>{ handleViewDetail(record.roomID.hotelID); console.log(record)} }>
            Xem dịch vụ
          </Button>
        </div>
      ),
    },
    
  ];

const navigate = useNavigate();
  const handleViewDetail = (id) => {
    if(id){
      navigate(`/detail/${id}`);
    }
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
        title={() => <h3>Khách sạn</h3>}
      />

<Table
        columns={columns2}
        dataSource={filteredData2}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        title={() => <h3>Nhà hàng</h3>}
      />

<Modal
  title={reviewMode ? "Thông tin đánh giá" : "Đánh giá dịch vụ"}
  open={isModalOpen}
  onCancel={handleCancel}
  footer={
    reviewMode
      ? [
          <Button key="cancel" onClick={handleCancel}>
            Thoát
          </Button>,
         
        ]  // Không hiển thị footer khi reviewMode là true
      : [
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Gửi
          </Button>,
        ]
  }
>
  {reviewMode ? (
    <div>
      <Typography.Text>Số sao: </Typography.Text>
      <Rate disabled value={selectedRecord?.review?.stars} />
      <Typography.Paragraph>
        Nhận xét: {selectedRecord?.review?.positiveComment || "Không có"}
      </Typography.Paragraph>
    </div>
  ) : (
    <div></div>
  )}
</Modal>
    </div>
  );
};

export default InvoiceTable;

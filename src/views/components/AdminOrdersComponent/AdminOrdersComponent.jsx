
import React, { useEffect, useState } from "react"; 
import { Table, Tag, Tooltip, Button, Image, Input, Typography, Modal, Rate, Form, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesByUserID } from "../../../viewModel/invoiceActions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { addReview } from "../../../viewModel/serviceActions";

const InvoiceTable = () => {
  const token = localStorage.getItem("token");
  let decodedToken = token ? jwtDecode(token) : {};
  const [reviewMode, setReviewMode] = useState(false); // Phân biệt modal là để xem hay đánh giá
  const dispatch = useDispatch();
  const { invoice, loading } = useSelector((state) => state.invoice);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [ok, setOK] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let searchInput = null;

  // Lấy danh sách hóa đơn dựa trên userID
  useEffect(() => {
    dispatch(getInvoicesByUserID(decodedToken?.userId));
    console.log("HELLLO")
  }, [dispatch,ok]);

  // Cập nhật dữ liệu khi nhận được danh sách hóa đơn
  useEffect(() => {
    if (invoice?.length > 0) {
      setFilteredData([...invoice].reverse());
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

  const showReviewModal = (record, isViewMode = false) => {
    setSelectedRecord(record);
    setReviewMode(isViewMode);
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleReviewSubmit = (values) => {
    console.log("Đánh giá đã gửi:", {
      ...values,
      targetID: selectedRecord?.roomID?._id,
      userID: decodedToken?.userId,
      date: new Date().toISOString(),
    });

    const reviewData ={
      invoiceID: selectedRecord?._id,
      userID: decodedToken?.userId,
    positiveComment: values.positiveComment,
   
    stars: values.stars,
    targetID: selectedRecord?.roomID?._id,
  
    }

    dispatch(addReview(selectedRecord?.serviceID?._id, reviewData))
    .then(() => {
      notification.success({
        message: "Thành công",
        description: "Đánh giá của bạn đã được gửi thành công!",
        duration: 3, // Thời gian hiển thị thông báo (giây)
      });
      // Nếu gửi đánh giá thành công, đổi trạng thái 'ok' để fetch lại dữ liệu
      setOK((prev) => !prev);
    })
    .catch((error) => {
      console.error("Lỗi khi gửi đánh giá:", error);
    })
    .finally(() => {
      setIsModalOpen(false);
      form.resetFields();
    });
    setIsModalOpen(false);
    form.resetFields();
   
  };

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
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Xóa
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
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
console.log("CHONNN",selectedRecord)
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
        { text: "Đã sử dụng", value: "đã sử dụng" },
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

  const handleViewDetail = (id) => {
    if(id){
      navigate(`/detail/${id}`);
    }
  };

  return (
    <div style={{marginTop:'50px'}}>
      <Typography.Title level={3}>Dịch vụ bạn đã đặt</Typography.Title>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id.$oid"
        loading={loading}
        pagination={{ pageSize: 5 }}
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
    <Form form={form} onFinish={handleReviewSubmit}>
      <Form.Item
        name="stars"
        label="Số sao"
        rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
      >
        <Rate />
      </Form.Item>
      <Form.Item name="positiveComment" label="Nhận xét">
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  )}
</Modal>

    </div>
  );
};

export default InvoiceTable;

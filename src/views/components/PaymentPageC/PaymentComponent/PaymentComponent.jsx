import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Card, message, Upload, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../../../viewModel/hotelAction';
import { getUserByUserID } from '../../../../viewModel/userActions';
import { PlusOneOutlined } from '@mui/icons-material';
import { uploadFile } from '../../../../model/uploadSlice';
import { createInvoice } from '../../../../viewModel/invoiceActions';
import { jwtDecode } from 'jwt-decode';

const { TextArea } = Input;

const PaymentComponent = ({ products }) => {
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Ship Cod");
  const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image URL
  const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
const token = localStorage.getItem("token");

const res = localStorage.getItem('bookingData');
let deRes = {}
if(res){
  deRes = JSON.parse(res);
} 
console.log("Ma ", deRes)

let decodedToken ={}

  if (token) {
    decodedToken = jwtDecode(token);
   // console.log("Thông tin giải mã token:",decodedToken );
  } else {
    console.log("Không có token để giải mã.");
  }
  const transformData = (inputArray) =>
    inputArray?.map((item) => ({
      idproduct: item._id,
      colorid: item.colorid,
      idattributevalue: item.attributeId,
      price: item.price,
      number: item.quantity,
    }));

  const newCart = transformData(localCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    dispatch(getUserByUserID(decodedToken.userID));
  }, [dispatch, error]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month =  String(d.getDate()).padStart(2, "0");  // Tháng 0-indexed
    const day = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
console.log("USER" ,user)
console.log("OR",decodedToken)
const handleSubmit = async (e) => {
  e.preventDefault();

  // Kiểm tra xem người dùng đã tải lên ảnh hay chưa
  if (!uploadedImage) {
    message.warning("Vui lòng tải lên ảnh thanh toán trước khi đặt hàng!");
    return;
  }

  const invoiceData = {
    invoiceID: `INV-${Date.now()}`, // Tạo mã hóa đơn tự động
    userID: user?._id, // ID người dùng
    serviceID: products?.service?._id, // ID dịch vụ
    quantity: products?.numberBooked || 1, // Số lượng đặt
    totalAmount: (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length || 0), // Tổng tiền
    issueDate: new Date().toISOString(), // Ngày tạo
    paymentStatus: "unpaid", // Trạng thái thanh toán mặc định
    roomID: products?.roomInfo?._id, // ID phòng
    checkInDate: formatDate(date?.[0]), // Ngày check-in
    checkOutDate: formatDate(date?.[date?.length - 1]), // Ngày check-out
    status: "chờ xác nhận", // Trạng thái mặc định
    pictures: uploadedImage, // Ảnh tải lên
    orderNote, // Ghi chú đơn hàng

    invoiceType: "hotel", // Loại hóa đơn
    arrivalDate: deRes.arrivalDate, // Ngày đến
    arrivalTime: deRes.arrivalTime,
    adults: deRes.adults, // Số lượng người lớn
    children: deRes.children, // Số lượng trẻ em
  };

  try {
    await dispatch(createInvoice(invoiceData));
    message.success("Đặt hàng thành công!");
    navigate(`/user/${decodedToken.userID}`);
  } catch (error) {
    message.error(`Lỗi đặt hàng: ${error}`);
  }
};

const handleSubmit2 = async (e) => {
  e.preventDefault();

  
  const today = new Date(); 
  const invoiceData = {
    invoiceID: `INV-${Date.now()}`, // Tạo mã hóa đơn tự động
    userID: user?._id, // ID người dùng
    serviceID: products?.service?._id, // ID dịch vụ
    quantity: products?.numberBooked || 1, // Số lượng đặt
    totalAmount: (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length || 0), // Tổng tiền
    issueDate: new Date().toISOString(), // Ngày tạo
    paymentStatus: "unpaid", // Trạng thái thanh toán mặc định
    roomID: products?.roomInfo?._id, // ID phòng
  checkInDate : date?.[0] ? formatDate(date[0]) : formatDate(today), // Nếu có giá trị trong `date`, lấy ngày đầu tiên; nếu không, lấy ngày hôm nay
checkOutDate : date?.[date?.length - 1] ? formatDate(date[date.length - 1]) : formatDate(today), // Nếu có giá trị trong `date`, lấy ngày cuối; nếu không, lấy ngày hôm nay
    status: "chờ xác nhận", // Trạng thái mặc định
    pictures: uploadedImage, // Ảnh tải lên
    orderNote, // Ghi chú đơn hàng

    invoiceType: "restaurant", // Loại hóa đơn
  arrivalDate: deRes.arrivalDate, // Ngày đến
  arrivalTime: deRes.arrivalTime,
  adults: deRes.adults, // Số lượng người lớn
  children: deRes.children, // Số lượng trẻ em
  };

  try {
    await dispatch(createInvoice(invoiceData));
    message.success("Đặt bàn thành công!");
    navigate(`/user/${decodedToken.userID}`);
  } catch (error) {
    message.error(`Lỗi đặt hàng: ${error}`);
  }
};
    
  

  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      // Dispatch action upload file từ Redux slice
      const response = await dispatch(uploadFile(file));

      // Lấy URL từ dữ liệu trả về
      const uploadedFileUrl = response.payload.data.path;
      console.log('URL ảnh đã upload:', uploadedFileUrl);

      // Hiển thị thông báo thành công
      notification.success({
        message: 'Upload thành công!',
        description: 'Ảnh đã được tải lên Cloudinary.',
      });

      // Cập nhật lại ảnh đã tải lên (thay thế ảnh cũ nếu có)
      setUploadedImage(uploadedFileUrl); // Cập nhật state với URL ảnh mới

      onSuccess();
    } catch (error) {
      notification.error({
        message: 'Upload thất bại!',
        description: error.message,
      });
      onError(error);
    }
  };
  const date = useSelector((state) => state.date.selectedDate);  // Lấy giá trị date từ Redux
  if(products?.service?.type==! "restaurant"){
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
      <Card title="Thông tin đơn hàng" bordered style={{ width: '50%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Thông tin người đặt */}
          <Card title="Thông tin người đặt" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên: {user?.fullName}</span>
              <span>Số điện thoại: {user?.phoneNumber}</span>
              <span>Email: {user?.email}</span>
              <TextArea
                rows={2}
                placeholder="Ghi chú đơn hàng (tùy chọn)"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </Space>
          </Card>

          {/* Thông tin dịch vụ */}
          <Card title="Thông tin dịch vụ" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên dịch vụ: {products?.service?.serviceName}</span>
              <span>Địa chỉ: {products?.service?.locationID?.locationName}</span>
            </Space>
          </Card>

          {/* Thông tin nhà cung cấp */}
          <Card title="Thông tin nhà cung cấp" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên: {products?.provider?.fullName}</span>
              <span>Số điện thoại: {products?.provider?.phoneNumber}</span>
              <span>Email: {products?.provider?.email}</span>
            </Space>
          </Card>


          {/* Phòng */}
          <Card title="Phòng" bordered>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={products?.roomInfo?.image}
                  alt="Room"
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <div style={{ marginLeft: 10 }}>
                  <p>{products?.roomInfo?.name}</p>
                  <h3>{products?.roomInfo?.discount?.toLocaleString('vi-VN')} ₫</h3>
                </div>
              </div>
              <p style={{ margin: 0 }}>Số lượng: {products?.numberBooked}</p>
              
              
            </div>
              { date && <p style={{ margin: 0 }}>Từ 8h ngày: {date[0]} đến 8h ngày: {date[date?.length-1]} ({date?.length - 1 > 0 ? date?.length -1 :0 } ngày)</p>}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}
            >
              <h3>
                Tổng cộng:{' '}
                {(
                  (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length - 1 > 0 ? date?.length -1 :0)
                ).toLocaleString('vi-VN')} ₫
              </h3>
            </div>
          </Card>
          <Card title="Thông tin thanh toán" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Ngân hàng: {products?.service?.providerID?.bankName             }</span>
              <span>Số tài khoản: {products?.service?.providerID?.accountNumber}</span>
              <span>Tên tài khoản: {products?.service?.providerID?.accountName }</span>
              <span>Số tiền cần thanh toán: {(
                  (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length - 1 > 0 ? date?.length -1 :0  )
                ).toLocaleString('vi-VN')} ₫</span>
            </Space>
          </Card>

          {/* Phương thức thanh toán */}
          <Card title="Thanh toán" bordered>
            <Upload
              style={{ marginBottom: "10px" }}
              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            //  beforeUpload={() => !uploadedImage} // Không cho phép tải ảnh nếu đã có ảnh
            >
              <Button icon={<PlusOneOutlined />} data-testid="inputanh">
                Tải ảnh chuyển khoản thanh toán lên (Đơn hàng sẽ được duyệt trong 1 ngày)
              </Button>
            </Upload>

            {uploadedImage && (
              <div style={{ marginTop: 10 }}>
                <p>Ảnh đã tải lên:</p>
                <img src={uploadedImage} alt="Uploaded" style={{ width: 150, height: 150, objectFit: 'cover' }} />
              </div>
            )}

            <Button type="primary" style={{ width: '100%', marginTop: '30px' }} onClick={handleSubmit}>
              ĐẶT HÀNG
            </Button>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
else {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
      <Card title="Thông tin đặt chỗ" bordered style={{ width: '50%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Thông tin người đặt */}
          <Card title="Thông tin người đặt" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên: {user?.fullName}</span>
              <span>Số điện thoại: {user?.phoneNumber}</span>
              <span>Email: {user?.email}</span>
              <TextArea
                rows={2}
                placeholder="Ghi chú đơn hàng (tùy chọn)"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </Space>
          </Card>

          {/* Thông tin dịch vụ */}
          <Card title="Thông tin dịch vụ" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên dịch vụ: {products?.service?.serviceName}</span>
              <span>Địa chỉ: {products?.service?.locationID?.locationName}</span>
              deRes
              <span>Sô người lớn: {deRes.adults}</span>
              <span>Sô trẻ em: {deRes.children}</span>
              <span>Ngày đến: {deRes.arrivalDate}</span>
              <span>Giờ đến: {deRes.arrivalTime}</span>
              
            </Space>
          </Card>

          {/* Thông tin nhà cung cấp */}
          <Card title="Thông tin nhà cung cấp" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Tên: {products?.provider?.fullName}</span>
              <span>Số điện thoại: {products?.provider?.phoneNumber}</span>
              <span>Email: {products?.provider?.email}</span>
            </Space>
          </Card>


          {/* Phòng */}
          {/* <Card title="Phòng" bordered>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={products?.roomInfo?.image}
                  alt="Room"
                  style={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <div style={{ marginLeft: 10 }}>
                  <p>{products?.roomInfo?.name}</p>
                  <h3>{products?.roomInfo?.discount?.toLocaleString('vi-VN')} ₫</h3>
                </div>
              </div>
              <p style={{ margin: 0 }}>Số lượng: {products?.numberBooked}</p>
              
              
            </div>
              { date && <p style={{ margin: 0 }}>Từ 8h ngày: {date[0]} đến 8h ngày: {date[date?.length-1]} ({date?.length - 1 > 0 ? date?.length -1 :0 } ngày)</p>}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}
            >
              <h3>
                Tổng cộng:{' '}
                {(
                  (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length - 1 > 0 ? date?.length -1 :0)
                ).toLocaleString('vi-VN')} ₫
              </h3>
            </div>
          </Card> */}
          {/* <Card title="Thông tin thanh toán" bordered>
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Ngân hàng: {products?.service?.providerID?.bankName             }</span>
              <span>Số tài khoản: {products?.service?.providerID?.accountNumber}</span>
              <span>Tên tài khoản: {products?.service?.providerID?.accountName }</span>
              <span>Số tiền cần thanh toán: {(
                  (products?.roomInfo?.discount || 0) * (products?.numberBooked || 0) * (date?.length - 1 > 0 ? date?.length -1 :0  )
                ).toLocaleString('vi-VN')} ₫</span>
            </Space>
          </Card> */}

          {/* Phương thức thanh toán */}
          <Card>
            {/* <Upload
              style={{ marginBottom: "10px" }}
              customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            //  beforeUpload={() => !uploadedImage} // Không cho phép tải ảnh nếu đã có ảnh
            >
              <Button icon={<PlusOneOutlined />} data-testid="inputanh">
                Tải ảnh chuyển khoản thanh toán lên (Đơn hàng sẽ được duyệt trong 1 ngày)
              </Button>
            </Upload>

            {uploadedImage && (
              <div style={{ marginTop: 10 }}>
                <p>Ảnh đã tải lên:</p>
                <img src={uploadedImage} alt="Uploaded" style={{ width: 150, height: 150, objectFit: 'cover' }} />
              </div>
            )} */}

            <Button type="primary" style={{ width: '100%', marginTop: '30px' }} onClick={handleSubmit2}>
              ĐẶT BÀN
            </Button>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
};

export default PaymentComponent;

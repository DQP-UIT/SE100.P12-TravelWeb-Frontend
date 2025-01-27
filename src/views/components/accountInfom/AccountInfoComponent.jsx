import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Select, DatePicker, Form, Typography, Row, Col, message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchUserById, updateUser, updatePassword } from '../../../redux/Slicer/userSlice';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { clearErrors, getUserByUserID, updateUserById } from '../../../viewModel/userActions';
//import {validateUserInfoModule} from "../../../modules/validateUserInfoModule"

const { Title } = Typography;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 15px;
  background-color: #1DA0F1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
  color: #fff;
  &:hover {
    background-color: #d3541b;
    border-color: #1DA0F1;
  }
`;
const validateUsername = (username) => {

  let capnhat= false;
  // Kiểm tra nếu tên chứa chữ số
  if (/\d/.test(username)) {
    return "Tên không được chứa chữ số.";
  }

  // Định nghĩa dãy ký tự hợp lệ (chữ cái không dấu và có dấu, khoảng trắng)
  const specialChars = /[!@#$%^~&*(),.?":{}|<>/+=_\-\\|;'\[\]<>`]/;

  // Kiểm tra nếu tên chứa ký tự đặc biệt
  if (specialChars.test(username)) {
    return "Tên không được chứa ký tự đặc biệt.";
  }

  // Kiểm tra độ dài tên
  if (username.length < 2) {
    return "Tên phải có ít nhất 2 ký tự.";
  }
  if (username.length > 50) {
    return "Tên không được vượt quá 50 ký tự.";
  }

  return ""; // Tên hợp lệ
};




const validatePhonenumber = (phoneNumber) => {
  if (/[^0-9]/.test(phoneNumber)) {
    return "Số điện thoại chỉ được chứa chữ số.";
  }
  if (phoneNumber.length < 10) {
    return "Số điện thoại phải có ít nhất 10 chữ số.";
  }
  if (phoneNumber.length > 10) {
    return "Số điện thoại không được vượt quá 10 chữ số.";
  }
  return ""; // Trả về chuỗi rỗng nếu hợp lệ
};


const validateAddress = (address) => {
  if (address.length < 10) {
    return "Địa chỉ phải có ít nhất 10 ký tự.";
  }
  if (address.length > 500) {
    return "Địa chỉ không được vượt quá 500 ký tự.";
  }
  return ""; // Địa chỉ hợp lệ
};

const validateBirthDay = (birthDay) => {
  const today = new Date(); // Ngày hiện tại
  const birthDate = new Date(birthDay); // Ngày sinh

  if (birthDate >= today) {
    return "Ngày sinh phải trước ngày hôm nay.";
  }
  return ""; // Ngày sinh hợp lệ
};


const AccountInfoComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // Để kiểm soát trạng thái loading khi cập nhật
console.log(id)



  const {  error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearErrors());
    }

    dispatch(getUserByUserID(id));
  }, [dispatch,loading]);

  console.log(user)


  const [form] = Form.useForm(); // Sử dụng form instance của Ant Design
  const [passwordForm] = Form.useForm(); // Form cho phần đổi mật khẩu
 
const [errorMessage, setErrorMessage] = useState('');
  
  
  const [loadingPassword, setLoadingPassword] = useState(false); // Để kiểm soát trạng thái loading khi đổi mật khẩu
 // const { user, status, error } = useSelector((state) => state.user);
  // Gọi API lấy thông tin user khi load trang
  // useEffect(() => {
  //   const token = localStorage.getItem('token'); 
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token); 
  //       if (decodedToken?.userId) {
  //         dispatch(fetchUserById(decodedToken.userId));
  //       } else {
  //         console.warn('Không tìm thấy userId trong token.');
  //       }
  //     } catch (error) {
  //       console.error('Lỗi khi giải mã token:', error);
  //     }
  //   } else {
  //     console.warn('Không tìm thấy token trong LocalStorage.');
  //   }
  // }, [dispatch]);

  //Cập nhật giá trị trong form khi `user` thay đổi
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        usern: user?.userName ||"",
        username: user?.fullName || '',
        phoneNumber: user?.phoneNumber || '',
        gender: user?.gender || '',
        dateOfBirth: user?.birthDate ? moment(user.birthDate) : null,
        email: user?.email || ""
      });
    }
  }, [user, form]);

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = async () => {
    setLoading(true); // Bắt đầu loading khi thực hiện cập nhật
    try {
      const values = await form.validateFields(); // Validate các trường trong form
      const userId = user?._id; // Lấy userId từ dữ liệu user đã có


    
  
  
      if (userId) {
        const updatedUserData = {
          ...user,
          birthDate: values?.dateOfBirth || "",
          fullName: values?.username || "",
          phoneNumber: values?.phoneNumber || ""

        };
  
        // Gửi thông tin cập nhật tới API
        dispatch(updateUserById(userId, updatedUserData))
        message.success("Cập nhật thông tin thành công");
      }

      
    } catch (error) {
      console.error("Cập nhật thông tin thất bại:", error);
      message.error("Cập nhật thông tin thất bại");
    } finally {
      setLoading(false); // Dừng loading khi đã xong
    }
  };

  // // Hàm xử lý đổi mật khẩu
  // const handleChangePassword = async () => {
  //   setLoadingPassword(true); // Bắt đầu loading khi đổi mật khẩu
  //   try {
  //     const values = await passwordForm.validateFields(); // Validate các trường trong form đổi mật khẩu
  //     if (values.newPassword !== values.confirmPassword) {
  //       message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
  //       return;
  //     }
      
  //     const token = localStorage.getItem('token');
  //     const decodedToken = jwtDecode(token);
  //     const userId = decodedToken.userId;


  //     console.log(values.oldPassword , values.newPassword)
  //     // Gửi yêu cầu đổi mật khẩu
  //     dispatch(updatePassword({ userId, currentPassword: values.oldPassword, newPassword: values.newPassword }))
  //       .unwrap()
  //       .then(() => {
  //         message.success("Đổi mật khẩu thành công!");
  //       })
  //       .catch(() => {
  //         message.error("Đổi mật khẩu thất bại!");
  //       });
  //   } catch (error) {
  //     console.error("Đổi mật khẩu thất bại:", error);
  //     message.error("Đổi mật khẩu thất bại!");
  //   } finally {
  //     setLoadingPassword(false); // Dừng loading khi đã xong
  //   }
  // };
//console.log(user)


  return (
    <Container>
      <Title level={3}>Thông tin tài khoản</Title>
      <Form 
        form={form} 
        layout="vertical"
        initialValues={{
          address: '',
          username: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: null,
        }}
      >
        <Form.Item label="Tên đăng nhập" name="usern">
          <Input  disabled />
        </Form.Item> 

        <Form.Item label="Họ tên" name="username">
          <Input placeholder="Họ tên" />
        </Form.Item>
        
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item label="Email" name="email">
  <Input disabled />
</Form.Item>

        <Form.Item label="Ngày sinh" name="dateOfBirth">
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                placeholder="Chọn ngày sinh"
              />
            </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            {/* <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính">
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
              </Select>
            </Form.Item> */}
          </Col>
          <Col span={12}>
            
          </Col>
        </Row>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <StyledButton 
          type="primary" 
          loading={loading || status === 'loading'} // Hiển thị loading nếu đang cập nhật
          onClick={handleUpdate}
        >
          CẬP NHẬT
        </StyledButton>
       
      </Form>

      {/* <Title level={4} style={{ marginTop: '30px' }}>Đổi mật khẩu</Title>
      <Form form={passwordForm} layout="vertical">
        <Form.Item 
          label="Mật khẩu hiện tại" 
          name="oldPassword" 
          rules={[{ required: true, message: 'Mật khẩu hiện tại là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item 
          label="Mật khẩu mới" 
          name="newPassword" 
          rules={[{ required: true, message: 'Mật khẩu mới là bắt buộc!' }]}>
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item 
          label="Nhập lại mật khẩu mới" 
          name="confirmPassword" 
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}>
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
        <StyledButton 
          type="primary" 
          loading={loadingPassword} 
         // onClick={handleChangePassword}
        >
          ĐỔI MẬT KHẨU
        </StyledButton>
      </Form> */}
    </Container>
  );
};

export default AccountInfoComponent;

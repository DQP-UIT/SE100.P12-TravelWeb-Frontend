import React, { useState } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  PictureOutlined,
  PercentageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  FileTextOutlined,
  FolderOutlined,
  AreaChartOutlined,
  SolutionOutlined,
  ShoppingOutlined
} from '@ant-design/icons';


import { Avatar, Button, Col, Image, Row, Typography } from 'antd';

import { AdminMenu } from './style';
import Logo from '../../../assets/Logo.svg';

// import AdminDashboardComponent from '../../components/AdminPageC/AdminDashboardComponent/AdminDashboardComponent';
// import AdminOrdersComponent from '../../components/AdminPageC/AdminOrdersComponent/AdminOrdersComponent';
// import CatagoryItemComponent from '../../components/AdminPageC/CatagoryItemComponent/CatagoryItemComponent';
// import AdminProductComponent from '../../components/AdminPageC/AdminProductComponent/AdminProductComponent';
// import AdminProductDetail from '../../components/AdminPageC/AdminProductDetail/AdminProductDetail';
// import AdminManageAccount from '../../components/AdminPageC/AdminManageAccount/AdminManageAccount';
// import AdminReport from '../../components/AdminPageC/AdminReport/AdminReport';

import AccountInfoComponent from '../../components/accountInfom/AccountInfoComponent';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { ShopOutlined } from '@mui/icons-material';
import CatagoryItemComponent from '../../components/CatagoryItemComponent/CatagoryItemComponent';
import AdminOrdersComponent from '../../components/AdminOrdersComponent/AdminOrdersComponent';
import AdminOrdersComponent2 from '../../components/AdminOrdersComponentcopy/AdminOrdersComponent2';
import ReviewAd from '../../components/reviewAd/ReviewAd';

import AdminReport2 from '../../components/adminReport2/AdminReport2';
import AdminCustomer from '../../components/adminCustomer/AdminCustomer'
import ProviderAdmin from '../../components/providerAdmin/ProviderAdmin'
import Title from 'antd/es/skeleton/Title';


const itemMenu = [

//  {
//     label:  "Trang cá nhân", 
//     key: "user", 
//     icon:  <UserOutlined />, 
//     children: [
//       { label: "Thông tin cá nhân", key: "userInfo", icon: <DashboardOutlined />, component: AccountInfoComponent ,allowedRoles: ["Admin"]},
//       { label: "Dịch vụ bạn đã đặt", key: "serviceU", icon: <ShoppingOutlined />, component: AdminOrdersComponent ,allowedRoles: ["Admin"]},
//       { label: "Thống kê đánh giá", key: "reportU", icon: < AreaChartOutlined />, component: ReviewAd ,allowedRoles: ["Admin"]},
//     ],allowedRoles: ["Admin", "WarehouseStaff"],
//     testid: "menu-products2"
//   },
//   {
//     label:  "Nhà cung cấp", 
//     key: "provider", 
//     icon:<ShopOutlined />, 
//     children: [
     
//       { label: "Đơn hàng của bạn", key: "order", icon: <FileTextOutlined/>, component: AdminOrdersComponent2 ,allowedRoles: ["Admin"]},
//       { label: "Dịch vụ bạn cung cấp", key: "serviceP", icon: < ProductOutlined />, component: CatagoryItemComponent ,allowedRoles: ["Admin"]},
//       { label: "Thống kê", key: "reportP", icon: < AreaChartOutlined />, component: AdminReport ,allowedRoles: ["Admin"]},
//     ],allowedRoles: ["Admin", "WarehouseStaff"],
//     testid: "menu-products2"
//   },


  
   { label: "Quản lý tài khoản", key: "account", icon: <UserOutlined />, component: AdminCustomer },
   { label: "Quản lý nhà cung cấp", key: "provider",   icon: <FileTextOutlined />, component: ProviderAdmin },
   { label: "Thống kê", key: "report", icon: <AreaChartOutlined />, component: AdminReport2 },
  // {
  //   label: "Sản phẩm", 
  //   key: "products", 
  //   icon: <GiftOutlined />, 
  //   children: [
  //     { label: "Vợt", key: "votp", icon: <GiftOutlined />, component: AdminProductComponent ,testid: "menu-votp2"},
  //     { label: "Giày", key: "giayp", icon: <GiftOutlined />, component: AdminProductComponent,testid: "menu-giayp2" },
  //     { label: "Áo", key: "aop", icon: <GiftOutlined />, component: AdminProductComponent, testid: "menu-aop2"},
  //     { label: "Váy", key: "vayp", icon: <GiftOutlined />, component: AdminProductComponent },
  //     { label: "Quần", key: "quanp", icon: <GiftOutlined />, component: AdminProductComponent },
  //     { label: "Túi vợt", key: "tui_votp", icon: <GiftOutlined />, component: AdminProductComponent },
  //     { label: "Balo", key: "ba_lop", icon: <GiftOutlined />, component: AdminProductComponent },
  //     { label: "Phụ kiện", key: "phu_kienp", icon: <GiftOutlined />, component: AdminProductComponent }
  //   ],allowedRoles: ["Admin", "WarehouseStaff"],
  //   testid: "menu-products2"
  // },
  // {
  //   label: "Danh mục", 
  //   key: "category",  
  //   icon: <ProductOutlined />, 
  //   children: [
  //     { label: "Vợt", key: "vot", icon: <ProductOutlined />, component: CatagoryItemComponent ,testid: "menu-votp"},
  //     { label: "Giày", key: "giay", icon: <ProductOutlined />, component: CatagoryItemComponent ,testid: "menu-giayp"},
  //     { label: "Áo", key: "ao", icon: <ProductOutlined />, component: CatagoryItemComponent },
  //     { label: "Váy", key: "vay", icon: <ProductOutlined />, component: CatagoryItemComponent },
  //     { label: "Quần", key: "quan", icon: <ProductOutlined />, component: CatagoryItemComponent },
  //     { label: "Túi vợt", key: "tui_vot", icon: <ProductOutlined />, component: CatagoryItemComponent },
  //     { label: "Balo", key: "ba_lo", icon: <ProductOutlined />, component: CatagoryItemComponent },
  //     { label: "Phụ kiện", key: "phu_kien", icon: <ProductOutlined />, component: CatagoryItemComponent }
  //   ],allowedRoles: ["Admin", "WarehouseStaff"],
  //   testid: "menu-products"
  // },
  // { label: "Tài khoản người dùng", key: "accounts", icon: <UserOutlined />,component: AdminManageAccount,allowedRoles: ["Admin"]},
  // // { label: "Doanh thu", key: "income", icon: <DollarCircleOutlined /> , component: AdminReport,allowedRoles: ["Admin"]},
  // // { label: "Giao diện & Hình ảnh", key: "interfaces", icon: <PictureOutlined />,allowedRoles: ["Admin"]},
];

// Hàm tìm component và trả về cả component và title


const UserNew = () => {
  const { Title } = Typography;
  const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
    let decodedToken ={}
    if (token) {
      decodedToken = jwtDecode(token);
      console.log(decodedToken)
     // console.log("Thông tin giải mã token:",decodedToken );
    } else {
      console.log("Không có token để giải mã.");
    }


    // const filterMenuByRole = (menuItems, role) => {
    //   return menuItems
    //     .filter(item => {
    //       if (item.allowedRoles && !item.allowedRoles.includes(role)) {
    //         return false;
    //       }
    //       return true;
    //     })
    //     .map(item => {
    //       if (item.children) {
    //         return {
    //           ...item,
    //           children: filterMenuByRole(item.children, role),
    //         };
    //       }
    //       return item;
    //     });
    // };
  
    const role = decodedToken.role || 'Guest'; // Vai trò mặc định nếu không có role
    const filteredMenu = itemMenu
    //filterMenuByRole(itemMenu, role);

let keyyy = "account"


  if(role === "Seller"){
    keyyy = "orders"
  }
  else if (role === "WarehouseStaff"){
 keyyy = "votp"
  }
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState(keyyy);
  const [selectedRow, setSelectedRow] = useState(null); // Thêm state mới

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const changeKey = (e) => {
    setSelectedKey(e.key);
    setSelectedRow(null); // Reset selectedRow mỗi khi chọn mục mới
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row); // Cập nhật hàng được chọn
  };

  



    const findComponentByKey = (key) => {
      for (let item of filteredMenu) {
        if (item.key === key) {
          return { component: item.component, title: item.label };
        }
        if (item.children) {
          const childItem = item.children.find(child => child.key === key);
          if (childItem) {
            return { component: childItem.component, title: childItem.label };
          }
        }
      }
      return { component: null, title: '' };
    };
    
    // Hàm render component với title truyền vào
    const renderComponent = (key, handleRowSelect, setSelectedRow) => {
      const { component: Component, title } = findComponentByKey(key);
      return Component ? (
        <Component title={title} handleRowSelect={handleRowSelect} setSelectedRow={setSelectedRow} />
      ) : (
        <div>{key}</div>
      );
    };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Row align="middle" style={{ backgroundColor: "#dff5ff", padding: "10px 20px", borderBottom: "1px solid #d9d9d9" }}>
      <Col flex="auto" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <Image width={100} src={Logo} />
  <Title level={3} style={{ margin: 0 }}>
    ADMIN
  </Title>
</Col>

        <Col>
        
        </Col>
        <Col>
          <Button icon={<BellOutlined />} style={{ marginRight: "15px" }} />
          <Link style={{textDecoration:'none'}} to='/' >
          <Button icon={<LogoutOutlined />} style={{ marginRight: "15px" }} />
          </Link>
          <span>{decodedToken.username}</span>
        </Col>
      </Row>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar Menu */}
        <div
          style={{
            width: collapsed ? '80px' : '250px',
            transition: 'width 0.3s',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #d9d9d9',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1000,
            userSelect: 'none'
          }}
        >
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                transform: collapsed ? 'translateX(0)' : 'translateX(170px)',
                transition: 'transform 0.3s ease-in-out'
              }}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <AdminMenu
              onClick={changeKey}
              selectedKeys={[selectedKey]}
              mode="inline"
              inlineCollapsed={collapsed}
              style={{ height: '100%', borderRight: 0 }}
              items={filteredMenu.map(item => ({
    ...item,
    children: item.children?.map(child => ({
      ...child,
      'data-testid': child.testid // Đảm bảo thêm testid vào các menu item có con
    })),
    'data-testid': item.testid // Thêm testid vào menu item chính
  }))}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
    {/* {selectedRow ? (
      <AdminProductDetail selectedRow={selectedRow} />
    ) : (
      renderComponent(selectedKey, handleRowSelect, setSelectedRow)
    )} */}
   { renderComponent(selectedKey, handleRowSelect, setSelectedRow)}
  </div>
      </div>
    </div>
  );
};

export default UserNew ;

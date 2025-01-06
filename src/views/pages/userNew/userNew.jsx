import React, { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  AreaChartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  FileTextOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { Avatar, Button, Col, Image, Row } from 'antd';
import { Link } from 'react-router-dom';
import { AdminMenu } from './style';
import {jwtDecode} from 'jwt-decode';
import Logo from '../../../assets/Logo.svg';

import AccountInfoComponent from '../../components/accountInfom/AccountInfoComponent';
import AdminOrdersComponent from '../../components/AdminOrdersComponent/AdminOrdersComponent';
import AdminOrdersComponent2 from '../../components/AdminOrdersComponentcopy/AdminOrdersComponent2';
import ReviewAd from '../../components/reviewAd/ReviewAd';
import CatagoryItemComponent from '../../components/CatagoryItemComponent/CatagoryItemComponent';
import CatagoryItemComponent2 from '../../components/CatagoryItemComponent/CatagoryItemComponent2';

import AdminReport from '../../components/adminReport/AdminReport';


const UserNew = () => {
  const token = localStorage.getItem("token");
  let decodedToken = {};
  
  if (token) {
    decodedToken = jwtDecode(token);
  } else {
    console.log("Không có token để giải mã.");
  }
  
  const itemMenu = [
    {
      label: "Trang cá nhân",
      key: "user",
      icon: <UserOutlined />,
      children: [
        { label: "Thông tin cá nhân", key: "userInfo", icon: <DashboardOutlined />, component: AccountInfoComponent, allowedRoles: ["Admin"] },
        { label: "Dịch vụ bạn đã đặt", key: "serviceU", icon: <ShoppingCartOutlined />, component: AdminOrdersComponent, allowedRoles: ["Admin"] },
        { label: "Các đánh giá của bạn", key: "reportU", icon: <StarOutlined />, component: ReviewAd, allowedRoles: ["Admin"] },
        { label: "Dịch vụ bạn đã thích", key: "servic", icon: <ProductOutlined />, component: CatagoryItemComponent2, allowedRoles: ["Provider"] },
      ],
      allowedRoles: ["Admin", "WarehouseStaff"],
      testid: "menu-products2",
    },
    decodedToken.role === "Provider" && {
      label: "Nhà cung cấp",
      key: "provider",
      icon: <FileTextOutlined />,
      children: [
        { label: "Đơn hàng của bạn", key: "order", icon: <FileTextOutlined />, component: AdminOrdersComponent2, allowedRoles: ["Provider"] },
        { label: "Dịch vụ bạn cung cấp", key: "serviceP", icon: <ProductOutlined />, component: CatagoryItemComponent, allowedRoles: ["Provider"] },
        { label: "Thống kê", key: "reportP", icon: <AreaChartOutlined />, component: AdminReport, allowedRoles: ["Provider"] },
      ],
      allowedRoles: ["Provider"],
      testid: "menu-provider",
    },
  ].filter(Boolean);
  
  
  const role = decodedToken.role || 'Guest';
  const defaultKey = role === "Seller" ? "orders" : role === "WarehouseStaff" ? "votp" : "userInfo";
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const changeKey = (e) => {
    setSelectedKey(e.key);
    setSelectedRow(null);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const findComponentByKey = (key) => {
    for (let item of itemMenu) {
      if (item.key === key) {
        return { component: item.component, title: item.label };
      }
      if (item.children) {
        const childItem = item.children.find((child) => child.key === key);
        if (childItem) {
          return { component: childItem.component, title: childItem.label };
        }
      }
    }
    return { component: null, title: '' };
  };

  const renderComponent = (key) => {
    const { component: Component, title } = findComponentByKey(key);
    return Component ? <Component title={title} handleRowSelect={handleRowSelect} setSelectedRow={setSelectedRow} /> : <div>{key}</div>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Row align="middle" style={{ backgroundColor: "#dff5ff", padding: "10px 20px", borderBottom: "1px solid #d9d9d9" }}>
        <Col flex="auto">
          <Image width={50} src={Logo} />
        </Col>
        <Col>
          <Button icon={<BellOutlined />} style={{ marginRight: "15px" }} />
          <Link style={{ textDecoration: 'none' }} to='/'>
            <Button icon={<LogoutOutlined />} style={{ marginRight: "15px" }} />
          </Link>
          <span>{decodedToken.username}</span>
        </Col>
      </Row>

      <div style={{ display: 'flex', flex: 1 }}>
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
          }}
        >
          <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ transform: collapsed ? 'translateX(0)' : 'translateX(170px)', transition: 'transform 0.3s ease-in-out' }}
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
              items={itemMenu.map((item) => ({
                ...item,
                children: item.children?.map((child) => ({ ...child, 'data-testid': child.testid })),
                'data-testid': item.testid,
              }))}
            />
          </div>
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          {renderComponent(selectedKey)}
        </div>
      </div>
    </div>
  );
};

export default UserNew;

import React, { useState } from 'react';
import { Table, Row, Col, Typography, Select, Card, Button } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const { Title } = Typography;
const { Option } = Select;

const RevenueStatistics2 = () => {
  const years = [2022, 2023, 2024]; // Các năm có sẵn trong hệ thống

  // Tạo dữ liệu giả cho nhiều năm
  const generateData = (year) =>
    Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      year,
      newUsers: Math.floor(Math.random() * 100) + 50,
      newCustomers: Math.floor(Math.random() * 50) + 20,
      newProviders: Math.floor(Math.random() * 30) + 10,
      newServices: Math.floor(Math.random() * 40) + 15,
      totalRevenue: Math.floor(Math.random() * 50000000) + 10000000,
    }));

  const allData = years.flatMap((year) => generateData(year)); // Gộp dữ liệu cho tất cả các năm

  const [filteredData, setFilteredData] = useState(allData);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleFilter = () => {
    const data = selectedYear
      ? allData.filter((item) => item.year === parseInt(selectedYear))
      : allData;
    setFilteredData(data);
  };

  const calculateTotals = () => {
    const totalUsers = filteredData.reduce((sum, item) => sum + item.newUsers, 0);
    const totalCustomers = filteredData.reduce((sum, item) => sum + item.newCustomers, 0);
    const totalProviders = filteredData.reduce((sum, item) => sum + item.newProviders, 0);
    const totalServices = filteredData.reduce((sum, item) => sum + item.newServices, 0);
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.totalRevenue, 0);
    return { totalUsers, totalCustomers, totalProviders, totalServices, totalRevenue };
  };

  const totals = calculateTotals();

  const columns = [
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Người đăng ký mới',
      dataIndex: 'newUsers',
      key: 'newUsers',
    },
    {
      title: 'Khách hàng đăng ký mới',
      dataIndex: 'newCustomers',
      key: 'newCustomers',
    },
    {
      title: 'Nhà cung cấp mới',
      dataIndex: 'newProviders',
      key: 'newProviders',
    },
    {
      title: 'Dịch vụ đăng ký mới',
      dataIndex: 'newServices',
      key: 'newServices',
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (revenue) =>
        revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
  ];

  const createChartData = (label, data, color) => ({
    labels: filteredData.map((data) => `Tháng ${data.month}`),
    datasets: [
      {
        label,
        data,
        backgroundColor: color,
      },
    ],
  });

  return (
    <div>
      <Title level={3}>Thống kê doanh thu và người đăng ký</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={4}>
          <Card style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
            <Title level={4}>Tổng người đăng ký</Title>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              {totals.totalUsers}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: '#FF9800', color: '#fff' }}>
            <Title level={4}>Tổng khách hàng</Title>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              {totals.totalCustomers}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: '#2196F3', color: '#fff' }}>
            <Title level={4}>Tổng nhà cung cấp</Title>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              {totals.totalProviders}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: '#9C27B0', color: '#fff' }}>
            <Title level={4}>Tổng dịch vụ</Title>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              {totals.totalServices}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ backgroundColor: '#F44336', color: '#fff' }}>
            <Title level={4}>Tổng doanh thu</Title>
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
              {totals.totalRevenue.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Select
            placeholder="Chọn năm"
            style={{ width: '100%' }}
            onChange={(value) => setSelectedYear(value)}
            allowClear
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2}>
          <Button onClick={handleFilter} style={{ width: '100%' }}>
            Lọc
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            title={() => 'Bảng thống kê doanh thu và người đăng ký'}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={7}>
          <Title level={4} style={{ textAlign: 'center' }}>
            Biểu đồ tổng doanh thu
          </Title>
          <Bar
            data={createChartData(
              'Tổng doanh thu',
              filteredData.map((data) => data.totalRevenue),
              '#4CAF50'
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </Col>
        <Col span={1}>

        </Col>
        <Col span={7}>
          <Title level={4} style={{ textAlign: 'center' }}>
            Biểu đồ người đăng ký mới
          </Title>
          <Bar
            data={createChartData(
              'Người đăng ký mới',
              filteredData.map((data) => data.newUsers),
              '#FF6384'
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </Col>
        <Col span={1}>

        </Col>
        <Col span={7}>
          <Title level={4} style={{ textAlign: 'center' }}>
            Biểu đồ dịch vụ đăng ký mới
          </Title>
          <Bar
            data={createChartData(
              'Dịch vụ đăng ký mới',
              filteredData.map((data) => data.newServices),
              '#36A2EB'
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </Col>
        <Col span={1}>

        </Col>
      </Row>
    </div>
  );
};

export default RevenueStatistics2;

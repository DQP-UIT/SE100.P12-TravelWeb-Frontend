import React, { useState } from 'react';
import { Table, Select, Row, Col, Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const { Title } = Typography;

const RevenueStatistics = () => {
  const [selectedMonth, setSelectedMonth] = useState('1');

  const months = [
    { value: '1', label: 'Tháng 1' },
    { value: '2', label: 'Tháng 2' },
    { value: '3', label: 'Tháng 3' },
    { value: '4', label: 'Tháng 4' },
    { value: '5', label: 'Tháng 5' },
    { value: '6', label: 'Tháng 6' },
    { value: '7', label: 'Tháng 7' },
    { value: '8', label: 'Tháng 8' },
    { value: '9', label: 'Tháng 9' },
    { value: '10', label: 'Tháng 10' },
    { value: '11', label: 'Tháng 11' },
    { value: '12', label: 'Tháng 12' },
];

const annualData = [
    30000000, 28000000, 35000000, 32000000, 37000000, 39000000,
    40000000, 38000000, 41000000, 42000000, 43000000, 45000000,
];

const roomData = {};

// Hàm tạo dữ liệu ngẫu nhiên cho các phòng
const generateRoomData = (month) => {
    const services = ['Dịch vụ A', 'Dịch vụ B', 'Dịch vụ C', 'Dịch vụ D', 'Dịch vụ E'];
    const rooms = Array.from({ length: 10 }, (_, i) => `Phòng ${101 + i}`);
    
    return rooms.map((room, index) => {
        const rentals = Math.floor(Math.random() * 30) + 1;
        const revenue = rentals * (Math.floor(Math.random() * 500000) + 1000000);
        return {
            key: `${month}-${index + 1}`,
            room,
            service: services[Math.floor(Math.random() * services.length)],
            rentals,
            revenue,
        };
    });
};

// Tạo dữ liệu cho các tháng từ 1 đến 12
for (let i = 1; i <= 12; i++) {
    roomData[i] = generateRoomData(i);
}

const chartData = {};

// Tạo dữ liệu biểu đồ dựa trên roomData
Object.keys(roomData).forEach((month) => {
    const labels = roomData[month].map((item) => item.room);
    const revenues = roomData[month].map((item) => item.revenue);

    chartData[month] = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenues,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        ],
    };
});

console.log(roomData);


  const roomColumns = [
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'Lượt thuê',
      dataIndex: 'rentals',
      key: 'rentals',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
  ];

  const annualChartData = {
    labels: months.map((month) => month.label),
    datasets: [
      {
        label: 'Doanh thu theo tháng',
        data: annualData,
        backgroundColor: '#4CAF50',
      },
    ],
  };

  return (
    <div>
      <Title level={3}>Thống kê doanh thu theo tháng</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
          >
            {months.map((month) => (
              <Select.Option key={month.value} value={month.value}>
                {month.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={roomColumns}
            dataSource={roomData[selectedMonth]}
            pagination={{ pageSize: 5 }}
            title={() => `Doanh thu chi tiết tháng ${selectedMonth}`}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Title level={4} style={{ textAlign: 'center' }}>
            Biểu đồ doanh thu tháng {selectedMonth}
          </Title>
          <Bar
          style={{margin: '50px'}}
            data={chartData[selectedMonth]}
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
        <Col span={12}>
          <Title level={4} style={{ textAlign: 'center'}}>
            Biểu đồ doanh thu cả năm
          </Title>
          <Bar
           style={{margin: '50px'}}
            data={annualChartData}
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
      </Row>
    </div>
  );
};

export default RevenueStatistics;

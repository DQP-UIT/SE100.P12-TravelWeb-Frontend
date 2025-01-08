import React, { useState } from 'react';
import { Table, Select, Row, Col, Typography, Button, Space } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx'; // Import xlsx library
import { FileExcelOutlined } from '@ant-design/icons'; // Import Excel icon

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

  for (let i = 1; i <= 12; i++) {
    roomData[i] = generateRoomData(i);
  }

  const chartData = {};

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

  const exportToExcel = () => {
    // Prepare data for the Excel file
    const monthData = roomData[selectedMonth].map(item => ({
      'Phòng': item.room,
      'Dịch vụ': item.service,
      'Lượt thuê': item.rentals,
      'Doanh thu': item.revenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    }));
  
    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(monthData);
  
    // Add title and extra info at the top
    const titleInfo = [
      ['Doanh thu tháng 1 của nhà cung cấp : Công ty ABC'],  // Replace 'Công ty ABC' with actual supplier name
      ['Ngày xuất', new Date().toLocaleDateString()],
    ];
  
    const wsTitle = XLSX.utils.aoa_to_sheet(titleInfo, { origin: 'A1' });
  
    // Styling for the title row
    wsTitle['A1'].s = { font: { bold: true, sz: 14 }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: 'FFFF00' } } };
    wsTitle['A2'].s = { font: { italic: true }, alignment: { horizontal: 'center' } };
  
    // Set columns widths for better readability
    const columnsWidth = [
      { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 20 }
    ];
    ws['!cols'] = columnsWidth;
  
    // Apply styles to the header row of the table
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      fill: { fgColor: { rgb: 'FFFF00' } },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    };
  
    // Set headers in the first row of the data sheet
    const headerRange = { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } };
    const range = XLSX.utils.decode_range(ws['!ref']);
   // ws['!merges'] = [headerRange];
  
    // Create workbook and append title, data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsTitle, 'Thông tin');
    XLSX.utils.book_append_sheet(wb, ws, `Doanh thu tháng ${selectedMonth}`);
  
    // Write Excel file
    XLSX.writeFile(wb, `DoanhThu_Thang_${selectedMonth}.xlsx`);
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
        <Col span={12}>
        <Button
  type="primary"
  onClick={exportToExcel}
  icon={<FileExcelOutlined />} // Add Excel icon from Ant Design
  style={{
    backgroundColor: '#4CAF50', // Green background
    borderColor: '#4CAF50', // Border matching the background color
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} // Darker green on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'} // Revert back on mouse leave
>
  Xuất Excel
</Button>

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
            style={{ margin: '50px' }}
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
          <Title level={4} style={{ textAlign: 'center' }}>
            Biểu đồ doanh thu cả năm
          </Title>
          <Bar
            style={{ margin: '50px' }}
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

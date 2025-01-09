import React, { useState } from "react";
import { Table, Row, Col, Typography, Select, Card, Button } from "antd";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import * as XLSX from "xlsx";
import { URL } from "../../../model/constants/URL";
import { FileExcelOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Option } = Select;

const RevenueStatistics2 = () => {
  const currentyear = new Date().getFullYear();
  const years = []; 
  const [userCountData, setUserCountData] = useState(null);
  const [providerCountData, setProviderCountData] = useState(null);
  const [customerCountData, setCustomerCountData] = useState(null);
  const [serviceCountData, setServiceCountData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);

  for(let year = 2022; year <= currentyear; year++){
    years.push(year)
  }
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
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleFilter = async () => {
    try {
      const userResponse = await fetch(
        `${URL}/api/users/filter?year=${selectedYear}`
      );
      if (!userResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const userCountData = await userResponse.json();
      setUserCountData(userCountData);

      const customerResponse = await fetch(
        `${URL}/api/users/filter?year=${selectedYear}&role=Customer`
      );
      if (!customerResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const customerCountRes = await customerResponse.json();
      setCustomerCountData(customerCountRes);

      const providerResponse = await fetch(
        `${URL}/api/users/filter?year=${selectedYear}&role=Provider`
      );
      if (!providerResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const providerCountRes= await providerResponse.json();
      setProviderCountData(providerCountRes);

      const serviceResponse = await fetch(
        `${URL}/api/services/count?year=${selectedYear}`
      );
      if (!serviceResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const serviceCountData = await serviceResponse.json();
      setServiceCountData(serviceCountData);

      const revenueResponse = await fetch(
        `${URL}/api/invoices/total-amount?year=${selectedYear}`
      );
      if (!revenueResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const revenueData = await revenueResponse.json();
      setRevenueData(revenueData);

      // Combine the data from the three APIs into the format expected by filteredData
      const combinedData = userCountData.data.map((userData, index) => ({
        month: userData.month,
        year: selectedYear,
        newUsers: userCountData.data[index].count,
        newCustomers: customerCountData.data[index].count,
        newProviders: providerCountData.data[index].count, 
        newServices: serviceCountData.data[index].count,
        totalRevenue: revenueData.data[index].totalAmount,
      }));

      setFilteredData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const exportToExcel = () => {
    // Kiểm tra dữ liệu đầu vào
    if (
      !userCountData ||
      !userCountData.data ||
      !serviceCountData ||
      !serviceCountData.data ||
      !revenueData ||
      !revenueData.data
    ) {
      console.error("Dữ liệu không hợp lệ");
      return;
    }

    console.log(filteredData);
    // Prepare data for the Excel file
    const monthData = userCountData.data.map((item, index) => ({
      Tháng: item.month,
      "Người đăng ký mới": item.count,
      "Dịch vụ đăng ký mới": serviceCountData.data[index]?.count || 0,
      "Doanh thu":
        revenueData.data[index]?.totalAmount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }) || 0,
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(monthData);

    // Add title and extra info at the top
    const titleInfo = [
      ["Báo cáo doanh thu và người đăng ký năm 2023"], // Replace '2023' with actual year if needed
      ["Ngày xuất", new Date().toLocaleDateString()],
    ];

    const wsTitle = XLSX.utils.aoa_to_sheet(titleInfo, { origin: "A1" });

    // Merge cells for the title
    wsTitle["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    // Styling for the title row
    wsTitle["A1"].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFFF00" } },
    };
    wsTitle["A2"].s = {
      font: { italic: true },
      alignment: { horizontal: "center" },
    };

    // Set columns widths for better readability
    const columnsWidth = [{ wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    ws["!cols"] = columnsWidth;

    // Apply styles to the header row of the table
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFFF00" } },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // Set headers in the first row of the data sheet
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = XLSX.utils.encode_cell({ c: C, r: 0 });
      if (!ws[cell_address]) continue;
      ws[cell_address].s = headerStyle;
    }

    // Create workbook and append title, data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsTitle, "Thông tin");
    XLSX.utils.book_append_sheet(wb, ws, `Doanh thu năm 2023`);

    // Write Excel file
    XLSX.writeFile(wb, `DoanhThu_Nam_2023.xlsx`);
  };

  const calculateTotals = () => {
    const totalUsers = filteredData.reduce(
      (sum, item) => sum + item.newUsers,
      0
    );
    const totalCustomers = filteredData.reduce(
      (sum, item) => sum + item.newCustomers,
      0
    );
    const totalProviders = filteredData.reduce(
      (sum, item) => sum + item.newProviders,
      0
    );
    const totalServices = filteredData.reduce(
      (sum, item) => sum + item.newServices,
      0
    );
    const totalRevenue = filteredData.reduce(
      (sum, item) => sum + item.totalRevenue,
      0
    );
    return {
      totalUsers,
      totalCustomers,
      totalProviders,
      totalServices,
      totalRevenue,
    };
  };

  const totals = calculateTotals();

  const columns = [
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Người đăng ký mới",
      dataIndex: "newUsers",
      key: "newUsers",
    },
    {
      title: "Khách hàng đăng ký mới",
      dataIndex: "newCustomers",
      key: "newCustomers",
    },
    {
      title: "Nhà cung cấp mới",
      dataIndex: "newProviders",
      key: "newProviders",
    },
    {
      title: "Dịch vụ đăng ký mới",
      dataIndex: "newServices",
      key: "newServices",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (revenue) =>
        revenue.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
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

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={4}>
          <Card style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
            <Title level={4}>Tổng người đăng ký</Title>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {totals.totalUsers}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: "#FF9800", color: "#fff" }}>
            <Title level={4}>Tổng khách hàng</Title>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {totals.totalCustomers}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: "#2196F3", color: "#fff" }}>
            <Title level={4}>Tổng nhà cung cấp</Title>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {totals.totalProviders}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{ backgroundColor: "#9C27B0", color: "#fff" }}>
            <Title level={4}>Tổng dịch vụ</Title>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {totals.totalServices}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ backgroundColor: "#F44336", color: "#fff" }}>
            <Title level={4}>Tổng doanh thu</Title>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {totals.totalRevenue.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Select
            placeholder="Chọn năm"
            style={{ width: "100%" }}
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
          <Button onClick={handleFilter} style={{ width: "100%" }}>
            Lọc
          </Button>
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            onClick={exportToExcel}
            icon={<FileExcelOutlined />} // Add Excel icon from Ant Design
            style={{
              backgroundColor: "#4CAF50", // Green background
              borderColor: "#4CAF50", // Border matching the background color
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")} // Darker green on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Revert back on mouse leave
          >
            Xuất Excel
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            title={() => "Bảng thống kê doanh thu và người đăng ký"}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={7}>
          <Title level={4} style={{ textAlign: "center" }}>
            Biểu đồ tổng doanh thu
          </Title>
          <Bar
            data={createChartData(
              "Tổng doanh thu",
              filteredData.map((data) => data.totalRevenue),
              "#4CAF50"
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <Title level={4} style={{ textAlign: "center" }}>
            Biểu đồ người đăng ký mới
          </Title>
          <Bar
            data={createChartData(
              "Người đăng ký mới",
              filteredData.map((data) => data.newUsers),
              "#FF6384"
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <Title level={4} style={{ textAlign: "center" }}>
            Biểu đồ dịch vụ đăng ký mới
          </Title>
          <Bar
            data={createChartData(
              "Dịch vụ đăng ký mới",
              filteredData.map((data) => data.newServices),
              "#36A2EB"
            )}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </Col>
        <Col span={1}></Col>
      </Row>
    </div>
  );
};

export default RevenueStatistics2;

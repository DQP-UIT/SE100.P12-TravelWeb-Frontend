import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import html2canvas from "html2canvas";
import { Margin } from "@mui/icons-material";

// Fake data to simulate API call
const fakeRevenueData = [
  { year: 2022, month: "January", revenue: 1200 },
  { year: 2022, month: "February", revenue: 1900 },
  { year: 2022, month: "March", revenue: 3000 },
  { year: 2022, month: "April", revenue: 5000 },
  { year: 2022, month: "May", revenue: 2300 },
  { year: 2022, month: "June", revenue: 3200 },
  { year: 2022, month: "July", revenue: 4000 },
  { year: 2022, month: "August", revenue: 4500 },
  { year: 2022, month: "September", revenue: 3800 },
  { year: 2022, month: "October", revenue: 4200 },
  { year: 2022, month: "November", revenue: 4800 },
  { year: 2022, month: "December", revenue: 5200 },
  { year: 2023, month: "January", revenue: 1300 },
  { year: 2023, month: "February", revenue: 2000 },
  { year: 2023, month: "March", revenue: 3100 },
  { year: 2023, month: "April", revenue: 5100 },
  { year: 2023, month: "May", revenue: 2400 },
  { year: 2023, month: "June", revenue: 3300 },
  { year: 2023, month: "July", revenue: 4100 },
  { year: 2023, month: "August", revenue: 4600 },
  { year: 2023, month: "September", revenue: 3900 },
  { year: 2023, month: "October", revenue: 4300 },
  { year: 2023, month: "November", revenue: 4900 },
  { year: 2023, month: "December", revenue: 5300 },
  { year: 2024, month: "January", revenue: 1400 },
  { year: 2024, month: "February", revenue: 2100 },
  { year: 2024, month: "March", revenue: 3200 },
  { year: 2024, month: "April", revenue: 5200 },
  { year: 2024, month: "May", revenue: 2500 },
  { year: 2024, month: "June", revenue: 3400 },
  { year: 2024, month: "July", revenue: 4200 },
  { year: 2024, month: "August", revenue: 4700 },
  { year: 2024, month: "September", revenue: 4000 },
  { year: 2024, month: "October", revenue: 4400 },
  { year: 2024, month: "November", revenue: 5000 },
  { year: 2024, month: "December", revenue: 5400 },
];

const RevenueReportPage = () => {
  const [revenueData, setRevenueData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Simulate API call to get revenue data
    setRevenueData(fakeRevenueData);
  }, []);

  const exportPDF = async () => {
    const doc = new jsPDF();
    doc.text("Monthly Revenue Report", 10, 10);

    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 20, 180, 100);
    }

    doc.save("report.pdf");
  };

  const exportWord = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgBuffer = await fetch(imgData).then((res) => res.arrayBuffer());

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Monthly Revenue Report",
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "See the attached chart for the monthly revenue data.",
                    size: 20,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imgBuffer,
                    transformation: {
                      width: 600,
                      height: 300,
                    },
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "report.docx";
      link.click();
    }
  };

  const processData = (data) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const processedData = months.map((month) => {
      const monthData = { month };
      data.forEach((item) => {
        if (item.month === month) {
          monthData[item.year] = item.revenue;
        }
      });
      return monthData;
    });

    return processedData;
  };

  const getYears = (data) => {
    return [...new Set(data.map((item) => item.year))];
  };

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#387908"];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Monthly Revenue Report
      </Typography>
      {revenueData.length > 0 && (
        <Box ref={chartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={processData(revenueData)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {getYears(revenueData).map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={year}
                  stroke={colors[index % colors.length]}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
      <Box mt={4} display="flex" justifyContent="center" gap={12}>
        <Button variant="contained" color="primary" onClick={exportPDF}>
          Export as PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportWord}>
          Export as Word
        </Button>
      </Box>
    </Container>
  );
};

export default RevenueReportPage;

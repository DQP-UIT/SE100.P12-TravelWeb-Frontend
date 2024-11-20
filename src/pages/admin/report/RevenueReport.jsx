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

// Fake data to simulate API call
const fakeRevenueData = [
  { month: "January", revenue: 1200 },
  { month: "February", revenue: 1900 },
  { month: "March", revenue: 3000 },
  { month: "April", revenue: 5000 },
  { month: "May", revenue: 2300 },
  { month: "June", revenue: 3200 },
  { month: "July", revenue: 4000 },
  { month: "August", revenue: 4500 },
  { month: "September", revenue: 3800 },
  { month: "October", revenue: 4200 },
  { month: "November", revenue: 4800 },
  { month: "December", revenue: 5200 },
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Monthly Revenue Report
      </Typography>
      {revenueData.length > 0 && (
        <Box ref={chartRef}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
      <Box mt={4} display="flex" justifyContent="space-between">
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

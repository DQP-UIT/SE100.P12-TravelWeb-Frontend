import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Fake data to simulate API call
const fakeRevenueData = {
  labels: [
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
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        1200, 1900, 3000, 5000, 2300, 3200, 4000, 4500, 3800, 4200, 4800, 5200,
      ],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const ReportPage = () => {
  const [revenueData, setRevenueData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Simulate API call to get revenue data
    setRevenueData(fakeRevenueData);
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Monthly Revenue Report", 10, 10);
    if (chartRef.current) {
      doc.addImage(chartRef.current.toBase64Image(), "PNG", 10, 20, 180, 100);
    }
    doc.save("report.pdf");
  };

  const exportWord = async () => {
    const chartImage = chartRef.current.toBase64Image();
    const chartImageBuffer = await fetch(chartImage).then((res) =>
      res.arrayBuffer()
    );

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
                  data: chartImageBuffer,
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
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Monthly Revenue Report
      </Typography>
      {revenueData && (
        <Box>
          <Line
            ref={chartRef}
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly Revenue",
                },
              },
            }}
          />
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

export default ReportPage;

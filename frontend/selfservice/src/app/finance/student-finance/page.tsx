"use client";

import { useState } from "react";
import {
  Card,
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Download, Payment } from "@mui/icons-material";

// Types for student finance data
interface FinanceData {
  currentBalance: number;
  dueDate: string;
  statementDate: string;
  charges: {
    type: string;
    amount: number;
  }[];
}

export default function StudentFinancePage() {
  // Mock data - replace with actual API call
  const [financeData] = useState<FinanceData>({
    currentBalance: 5000.0,
    dueDate: "2024-04-15",
    statementDate: "2024-03-15",
    charges: [
      { type: "Tuition", amount: 4000.0 },
      { type: "Housing", amount: 800.0 },
      { type: "Student Fees", amount: 200.0 },
    ],
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Student Finance
      </Typography>

      {/* Quick Overview Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Current Balance</Typography>
            <Typography variant="h4" color="primary">
              ${financeData.currentBalance.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due by {new Date(financeData.dueDate).toLocaleDateString()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" startIcon={<Payment />} size="large">
              Make a Payment
            </Button>
            <Button variant="outlined" startIcon={<Download />} size="large">
              Download Statement
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Latest Statement Summary */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Latest Statement Summary
        </Typography>
        <Grid container spacing={2}>
          {financeData.charges.map((charge, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{charge.type}</Typography>
                <Typography>${charge.amount.toFixed(2)}</Typography>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: 1,
                borderColor: "divider",
                pt: 2,
                mt: 2,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">
                ${financeData.currentBalance.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Options Section - Placeholder */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Payment Options
        </Typography>
        <Typography color="text.secondary">
          Payment form and saved payment methods will be implemented here.
        </Typography>
      </Paper>
    </Container>
  );
}

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const Utility = ({ useTranslation, graphType, graphDate }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {useTranslation("Monthly Data")}
        </Typography>
        {graphType === "Bar" && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphDate}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        )}
        {graphType === "Line" && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphDate}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1976d2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default Utility;

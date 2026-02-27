'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#06b6d4', '#7C3AED', '#10B981', '#F97316', '#D946EF'];

  const sourceData = Object.entries(analytics?.leads_by_source || {}).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value
  }));

  const statusData = Object.entries(analytics?.leads_by_status || {}).map(([name, value]) => ({
    name,
    value
  }));

  // Mock monthly data for demonstration
  const monthlyData = [
    { month: 'Jan', leads: 12 },
    { month: 'Feb', leads: 19 },
    { month: 'Mar', leads: 15 },
    { month: 'Apr', leads: 25 },
    { month: 'May', leads: 22 },
    { month: 'Jun', leads: analytics?.leads_this_month || 30 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-analytics">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-sara-cyan">{analytics?.total_leads || 0}</p>
                <p className="text-muted-foreground mt-1">Total Leads</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500">{analytics?.conversion_rate || 0}%</p>
                <p className="text-muted-foreground mt-1">Conversion Rate</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-500">{analytics?.leads_this_month || 0}</p>
                <p className="text-muted-foreground mt-1">This Month</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Monthly Lead Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads by Source */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent>
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leads by Status */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;

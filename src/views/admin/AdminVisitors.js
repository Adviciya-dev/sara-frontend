'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Monitor, Smartphone, Tablet, Globe, 
  MapPin, Clock, RefreshCw, ExternalLink 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchVisitors();
  }, [days]);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/visitors?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVisitors(response.data);
    } catch (error) {
      console.error('Failed to fetch visitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (device) => {
    switch(device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-visitors">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Visitor Analytics</h1>
          <p className="text-muted-foreground">Track website visitors, their devices, and locations.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <Button variant="outline" onClick={fetchVisitors}>
            <RefreshCw className="w-4 h-4 me-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{visitors?.total_visitors || 0}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique Sessions</CardTitle>
              <Globe className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{visitors?.unique_sessions || 0}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Country</CardTitle>
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Object.entries(visitors?.countries || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Device</CardTitle>
              <Monitor className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground capitalize">
                {Object.entries(visitors?.devices || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts & Tables */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(visitors?.pages || {}).slice(0, 8).map(([page, count]) => (
                <div key={page} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate max-w-[200px]" title={page}>
                    {page}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-sara-cyan rounded-full"
                        style={{ width: `${(count / visitors?.total_visitors * 100) || 0}%` }}
                      />
                    </div>
                    <span className="text-foreground font-medium w-12 text-end">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(visitors?.devices || {}).map(([device, count]) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device)}
                    <span className="text-muted-foreground capitalize">{device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${(count / visitors?.total_visitors * 100) || 0}%` }}
                      />
                    </div>
                    <span className="text-foreground font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(visitors?.countries || {}).map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{country}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referrers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(visitors?.referrers || {}).length > 0 ? (
                Object.entries(visitors?.referrers || {}).map(([ref, count]) => (
                  <div key={ref} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]" title={ref}>
                      <ExternalLink className="w-3 h-3 inline me-1" />
                      {ref}
                    </span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No referrer data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visitors */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-start py-3 px-4 text-muted-foreground font-medium">Time</th>
                  <th className="text-start py-3 px-4 text-muted-foreground font-medium">Page</th>
                  <th className="text-start py-3 px-4 text-muted-foreground font-medium">Device</th>
                  <th className="text-start py-3 px-4 text-muted-foreground font-medium">Browser</th>
                  <th className="text-start py-3 px-4 text-muted-foreground font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {(visitors?.recent || []).slice(0, 15).map((visitor, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 inline me-1" />
                      {new Date(visitor.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground truncate max-w-[200px]">
                      {visitor.page_url}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="capitalize">
                        {getDeviceIcon(visitor.device_type)}
                        <span className="ms-1">{visitor.device_type}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{visitor.browser}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {visitor.city}, {visitor.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVisitors;

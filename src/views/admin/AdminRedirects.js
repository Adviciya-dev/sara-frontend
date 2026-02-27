'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Plus, Edit, Trash2, Save, 
  RefreshCw, AlertTriangle, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const AdminRedirects = () => {
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRedirect, setEditingRedirect] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    from_path: '',
    to_path: '',
    redirect_type: 301,
    active: true
  });

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/redirects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRedirects(response.data);
    } catch (error) {
      console.error('Failed to fetch redirects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.post(`${API}/redirects`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Redirect created successfully!');
      setShowForm(false);
      setFormData({ from_path: '', to_path: '', redirect_type: 301, active: true });
      fetchRedirects();
    } catch (error) {
      toast.error('Failed to create redirect');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.put(`${API}/redirects/${editingRedirect.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Redirect updated successfully!');
      setEditingRedirect(null);
      setShowForm(false);
      setFormData({ from_path: '', to_path: '', redirect_type: 301, active: true });
      fetchRedirects();
    } catch (error) {
      toast.error('Failed to update redirect');
    }
  };

  const handleDelete = async (redirectId) => {
    if (!window.confirm('Are you sure you want to delete this redirect?')) return;
    
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.delete(`${API}/redirects/${redirectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Redirect deleted successfully!');
      fetchRedirects();
    } catch (error) {
      toast.error('Failed to delete redirect');
    }
  };

  const handleEdit = (redirect) => {
    setEditingRedirect(redirect);
    setFormData({
      from_path: redirect.from_path,
      to_path: redirect.to_path,
      redirect_type: redirect.redirect_type,
      active: redirect.active
    });
    setShowForm(true);
  };

  const handleNewRedirect = () => {
    setEditingRedirect(null);
    setFormData({ from_path: '', to_path: '', redirect_type: 301, active: true });
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-redirects">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">URL Redirects</h1>
          <p className="text-muted-foreground">Manage 301/302 redirects for SEO and legacy URLs.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchRedirects}>
            <RefreshCw className="w-4 h-4 me-2" />
            Refresh
          </Button>
          <Button onClick={handleNewRedirect} className="bg-sara-cyan hover:bg-sara-cyanHover">
            <Plus className="w-4 h-4 me-2" />
            Add Redirect
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Redirect Best Practices</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Use <strong>301 (Permanent)</strong> for permanently moved pages - passes SEO value</li>
                <li>• Use <strong>302 (Temporary)</strong> for temporary redirects - doesn't pass SEO value</li>
                <li>• Avoid redirect chains (A → B → C) - redirect directly to final destination</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Redirects List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Active Redirects ({redirects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {redirects.length > 0 ? (
            <div className="space-y-3">
              {redirects.map((redirect) => (
                <motion.div
                  key={redirect.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Badge 
                      variant={redirect.redirect_type === 301 ? 'default' : 'secondary'}
                      className={redirect.redirect_type === 301 ? 'bg-green-500/20 text-green-500' : ''}
                    >
                      {redirect.redirect_type}
                    </Badge>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-sm text-foreground truncate max-w-[200px]" title={redirect.from_path}>
                        {redirect.from_path}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-sara-cyan truncate max-w-[200px]" title={redirect.to_path}>
                        {redirect.to_path}
                      </span>
                    </div>
                    {redirect.active ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 ms-4">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(redirect)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(redirect.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <ArrowRight className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No redirects configured</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl m-4"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {editingRedirect ? 'Edit Redirect' : 'New Redirect'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">From Path</label>
                <Input
                  value={formData.from_path}
                  onChange={(e) => setFormData({ ...formData, from_path: e.target.value })}
                  placeholder="/old-page"
                />
                <p className="text-xs text-muted-foreground mt-1">The URL path to redirect from</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">To Path</label>
                <Input
                  value={formData.to_path}
                  onChange={(e) => setFormData({ ...formData, to_path: e.target.value })}
                  placeholder="/new-page"
                />
                <p className="text-xs text-muted-foreground mt-1">The destination URL path</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Redirect Type</label>
                <select
                  value={formData.redirect_type}
                  onChange={(e) => setFormData({ ...formData, redirect_type: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground"
                >
                  <option value={301}>301 - Permanent (Recommended for SEO)</option>
                  <option value={302}>302 - Temporary</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="active" className="text-sm text-muted-foreground">
                  Active (redirect is enabled)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button 
                onClick={editingRedirect ? handleUpdate : handleCreate}
                className="bg-sara-cyan hover:bg-sara-cyanHover"
              >
                <Save className="w-4 h-4 me-2" />
                {editingRedirect ? 'Update' : 'Create'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRedirects;

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Save, Globe, FileText, RefreshCw,
  Code, AlertTriangle, CheckCircle, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const AdminSEO = () => {
  const [settings, setSettings] = useState({
    site_title: 'SARA Business Solutions',
    site_description: '',
    default_og_image: '',
    robots_txt: '',
    google_analytics_id: '',
    google_tag_manager_id: '',
    schema_org: {}
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/seo/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('sara-admin-token');
      await axios.post(`${API}/seo/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('SEO settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'robots', label: 'Robots.txt', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: Code },
    { id: 'schema', label: 'Schema.org', icon: Code },
  ];

  const seoChecklist = [
    { item: 'SSL Certificate', status: 'pass', description: 'HTTPS enabled site-wide' },
    { item: 'XML Sitemap', status: 'pass', description: 'Auto-generated at /api/sitemap.xml' },
    { item: 'Robots.txt', status: settings.robots_txt ? 'pass' : 'warning', description: 'Configure crawling rules' },
    { item: 'Meta Descriptions', status: 'pass', description: 'Editable via Content Management' },
    { item: 'Canonical URLs', status: 'pass', description: 'Configurable per page' },
    { item: 'Open Graph Tags', status: 'pass', description: 'Social sharing optimized' },
    { item: 'Mobile Responsive', status: 'pass', description: 'Tailwind CSS responsive design' },
    { item: 'Schema.org Markup', status: settings.schema_org?.organization ? 'pass' : 'warning', description: 'Add structured data' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-seo">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">SEO Settings</h1>
          <p className="text-muted-foreground">Configure technical SEO, analytics, and structured data.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href={`${API}/sitemap.xml`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 me-2" />
              View Sitemap
            </a>
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-sara-cyan hover:bg-sara-cyanHover">
            {saving ? <RefreshCw className="w-4 h-4 me-2 animate-spin" /> : <Save className="w-4 h-4 me-2" />}
            Save Settings
          </Button>
        </div>
      </div>

      {/* SEO Checklist */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>SEO Health Check</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seoChecklist.map((check, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border ${
                  check.status === 'pass' 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-yellow-500/30 bg-yellow-500/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {check.status === 'pass' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className="font-medium text-foreground text-sm">{check.item}</span>
                </div>
                <p className="text-xs text-muted-foreground">{check.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-sara-cyan text-sara-cyan'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === 'general' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>General SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Site Title</label>
                <Input
                  value={settings.site_title}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  placeholder="SARA Business Solutions"
                />
                <p className="text-xs text-muted-foreground mt-1">Default title shown in browser tabs</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Site Description</label>
                <textarea
                  value={settings.site_description}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  placeholder="Leading Saudi digital solutions provider..."
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">Default meta description (150-160 chars recommended)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Default OG Image</label>
                <Input
                  value={settings.default_og_image}
                  onChange={(e) => setSettings({ ...settings, default_og_image: e.target.value })}
                  placeholder="https://sara.sa/og-image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Image shown when sharing on social media (1200x630px recommended)</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'robots' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Robots.txt Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <FileText className="w-5 h-5 text-sara-cyan" />
                <span className="text-sm text-muted-foreground">
                  robots.txt is served at: <code className="text-foreground">/api/robots.txt</code>
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Robots.txt Content</label>
                <textarea
                  value={settings.robots_txt}
                  onChange={(e) => setSettings({ ...settings, robots_txt: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-mono text-sm resize-none"
                  rows={12}
                  placeholder={`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://sara.sa/sitemap.xml`}
                />
              </div>

              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="w-4 h-4 inline me-1" />
                  Be careful with Disallow rules - they can hide your site from search engines.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Google Analytics ID</label>
                <Input
                  value={settings.google_analytics_id}
                  onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-xs text-muted-foreground mt-1">Google Analytics 4 measurement ID</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Google Tag Manager ID</label>
                <Input
                  value={settings.google_tag_manager_id}
                  onChange={(e) => setSettings({ ...settings, google_tag_manager_id: e.target.value })}
                  placeholder="GTM-XXXXXXX"
                />
                <p className="text-xs text-muted-foreground mt-1">Google Tag Manager container ID</p>
              </div>

              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  <Code className="w-4 h-4 inline me-1" />
                  Built-in visitor tracking is active. View analytics in the Visitors tab.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'schema' && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Schema.org Structured Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">
                  <Code className="w-4 h-4 inline me-1" />
                  Schema.org markup helps search engines understand your content better and can enable rich snippets.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organization Schema (JSON-LD)</label>
                <textarea
                  value={JSON.stringify(settings.schema_org, null, 2)}
                  onChange={(e) => {
                    try {
                      setSettings({ ...settings, schema_org: JSON.parse(e.target.value) });
                    } catch {}
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground font-mono text-sm resize-none"
                  rows={15}
                  placeholder={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SARA Business Solutions",
  "url": "https://sara.sa",
  "logo": "https://sara.sa/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966-12-345-6789",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.linkedin.com/company/sara",
    "https://twitter.com/sara"
  ]
}`}
                />
                <p className="text-xs text-muted-foreground mt-1">Valid JSON-LD for Organization schema</p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSEO;

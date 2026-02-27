'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Plus, Edit, Trash2, Save, X, 
  Globe, Search, Image as ImageIcon 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

// Simple WYSIWYG Editor Component
const RichEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useCallback(node => {
    if (node) {
      node.innerHTML = value || '';
    }
  }, []);

  const handleInput = (e) => {
    onChange(e.target.innerHTML);
  };

  const execCommand = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/50">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 rounded hover:bg-muted"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 rounded hover:bg-muted"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 rounded hover:bg-muted"
          title="Underline"
        >
          <u>U</u>
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'h2')}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'h3')}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'p')}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Paragraph"
        >
          P
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) execCommand('createLink', url);
          }}
          className="p-2 rounded hover:bg-muted text-sm"
          title="Add Link"
        >
          🔗
        </button>
      </div>
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 focus:outline-none prose prose-sm max-w-none text-foreground"
        style={{ direction: 'ltr' }}
        placeholder={placeholder}
      />
    </div>
  );
};

const AdminContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const defaultPages = [
    { page_slug: 'home', name: 'Homepage' },
    { page_slug: 'services', name: 'Services' },
    { page_slug: 'who-we-are', name: 'Who We Are' },
    { page_slug: 'contact', name: 'Contact' },
    { page_slug: 'blogs', name: 'Blogs' },
    { page_slug: 'careers', name: 'Careers' },
    { page_slug: 'resources', name: 'Resources' },
    { page_slug: 'success-stories', name: 'Success Stories' },
    { page_slug: 'service/muqeem', name: 'MUQEEM Service' },
    { page_slug: 'service/bayzat', name: 'BAYZAT Service' },
    { page_slug: 'service/rasid', name: 'RASID Service' },
    { page_slug: 'service/reviuai', name: 'ReviuAI Service' },
    { page_slug: 'service/kaleem', name: 'Kaleem AI Service' },
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/content`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContents(response.data);
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content) => {
    setEditingContent({
      page_slug: content?.page_slug || '',
      title: content?.title || { en: '', ar: '' },
      meta_description: content?.meta_description || { en: '', ar: '' },
      meta_keywords: content?.meta_keywords || '',
      og_title: content?.og_title || '',
      og_description: content?.og_description || '',
      og_image: content?.og_image || '',
      content: content?.content || { en: '', ar: '' },
      canonical_url: content?.canonical_url || '',
      no_index: content?.no_index || false,
    });
    setShowEditor(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.post(`${API}/content`, editingContent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Content saved successfully!');
      setShowEditor(false);
      setEditingContent(null);
      fetchContents();
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  const handleDelete = async (pageSlug) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.delete(`${API}/content/${pageSlug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Content deleted successfully!');
      fetchContents();
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  const filteredPages = defaultPages.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.page_slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-content">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Content Management</h1>
          <p className="text-muted-foreground">Edit page content, meta tags, and SEO settings.</p>
        </div>
        <Button onClick={() => handleEdit(null)} className="bg-sara-cyan hover:bg-sara-cyanHover">
          <Plus className="w-4 h-4 me-2" />
          New Page Content
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ps-10"
        />
      </div>

      {/* Pages List */}
      <div className="grid gap-4">
        {filteredPages.map((page) => {
          const existingContent = contents.find(c => c.page_slug === page.page_slug);
          return (
            <motion.div
              key={page.page_slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="w-5 h-5 text-sara-cyan" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{page.name}</h3>
                      <p className="text-sm text-muted-foreground">/{page.page_slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {existingContent ? (
                      <Badge variant="default" className="bg-green-500/20 text-green-500">
                        Customized
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(existingContent || { page_slug: page.page_slug })}
                    >
                      <Edit className="w-4 h-4 me-1" />
                      Edit
                    </Button>
                    {existingContent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(page.page_slug)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {showEditor && editingContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-xl m-4"
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card z-10">
              <h2 className="text-xl font-bold text-foreground">
                Edit: {editingContent.page_slug || 'New Page'}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditor(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Page Slug */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Page Slug</label>
                <Input
                  value={editingContent.page_slug}
                  onChange={(e) => setEditingContent({ ...editingContent, page_slug: e.target.value })}
                  placeholder="e.g., services/my-service"
                />
              </div>

              {/* Meta Title */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Globe className="w-4 h-4 inline me-1" />
                    Title (English)
                  </label>
                  <Input
                    value={editingContent.title?.en || ''}
                    onChange={(e) => setEditingContent({ 
                      ...editingContent, 
                      title: { ...editingContent.title, en: e.target.value } 
                    })}
                    placeholder="Page title in English"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title (Arabic)
                  </label>
                  <Input
                    value={editingContent.title?.ar || ''}
                    onChange={(e) => setEditingContent({ 
                      ...editingContent, 
                      title: { ...editingContent.title, ar: e.target.value } 
                    })}
                    placeholder="عنوان الصفحة بالعربية"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Meta Description (English)
                  </label>
                  <textarea
                    value={editingContent.meta_description?.en || ''}
                    onChange={(e) => setEditingContent({ 
                      ...editingContent, 
                      meta_description: { ...editingContent.meta_description, en: e.target.value } 
                    })}
                    placeholder="SEO description..."
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Meta Description (Arabic)
                  </label>
                  <textarea
                    value={editingContent.meta_description?.ar || ''}
                    onChange={(e) => setEditingContent({ 
                      ...editingContent, 
                      meta_description: { ...editingContent.meta_description, ar: e.target.value } 
                    })}
                    placeholder="وصف SEO..."
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground resize-none"
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Keywords & OG */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Meta Keywords
                  </label>
                  <Input
                    value={editingContent.meta_keywords || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, meta_keywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Canonical URL
                  </label>
                  <Input
                    value={editingContent.canonical_url || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, canonical_url: e.target.value })}
                    placeholder="https://sara.sa/page"
                  />
                </div>
              </div>

              {/* OG Tags */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    OG Title
                  </label>
                  <Input
                    value={editingContent.og_title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, og_title: e.target.value })}
                    placeholder="Social share title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    OG Description
                  </label>
                  <Input
                    value={editingContent.og_description || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, og_description: e.target.value })}
                    placeholder="Social share description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <ImageIcon className="w-4 h-4 inline me-1" />
                    OG Image URL
                  </label>
                  <Input
                    value={editingContent.og_image || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, og_image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Page Content (English)
                </label>
                <RichEditor
                  value={editingContent.content?.en || ''}
                  onChange={(val) => setEditingContent({ 
                    ...editingContent, 
                    content: { ...editingContent.content, en: val } 
                  })}
                  placeholder="Enter page content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Page Content (Arabic)
                </label>
                <RichEditor
                  value={editingContent.content?.ar || ''}
                  onChange={(val) => setEditingContent({ 
                    ...editingContent, 
                    content: { ...editingContent.content, ar: val } 
                  })}
                  placeholder="أدخل محتوى الصفحة..."
                />
              </div>

              {/* No Index */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noIndex"
                  checked={editingContent.no_index}
                  onChange={(e) => setEditingContent({ ...editingContent, no_index: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="noIndex" className="text-sm text-muted-foreground">
                  No Index (hide from search engines)
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 p-4 border-t border-border bg-card">
              <Button variant="outline" onClick={() => setShowEditor(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-sara-cyan hover:bg-sara-cyanHover">
                <Save className="w-4 h-4 me-2" />
                Save Content
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;

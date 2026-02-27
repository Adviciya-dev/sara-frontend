'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, Upload, Trash2, Copy, 
  Search, RefreshCw, CheckCircle, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.get(`${API}/images`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const token = localStorage.getItem('sara-admin-token');
      const response = await axios.post(`${API}/upload`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Image uploaded successfully!');
      fetchImages();
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.delete(`${API}/images/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Image deleted successfully!');
      fetchImages();
      if (selectedImage?.id === imageId) setSelectedImage(null);
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const handleUpdateAlt = async (imageId, altText) => {
    try {
      const token = localStorage.getItem('sara-admin-token');
      await axios.patch(`${API}/images/${imageId}?alt_text=${encodeURIComponent(altText)}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Alt text updated!');
      fetchImages();
    } catch (error) {
      toast.error('Failed to update alt text');
    }
  };

  const copyUrl = (filename) => {
    const url = `${API}/uploads/${filename}`;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredImages = images.filter(img => 
    img.original_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="admin-images">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Image Library</h1>
          <p className="text-muted-foreground">Upload and manage images for your website.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchImages}>
            <RefreshCw className="w-4 h-4 me-2" />
            Refresh
          </Button>
          <label>
            <Button as="span" className="bg-sara-cyan hover:bg-sara-cyanHover cursor-pointer" disabled={uploading}>
              {uploading ? (
                <RefreshCw className="w-4 h-4 me-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 me-2" />
              )}
              Upload Image
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ps-10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Image Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`group relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage?.id === image.id
                      ? 'border-sara-cyan'
                      : 'border-border hover:border-sara-cyan/50'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`${API}/uploads/${image.filename}`}
                    alt={image.alt_text || image.original_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => { e.stopPropagation(); copyUrl(image.filename); }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => { e.stopPropagation(); handleDelete(image.id); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {selectedImage?.id === image.id && (
                    <div className="absolute top-2 end-2">
                      <CheckCircle className="w-5 h-5 text-sara-cyan" />
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No images uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Image Details Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border sticky top-4">
            <CardHeader>
              <CardTitle>Image Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={`${API}/uploads/${selectedImage.filename}`}
                      alt={selectedImage.alt_text || selectedImage.original_name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Filename</label>
                      <p className="text-sm text-foreground truncate">{selectedImage.original_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Size</label>
                        <p className="text-sm text-foreground">{formatFileSize(selectedImage.file_size)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Type</label>
                        <p className="text-sm text-foreground">{selectedImage.mime_type}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">Uploaded</label>
                      <p className="text-sm text-foreground">
                        {new Date(selectedImage.uploaded_at).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Alt Text (SEO)</label>
                      <div className="flex gap-2">
                        <Input
                          value={selectedImage.alt_text || ''}
                          onChange={(e) => setSelectedImage({ ...selectedImage, alt_text: e.target.value })}
                          placeholder="Describe this image..."
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateAlt(selectedImage.id, selectedImage.alt_text)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Image URL</label>
                      <div className="flex gap-2">
                        <Input
                          value={`${API}/uploads/${selectedImage.filename}`}
                          readOnly
                          className="text-xs"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyUrl(selectedImage.filename)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDelete(selectedImage.id)}
                    >
                      <Trash2 className="w-4 h-4 me-2" />
                      Delete Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Select an image to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminImages;

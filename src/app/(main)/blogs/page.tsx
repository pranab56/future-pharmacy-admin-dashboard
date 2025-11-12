"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { format } from 'date-fns';
import { Bold, CalendarIcon, Edit, Italic, List, ListOrdered, Trash2, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

// Types
interface Blog {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
};

// ✅ Fixed Tiptap Editor Component (SSR-safe + fixed height + scroll)
const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ms-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ms-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'leading-relaxed',
          },
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none p-4 h-full overflow-y-auto',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false, // 👈 Critical for SSR
  });

  if (!isClient || !editor) {
    return (
      <div className="border rounded-md min-h-[300px] h-[300px] flex items-center justify-center text-gray-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border rounded-md bg-white flex flex-col h-[300px]">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            editor.isActive('bold') ? 'bg-gray-200' : '',
            'min-w-[40px]'
          )}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            editor.isActive('italic') ? 'bg-gray-200' : '',
            'min-w-[40px]'
          )}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            editor.isActive('bulletList') ? 'bg-gray-200' : '',
            'min-w-[40px]'
          )}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            editor.isActive('orderedList') ? 'bg-gray-200' : '',
            'min-w-[40px]'
          )}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="flex-1 overflow-y-auto"
      />
    </div>
  );
};

// Blog Card Component
const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden transition-all duration-300 p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-300 ${isHovered ? 'blur-sm' : ''}`}>
        <img
          src={blog.image.trim() || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
          <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
          <div
            className="text-sm text-gray-600 line-clamp-2 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </CardContent>
      </div>

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/20">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-12 h-12"
            onClick={() => onEdit(blog)}
          >
            <Edit className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="rounded-full w-12 h-12"
            onClick={() => onDelete(blog)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      )}
    </Card>
  );
};

// Main Blog Management App
export default function BlogManagementApp() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: 'Dear Doctor: Deborah Cobb, FNP-BC',
      date: '2024-11-05',
      description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada pellentesque vitae aliquet.</p><ul><li>List item one</li><li>List item two</li></ul><ol><li>Numbered item one</li><li>Numbered item two</li></ol>',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    },
    {
      id: 2,
      title: 'Dear Doctor: Deborah Cobb, FNP-BC',
      date: '2024-11-04',
      description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada pellentesque vitae aliquet.</p>',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    },
    {
      id: 3,
      title: 'Dear Doctor: Deborah Cobb, FNP-BC',
      date: '2024-11-03',
      description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada pellentesque vitae aliquet.</p>',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleCreateNew = () => {
    setCurrentBlog(null);
    setTitle('');
    setDate(undefined);
    setDescription('');
    setImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setTitle(blog.title);
    setDate(new Date(blog.date));
    setDescription(blog.description);
    setImage(blog.image);
    setIsModalOpen(true);
  };

  const handleDelete = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter(b => b.id !== blogToDelete.id));
    }
    setIsDeleteDialogOpen(false);
    setBlogToDelete(null);
  };

  const handleSave = () => {
    if (!title.trim() || !date || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const blogData: Blog = {
      id: currentBlog?.id || Date.now(),
      title,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      description,
      image: image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    };

    if (currentBlog) {
      setBlogs(blogs.map(b => b.id === currentBlog.id ? blogData : b));
    } else {
      setBlogs([...blogs, blogData]);
    }

    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={handleCreateNew} className="bg-[#8E4585] ">
          Create a New Blog
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* ✅ Fixed-Height Modal with Scrollable Editor */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="flex flex-col max-w-5xl w-full h-[90vh] max-h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>{currentBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                placeholder="Enter your title here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Description *</Label>
              <TiptapEditor content={description} onChange={setDescription} />
              <p className="text-sm text-gray-500">
                Use the toolbar to format your text with bold, italic, bullet lists, and numbered lists.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {image ? (
                  <div className="space-y-4">
                    <img
                      src={image}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded object-cover"
                    />
                    <div className="flex gap-2 justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Change Image
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setImage(null)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-purple-600" />
                    <p className="text-sm text-gray-600">
                      Drag and drop or click to upload (JPG or PNG, max 5MB)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Upload File
                    </Button>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t flex justify-between">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#8E4585]"
              disabled={!title.trim() || !date || !description.trim()}
            >
              {currentBlog ? 'Update Blog' : 'Create Blog'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-2xl">Delete Blog?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 sm:justify-center">
            <AlertDialogCancel className="flex-1 sm:flex-none bg-purple-100 text-[#8E4585] hover:bg-purple-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="flex-1 sm:flex-none bg-[#8E4585]"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
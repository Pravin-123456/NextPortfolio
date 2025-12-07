'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Id } from '@/convex/_generated/dataModel'
import { Trash2, Edit, Plus } from 'lucide-react'

const ContactPage = () => {
  // Contact Info State
  const contactInfo = useQuery(api.contact.get);
  const updateContact = useMutation(api.contact.update);
  
  const [contactForm, setContactForm] = useState({
    title: '',
    description: '',
    email: '',
    isActive: true,
  });

  useEffect(() => {
    if (contactInfo) {
      setContactForm({
        title: contactInfo.title,
        description: contactInfo.description,
        email: contactInfo.email,
        isActive: contactInfo.isActive,
      });
    }
  }, [contactInfo]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContact({
      id: contactInfo?._id,
      ...contactForm,
    });
    alert('Contact info updated!');
  };

  // Social Links State
  const socialLinks = useQuery(api.socialLinks.get);
  const createSocialLink = useMutation(api.socialLinks.create);
  const updateSocialLink = useMutation(api.socialLinks.update);
  const deleteSocialLink = useMutation(api.socialLinks.remove);

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<{ id: Id<"socialLinks"> | null, platform: string, url: string, icon: string, isActive: boolean }>({
    id: null,
    platform: '',
    url: '',
    icon: '',
    isActive: true,
  });

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink.id) {
      await updateSocialLink({
        id: editingLink.id,
        platform: editingLink.platform,
        url: editingLink.url,
        icon: editingLink.icon,
        isActive: editingLink.isActive,
      });
    } else {
      await createSocialLink({
        platform: editingLink.platform,
        url: editingLink.url,
        icon: editingLink.icon,
        isActive: editingLink.isActive,
      });
    }
    setIsLinkModalOpen(false);
    setEditingLink({ id: null, platform: '', url: '', icon: '', isActive: true });
  };

  const openEditModal = (link: any) => {
    setEditingLink({
      id: link._id,
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      isActive: link.isActive,
    });
    setIsLinkModalOpen(true);
  };

  const handleDeleteLink = async (id: Id<"socialLinks">) => {
    if (confirm('Are you sure you want to delete this link?')) {
      await deleteSocialLink({ id });
    }
  };

  return (
    <div className="space-y-10 p-6">
      {/* Contact Info Section */}
      <section className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Contact Section Details</h2>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={contactForm.title} 
                onChange={(e) => setContactForm({...contactForm, title: e.target.value})}
                placeholder="Get in Touch"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={contactForm.email} 
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                placeholder="contact@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={contactForm.description} 
              onChange={(e) => setContactForm({...contactForm, description: e.target.value})}
              placeholder="Description text..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              checked={contactForm.isActive}
              onCheckedChange={(checked) => setContactForm({...contactForm, isActive: checked})}
            />
            <Label>Section Active</Label>
          </div>
          <Button type="submit">Save Contact Info</Button>
        </form>
      </section>

      {/* Social Links Section */}
      <section className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Social Links</h2>
          <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingLink({ id: null, platform: '', url: '', icon: '', isActive: true })}>
                <Plus className="w-4 h-4 mr-2" /> Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink.id ? 'Edit Link' : 'Add New Link'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLinkSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input 
                    value={editingLink.platform}
                    onChange={(e) => setEditingLink({...editingLink, platform: e.target.value})}
                    placeholder="GitHub"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input 
                    value={editingLink.url}
                    onChange={(e) => setEditingLink({...editingLink, url: e.target.value})}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Icon Name (Lucide React)</Label>
                  <Input 
                    value={editingLink.icon}
                    onChange={(e) => setEditingLink({...editingLink, icon: e.target.value})}
                    placeholder="Github"
                  />
                  <p className="text-xs text-gray-500">Use exact component names from Lucide React (e.g., Github, Linkedin, Twitter)</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={editingLink.isActive}
                    onCheckedChange={(checked) => setEditingLink({...editingLink, isActive: checked})}
                  />
                  <Label>Active</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingLink.id ? 'Update Link' : 'Create Link'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableCaption>Manage your social media links</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialLinks?.map((link) => (
              <TableRow key={link._id}>
                <TableCell className="font-medium">{link.platform}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {link.url}
                  </a>
                </TableCell>
                <TableCell>{link.icon}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${link.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {link.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditModal(link)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteLink(link._id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {socialLinks?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No social links found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}

export default ContactPage
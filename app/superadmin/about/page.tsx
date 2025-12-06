'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Modal from '@/components/ui/modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { Plus } from 'lucide-react'

interface AboutFormData {
  title: string
  description: string
  resume: string
  isActive: boolean
}

const AboutPage = () => {
  const aboutList = useQuery(api.about.getAbout)
  const addAbout = useMutation(api.about.addAbout)
  const updateAbout = useMutation(api.about.updateAbout)
  const deleteAbout = useMutation(api.about.deleteAbout)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingAbout, setEditingAbout] = useState<{ _id: Id<"about"> } & AboutFormData | null>(null)
  const [deletingAboutId, setDeletingAboutId] = useState<Id<"about"> | null>(null)
  
  const [formData, setFormData] = useState<AboutFormData>({
    title: '',
    description: '',
    resume: '',
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      resume: '',
      isActive: true,
    })
    setEditingAbout(null)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (about: any) => {
    setEditingAbout(about)
    setFormData({
      title: about.title,
      description: about.description,
      resume: about.resume,
      isActive: about.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const aboutData = {
      title: formData.title,
      description: formData.description,
      resume: formData.resume,
      isActive: formData.isActive,
    }

    try {
      if (editingAbout) {
        await updateAbout({
          _id: editingAbout._id,
          ...aboutData,
        })
      } else {
        await addAbout(aboutData)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving about:', error)
    }
  }

  const handleOpenDeleteModal = (aboutId: Id<"about">) => {
    setDeletingAboutId(aboutId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingAboutId) {
      try {
        await deleteAbout({ _id: deletingAboutId })
        setIsDeleteModalOpen(false)
        setDeletingAboutId(null)
      } catch (error) {
        console.error('Error deleting about:', error)
      }
    }
  }

  if (!aboutList) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">About Section</h2>
        <Button onClick={handleOpenAddModal} className='cursor-pointer'><Plus /> Add About</Button>
      </div>
      
      <Table className='mx-auto mt-10'>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Resume</TableHead>
            <TableHead className='text-center'>Is Active</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aboutList.map((about) => (
            <TableRow key={about._id}>
              <TableCell className='text-center'>{about.title}</TableCell>
              <TableCell className='text-center'>
                {about.description.length > 50 
                  ? about.description.slice(0, 50) + "..." 
                  : about.description}
              </TableCell>
              <TableCell className='text-center'>
                <a href={about.resume} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              </TableCell>
              <TableCell className='text-center'>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  about.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {about.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleOpenEditModal(about)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="cursor-pointer"
                  onClick={() => handleOpenDeleteModal(about._id)}
                >
                  Delete
                </Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={editingAbout ? 'Edit About' : 'Add New About'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              required
              placeholder="e.g., Hey, I'm Pravin."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              required
              placeholder="About description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resume URL</label>
            <Input
              required
              placeholder="https://..."
              value={formData.resume}
              onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
              Active (visible on about page)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingAbout ? 'Update About' : 'Add About'}
            </Button>
            <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete About Entry"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this about entry? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
              className="flex-1"
            >
              Delete
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AboutPage
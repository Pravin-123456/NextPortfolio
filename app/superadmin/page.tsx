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

interface HeroTextFormData {
  isActive: boolean
  title: string
  subtitle: string
  description: string
}

export default function SuperadminHome() {
  const heroTextList = useQuery(api.heroText.getHeroText)
  const addHeroText = useMutation(api.heroText.addHeroText)
  const updateHeroText = useMutation(api.heroText.updateHeroText)
  const deleteHeroText = useMutation(api.heroText.deleteHeroText)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingHeroText, setEditingHeroText] = useState<{ _id: Id<"heroText"> } & HeroTextFormData | null>(null)
  const [deletingHeroTextId, setDeletingHeroTextId] = useState<Id<"heroText"> | null>(null)
  
  const [formData, setFormData] = useState<HeroTextFormData>({
    isActive: true,
    title: '',
    subtitle: '',
    description: '',
  })

  const resetForm = () => {
    setFormData({
      isActive: true,
      title: '',
      subtitle: '',
      description: '',
    })
    setEditingHeroText(null)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (heroText: any) => {
    setEditingHeroText(heroText)
    setFormData({
      isActive: heroText.isActive,
      title: heroText.title,
      subtitle: heroText.subtitle,
      description: heroText.description,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingHeroText) {
        await updateHeroText({
          _id: editingHeroText._id,
          ...formData,
        })
      } else {
        await addHeroText(formData)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving hero text:', error)
    }
  }

  const handleOpenDeleteModal = (heroTextId: Id<"heroText">) => {
    setDeletingHeroTextId(heroTextId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingHeroTextId) {
      try {
        await deleteHeroText({ _id: deletingHeroTextId })
        setIsDeleteModalOpen(false)
        setDeletingHeroTextId(null)
      } catch (error) {
        console.error('Error deleting hero text:', error)
      }
    }
  }

  if (!heroTextList) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hero Text</h2>
        <Button onClick={handleOpenAddModal} className='cursor-pointer'><Plus /> Add Hero Text</Button>
      </div>
      
      <Table className='mx-auto mt-10'>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Subtitle</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {heroTextList.map((heroText) => (
            <TableRow key={heroText._id}>
              <TableCell className='text-center'>
                <span className={`px-2 py-1 rounded-full text-xs ${heroText.isActive ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                  {heroText.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className='text-center'>{heroText.title}</TableCell>
              <TableCell className='text-center'>{heroText.subtitle}</TableCell>
              <TableCell className='text-center'>
                {heroText.description.length > 50 
                  ? heroText.description.slice(0, 50) + "..." 
                  : heroText.description}
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleOpenEditModal(heroText)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="cursor-pointer"
                  onClick={() => handleOpenDeleteModal(heroText._id)}
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
        title={editingHeroText ? 'Edit Hero Text' : 'Add New Hero Text'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium">Active</label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              required
              placeholder="e.g., Hi I'M PRAVIN"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              required
              placeholder="e.g., MERN DEV"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              required
              placeholder="I ship pixel-perfect, lightning-fast web apps that feel like magic."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingHeroText ? 'Update Hero Text' : 'Add Hero Text'}
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
        title="Delete Hero Text"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this hero text? This action cannot be undone.</p>
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
  );
}

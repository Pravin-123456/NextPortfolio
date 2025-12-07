'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { Plus } from 'lucide-react'

interface ServiceFormData {
  name: string
  description: string
  position: string
  isActive: boolean
}

const ServicesPage = () => {
  const servicesList = useQuery(api.services.getServices)
  const addService = useMutation(api.services.addService)
  const updateService = useMutation(api.services.updateService)
  const deleteService = useMutation(api.services.deleteService)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<{ _id: Id<"services"> } & ServiceFormData | null>(null)
  const [deletingServiceId, setDeletingServiceId] = useState<Id<"services"> | null>(null)
  
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    position: '1',
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      position: '1',
      isActive: true,
    })
    setEditingService(null)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (service: any) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      position: service.position,
      isActive: service.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const serviceData = {
      name: formData.name,
      description: formData.description,
      position: formData.position,
      isActive: formData.isActive,
    }

    try {
      if (editingService) {
        await updateService({
          _id: editingService._id,
          ...serviceData,
        })
      } else {
        await addService(serviceData)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving service:', error)
    }
  }

  const handleOpenDeleteModal = (serviceId: Id<"services">) => {
    setDeletingServiceId(serviceId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingServiceId) {
      try {
        await deleteService({ _id: deletingServiceId })
        setIsDeleteModalOpen(false)
        setDeletingServiceId(null)
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  if (!servicesList) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button onClick={handleOpenAddModal} className='cursor-pointer'><Plus /> Add Service</Button>
      </div>
      
      <Table className='mx-auto mt-10'>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Position</TableHead>
            <TableHead className='text-center'>Is Active</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicesList.map((service) => (
            <TableRow key={service._id}>
              <TableCell className='text-center'>{service.name}</TableCell>
              <TableCell className='text-center'>
                {service.description.length > 50 
                  ? service.description.slice(0, 50) + "..." 
                  : service.description}
              </TableCell>
              <TableCell className='text-center'>{service.position}</TableCell>
              <TableCell className='text-center'>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  service.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleOpenEditModal(service)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="cursor-pointer"
                  onClick={() => handleOpenDeleteModal(service._id)}
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
        title={editingService ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <Input
              required
              placeholder="e.g., Web Development"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              placeholder="Describe the service..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position (for ordering)</label>
            <Input
              required
              type="text"
              placeholder="1"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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
              Active (visible on services page)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingService ? 'Update Service' : 'Add Service'}
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
        title="Delete Service"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this service? This action cannot be undone.</p>
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

export default ServicesPage

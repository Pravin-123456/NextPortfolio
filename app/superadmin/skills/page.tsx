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

interface SkillFormData {
  name: string
  icon: string
  percentage: number
  position: string
  isActive: boolean
}

const SkillsPage = () => {
  const skillsList = useQuery(api.skills.getSkills)
  const addSkill = useMutation(api.skills.addSkill)
  const updateSkill = useMutation(api.skills.updateSkill)
  const deleteSkill = useMutation(api.skills.deleteSkill)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<{ _id: Id<"skills"> } & SkillFormData | null>(null)
  const [deletingSkillId, setDeletingSkillId] = useState<Id<"skills"> | null>(null)
  
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    icon: '',
    percentage: 0,
    position: 'left',
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      percentage: 0,
      position: 'left',
      isActive: true,
    })
    setEditingSkill(null)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (skill: any) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      icon: skill.icon,
      percentage: skill.percentage,
      position: skill.position,
      isActive: skill.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const skillData = {
      name: formData.name,
      icon: formData.icon,
      percentage: formData.percentage,
      position: formData.position,
      isActive: formData.isActive,
    }

    try {
      if (editingSkill) {
        await updateSkill({
          _id: editingSkill._id,
          ...skillData,
        })
      } else {
        await addSkill(skillData)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  const handleOpenDeleteModal = (skillId: Id<"skills">) => {
    setDeletingSkillId(skillId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingSkillId) {
      try {
        await deleteSkill({ _id: deletingSkillId })
        setIsDeleteModalOpen(false)
        setDeletingSkillId(null)
      } catch (error) {
        console.error('Error deleting skill:', error)
      }
    }
  }

  if (!skillsList) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button onClick={handleOpenAddModal} className='cursor-pointer'><Plus /> Add Skill</Button>
      </div>
      
      <Table className='mx-auto mt-10'>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Icon</TableHead>
            <TableHead className='text-center'>Percentage</TableHead>
            <TableHead className='text-center'>Position</TableHead>
            <TableHead className='text-center'>Is Active</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skillsList.map((skill) => (
            <TableRow key={skill._id}>
              <TableCell className='text-center'>{skill.name}</TableCell>
              <TableCell className='text-center'>
                <img src={skill.icon} alt={skill.name} className="w-8 h-8 mx-auto" />
              </TableCell>
              <TableCell className='text-center'>{skill.percentage}%</TableCell>
              <TableCell className='text-center capitalize'>{skill.position}</TableCell>
              <TableCell className='text-center'>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  skill.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {skill.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleOpenEditModal(skill)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="cursor-pointer"
                  onClick={() => handleOpenDeleteModal(skill._id)}
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
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skill Name</label>
            <Input
              required
              placeholder="e.g., React"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon URL</label>
            <Input
              required
              placeholder="https://..."
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Percentage (0-100)</label>
            <Input
              required
              type="number"
              min="0"
              max="100"
              placeholder="90"
              value={formData.percentage}
              onChange={(e) => setFormData({ ...formData, percentage: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <select
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
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
              Active (visible on skills page)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingSkill ? 'Update Skill' : 'Add Skill'}
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
        title="Delete Skill"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this skill? This action cannot be undone.</p>
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

export default SkillsPage
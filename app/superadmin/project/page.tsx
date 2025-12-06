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

interface ProjectFormData {
  id: string
  title: string
  description: string
  tech: string
  image: string
  liveUrl: string
  githubUrl: string
  isActive: boolean
}

const ProjectsPage = () => {
  const projectsList = useQuery(api.projects.getProject)
  const addProject = useMutation(api.projects.addProject)
  const updateProject = useMutation(api.projects.updateProject)
  const deleteProject = useMutation(api.projects.deleteProject)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<{ _id: Id<"projects"> } & ProjectFormData | null>(null)
  const [deletingProjectId, setDeletingProjectId] = useState<Id<"projects"> | null>(null)
  
  const [formData, setFormData] = useState<ProjectFormData>({
    id: '',
    title: '',
    description: '',
    tech: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      tech: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      isActive: true,
    })
    setEditingProject(null)
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (project: any) => {
    setEditingProject(project)
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      image: project.image,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      isActive: project.isActive ?? true,
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()),
      image: formData.image,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      isActive: formData.isActive,
    }

    try {
      if (editingProject) {
        await updateProject({
          _id: editingProject._id,
          ...projectData,
        })
      } else {
        await addProject(projectData)
      }
      handleCloseModal()
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleOpenDeleteModal = (projectId: Id<"projects">) => {
    setDeletingProjectId(projectId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deletingProjectId) {
      try {
        await deleteProject({ _id: deletingProjectId })
        setIsDeleteModalOpen(false)
        setDeletingProjectId(null)
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  if (!projectsList) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleOpenAddModal} className='cursor-pointer'><Plus /> Add Project</Button>
      </div>
      
      <Table className='mx-auto mt-10'>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Is Active</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsList.map((project) => (
            <TableRow key={project._id}>
              <TableCell className='text-center'>{project.id}</TableCell>
              <TableCell className='text-center'>{project.title}</TableCell>
              <TableCell className='text-center'>
                {project.description.length > 50 
                  ? project.description.slice(0, 50) + "..." 
                  : project.description}
              </TableCell>
              <TableCell className='text-center'>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  project.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                  {project.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleOpenEditModal(project)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  className="cursor-pointer"
                  onClick={() => handleOpenDeleteModal(project._id)}
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
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Project ID</label>
            <Input
              required
              placeholder="e.g., grossy"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              disabled={!!editingProject}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              required
              placeholder="e.g., GROSSY"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              required
              placeholder="Project description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tech Stack (comma-separated)</label>
            <Input
              required
              placeholder="e.g., Next.js, Stripe, Supabase"
              value={formData.tech}
              onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              required
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Live URL</label>
            <Input
              required
              placeholder="https://..."
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <Input
              required
              placeholder="https://github.com/..."
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
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
              Active (visible on portfolio)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingProject ? 'Update Project' : 'Add Project'}
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
        title="Delete Project"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this project? This action cannot be undone.</p>
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

export default ProjectsPage
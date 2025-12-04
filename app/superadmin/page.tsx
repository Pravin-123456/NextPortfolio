'use client'

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/ui/modal";
import { Edit, Layout, User, Code, Briefcase, Wrench, Share2 } from "lucide-react";

// Shared input styles
const inputClass = "border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md";
const textareaClass = "border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md";

type ModalType = 'hero' | 'about' | 'skills' | 'projects' | 'services' | 'socials' | null;

export default function PortfolioAdmin() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const SummaryCard = ({ title, icon: Icon, onClick }: { title: string, icon: any, onClick: () => void }) => (
    <Card 
      onClick={onClick}
      className="group p-6 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 h-48"
    >
      <div className="p-4 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors">
        <Icon className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors">{title}</h3>
      <span className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-purple-600">
        <Edit className="w-3 h-3" /> Edit Section
      </span>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-blue-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-600">Manage your portfolio content from one place</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard title="Hero Section" icon={Layout} onClick={() => openModal('hero')} />
          <SummaryCard title="About Section" icon={User} onClick={() => openModal('about')} />
          <SummaryCard title="Skills" icon={Code} onClick={() => openModal('skills')} />
          <SummaryCard title="Projects" icon={Briefcase} onClick={() => openModal('projects')} />
          <SummaryCard title="Services" icon={Wrench} onClick={() => openModal('services')} />
          <SummaryCard title="Social Links" icon={Share2} onClick={() => openModal('socials')} />
        </div>

        {/* Modals */}
        
        {/* Hero Modal */}
        <Modal isOpen={activeModal === 'hero'} onClose={closeModal} title="Edit Hero Section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Your Name" className={inputClass} />
            <Input placeholder="Title (e.g. Web Developer)" className={inputClass} />
            <Input placeholder="Tagline" className={inputClass} />
          </div>
          <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            Save Hero Section
          </Button>
        </Modal>

        {/* About Modal */}
        <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="Edit About Section">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Me Description</label>
              <Textarea 
                placeholder="I turn ideas into fast, beautiful web apps..." 
                rows={6}
                className={`${textareaClass} resize-none`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV (PDF)</label>
              <Input 
                type="file" 
                accept=".pdf"
                className={`${inputClass} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
              />
              <p className="text-xs text-gray-500 mt-1">Upload your CV as a PDF file</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              Save About
            </Button>
            <Button variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:scale-[1.01] transition-all duration-300 shadow-md hover:shadow-lg">
              Preview CV
            </Button>
          </div>
        </Modal>

        {/* Skills Modal */}
        <Modal isOpen={activeModal === 'skills'} onClose={closeModal} title="Manage Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Skill name (e.g. Next.js)" className={inputClass} />
            <Input placeholder="Icon URL (e.g. https://cdn.jsdelivr.net/...)" className={inputClass} />
            <Input type="number" placeholder="Proficiency % (0-100)" min="0" max="100" className={inputClass} />
            <div className="flex items-center gap-2 p-2 border-2 border-gray-100 rounded-lg bg-white/50">
              <input type="checkbox" id="isCenter" className="w-4 h-4 accent-purple-600 cursor-pointer" />
              <label htmlFor="isCenter" className="text-sm text-gray-700 cursor-pointer font-medium">Mark as Center Skill</label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              Add Skill
            </Button>
            <Button variant="secondary" className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
              Update
            </Button>
            <Button variant="destructive" className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              Delete
            </Button>
          </div>
        </Modal>

        {/* Projects Modal */}
        <Modal isOpen={activeModal === 'projects'} onClose={closeModal} title="Manage Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Project Title (e.g. GROSSY)" className={`${inputClass} col-span-1 md:col-span-2`} />
            <Textarea 
              placeholder="Description (e.g. Full-stack Next.js + Stripe e-commerce store...)" 
              rows={4}
              className={`${textareaClass} col-span-1 md:col-span-2`}
            />
            <Input placeholder="Tech Stack (comma-separated)" className={`${inputClass} col-span-1 md:col-span-2`} />
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
              <Input 
                type="file" 
                accept="image/*" 
                className={`${inputClass} cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100`}
              />
            </div>
            <Input placeholder="Live URL" className={inputClass} />
            <Input placeholder="GitHub URL" className={inputClass} />
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              Add Project
            </Button>
            <Button variant="secondary" className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
              Update
            </Button>
            <Button variant="destructive" className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              Delete
            </Button>
          </div>
        </Modal>

        {/* Services Modal */}
        <Modal isOpen={activeModal === 'services'} onClose={closeModal} title="Edit Services">
          <div className="grid grid-cols-1 gap-4">
            <Input placeholder="Service Title" className={inputClass} />
            <Textarea placeholder="Service Description" rows={4} className={textareaClass} />
          </div>
          <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            Save Service
          </Button>
        </Modal>

        {/* Socials Modal */}
        <Modal isOpen={activeModal === 'socials'} onClose={closeModal} title="Edit Social Links">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <Input placeholder="https://github.com/username" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <Input placeholder="https://www.linkedin.com/in/username" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <Input placeholder="https://instagram.com/username" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gmail</label>
              <Input placeholder="mailto:contact@example.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <Input placeholder="https://facebook.com/username" className={inputClass} />
            </div>
          </div>
          <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
            Save Social Links
          </Button>
        </Modal>

      </div>
    </div>
  );
}

'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const page = () => {
  // Mock data for skills
  const skillsData = [
    { id: '1', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 90, position: 'Left' },
    { id: '2', name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percentage: 85, position: 'Left' },
    { id: '3', name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', percentage: 95, position: 'Center' },
    { id: '4', name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', percentage: 95, position: 'Right' },
    { id: '5', name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', percentage: 85, position: 'Right' },
  ]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button>+ Add Skill</Button>
      </div>
      <Table className='mx-auto mt-10'>
        <TableCaption>Skills Table</TableCaption>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Icon</TableHead>
            <TableHead className='text-center'>Percentage</TableHead>
            <TableHead className='text-center'>Position</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skillsData.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell className='text-center'>{skill.id}</TableCell>
              <TableCell className='text-center'>{skill.name}</TableCell>
              <TableCell className='text-center'>
                <img src={skill.icon} alt={skill.name} className="w-8 h-8 mx-auto" />
              </TableCell>
              <TableCell className='text-center'>{skill.percentage}%</TableCell>
              <TableCell className='text-center'>{skill.position}</TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default page
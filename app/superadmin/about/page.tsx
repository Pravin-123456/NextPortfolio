'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const page = () => {
  // Mock data for about section
  const aboutData = [
    {
      id: '1',
      title: "Hey, I'm Pravin.",
      description: "I turn ideas into fast, beautiful web apps that don't break when real people use them. React + Next.js on the front, Node.js magic in the back. Clean code, happy users — that's my thing.",
      cvUrl: '/cv/pravin-cv.pdf',
    }
  ]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">About Section</h2>
        <Button>+ Add About</Button>
      </div>
      <Table className='mx-auto mt-10'>
        <TableCaption>About Section Table</TableCaption>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>CV</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aboutData.map((about) => (
            <TableRow key={about.id}>
              <TableCell className='text-center'>{about.id}</TableCell>
              <TableCell className='text-center'>{about.title}</TableCell>
              <TableCell className='text-center'>
                {about.description.length > 50 
                  ? about.description.slice(0, 50) + "..." 
                  : about.description}
              </TableCell>
              <TableCell className='text-center'>
                <a href={about.cvUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  View CV
                </a>
              </TableCell>
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
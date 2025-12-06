'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const page = () => {
  // Mock data for hero section
  const heroData = [
    {
      id: '1',
      name: 'PRAVIN',
      title: 'MERN DEV',
      tagline: 'I ship pixel-perfect, lightning-fast web apps that feel like magic.',
    }
  ]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Hero Section</h2>
        <Button>+ Add Hero</Button>
      </div>
      <Table className='mx-auto mt-10'>
        <TableCaption>Hero Section Table</TableCaption>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Tagline</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {heroData.map((hero) => (
            <TableRow key={hero.id}>
              <TableCell className='text-center'>{hero.id}</TableCell>
              <TableCell className='text-center'>{hero.name}</TableCell>
              <TableCell className='text-center'>{hero.title}</TableCell>
              <TableCell className='text-center'>
                {hero.tagline.length > 50 
                  ? hero.tagline.slice(0, 50) + "..." 
                  : hero.tagline}
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
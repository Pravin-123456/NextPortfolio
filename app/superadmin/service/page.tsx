'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const page = () => {
  // Mock data for services
  const servicesData = [
    {
      id: '1',
      name: 'UI/UX Design',
      description: 'Designing intuitive interfaces that users love. I focus on accessibility, visual hierarchy, and seamless interactions to boost engagement.',
    },
    {
      id: '2',
      name: 'API Integration',
      description: 'Connecting your applications with third-party services and building robust RESTful APIs to ensure smooth data flow and functionality.',
    },
    {
      id: '3',
      name: 'Performance Optimization',
      description: 'Speed matters. I optimize applications for maximum performance, ensuring fast load times and smooth experiences across all devices.',
    },
  ]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Services</h2>
        <Button>+ Add Service</Button>
      </div>
      <Table className='mx-auto mt-10'>
        <TableCaption>Services Table</TableCaption>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servicesData.map((service) => (
            <TableRow key={service.id}>
              <TableCell className='text-center'>{service.id}</TableCell>
              <TableCell className='text-center'>{service.name}</TableCell>
              <TableCell className='text-center'>
                {service.description.length > 50 
                  ? service.description.slice(0, 50) + "..." 
                  : service.description}
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

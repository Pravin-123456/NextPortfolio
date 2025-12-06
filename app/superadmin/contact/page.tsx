'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const page = () => {
  // Mock data for social links
  const socialLinksData = [
    { id: '1', platform: 'GitHub', url: 'https://github.com/Pravin-123456', icon: 'Github' },
    { id: '2', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/pravin-m-a7066622a/', icon: 'Linkedin' },
    { id: '3', platform: 'Instagram', url: '#', icon: 'Instagram' },
    { id: '4', platform: 'Gmail', url: 'mailto:contact@pravin.dev', icon: 'Mail' },
    { id: '5', platform: 'Facebook', url: '#', icon: 'Facebook' },
  ]

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Contact & Social Links</h2>
        <Button>+ Add Link</Button>
      </div>
      <Table className='mx-auto mt-10'>
        <TableCaption>Social Links Table</TableCaption>
        <TableHeader className='text-center'>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Platform</TableHead>
            <TableHead className='text-center'>URL</TableHead>
            <TableHead className='text-center'>Icon</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialLinksData.map((link) => (
            <TableRow key={link.id}>
              <TableCell className='text-center'>{link.id}</TableCell>
              <TableCell className='text-center'>{link.platform}</TableCell>
              <TableCell className='text-center'>
                <a href={link.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {link.url.length > 30 ? link.url.slice(0, 30) + "..." : link.url}
                </a>
              </TableCell>
              <TableCell className='text-center'>{link.icon}</TableCell>
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
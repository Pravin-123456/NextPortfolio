'use client';

import { Home, User, Code, Briefcase, Phone, Wrench } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const AppSidebar = () => {

    const admin = "/superadmin";

    interface SidebarItem {
        title: string;
        href: string;
        icon: any;
    }

    const projects = useQuery(api.projects.getProject);
    const projectCount = projects ? projects.length : 0;

    const sidebarItems: SidebarItem[] = [
        {
            title: "Home",
            href: `${admin}/`,
            icon: Home,
        },
        {
            title: "About",
            href: `${admin}/about`,
            icon: User,
        },
        {
            title: "Skills",
            href: `${admin}/skills`,
            icon: Code,
        },
        {
            title: `Projects (${projectCount})`,
            href: `${admin}/project`,
            icon: Briefcase,
        },
        {
            title: "Service",
            href: `${admin}/service`,
            icon: Wrench,
        },
        {
            title: "Contact",
            href: `${admin}/contact`,
            icon: Phone,
        },
    ]   

  return (
    <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href='/'><h2 className='text-lg font-bold'>Pravin <span className='text-purple-500'>Portfolio</span></h2></Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {sidebarItems.map((item, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>

        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
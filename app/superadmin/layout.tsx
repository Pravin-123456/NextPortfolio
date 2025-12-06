'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import AppSidebar from '@/components/AppSidebar';

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </SidebarProvider>
    </div>
  );
}

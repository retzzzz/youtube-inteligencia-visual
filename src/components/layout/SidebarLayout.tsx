
import React from 'react';
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { Home, Search, Film, Type, ScrollText, FileCheck, Activity } from 'lucide-react';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen overflow-visible">
        <Sidebar className="shrink-0">
          <SidebarHeader className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-semibold">YTAnalyzerPro</h2>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <Home className="mr-2" />
                        <span>Início</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/search" className="flex items-center">
                        <Search className="mr-2" />
                        <span>Pesquisar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/video-analyzer" className="flex items-center">
                        <Film className="mr-2" />
                        <span>Analisar Vídeo</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/title-generator" className="flex items-center">
                        <Type className="mr-2" />
                        <span>Títulos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/script-generator" className="flex items-center">
                        <ScrollText className="mr-2" />
                        <span>Roteirizador</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/subnicho-validator" className="flex items-center">
                        <FileCheck className="mr-2" />
                        <span>Validador</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/micro-subnicho-analyzer" className="flex items-center">
                        <Activity className="mr-2" />
                        <span>Micro Subnichos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="w-full">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;

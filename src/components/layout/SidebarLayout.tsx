
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
      <div className="flex w-full min-h-screen" style={{ pointerEvents: 'auto' }}>
        <Sidebar>
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
                      <Link to="/dashboard" style={{ pointerEvents: 'auto' }}>
                        <Home className="mr-2" />
                        <span>Início</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/search" style={{ pointerEvents: 'auto' }}>
                        <Search className="mr-2" />
                        <span>Pesquisar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/video-analyzer" style={{ pointerEvents: 'auto' }}>
                        <Film className="mr-2" />
                        <span>Analisar Vídeo</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/title-generator" style={{ pointerEvents: 'auto' }}>
                        <Type className="mr-2" />
                        <span>Títulos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/script-generator" style={{ pointerEvents: 'auto' }}>
                        <ScrollText className="mr-2" />
                        <span>Roteirizador</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/subnicho-validator" style={{ pointerEvents: 'auto' }}>
                        <FileCheck className="mr-2" />
                        <span>Validador</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/micro-subnicho-analyzer" style={{ pointerEvents: 'auto' }}>
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
        <SidebarInset style={{ pointerEvents: 'auto' }}>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;

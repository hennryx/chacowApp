import { accessRoutes } from './config/access.config';
import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/views/profile/profile.component';
import { MaterialsDocumentsComponent } from './pages/views/admin/materials-documents/materials-documents.component';
import { ResearchPaperComponent } from './pages/views/admin/research-paper/research-paper.component';
import { UserManagementComponent } from './pages/views/admin/user-management/user-management.component';
import { DashboardComponent } from './pages/views/users/dashboard/dashboard.component';


export const componentMap: any = {
    /* globals */
    ProfileComponent,
    /* admin comps */
    MaterialsDocumentsComponent,
    ResearchPaperComponent,
    UserManagementComponent,
    /* users */
    DashboardComponent
};

export function generateRoutes(role: string): Routes {
    const roleRoutes = accessRoutes[role] || [];
    return roleRoutes.map((route: any) => ({
        path: route.path,
        component: componentMap[route.component],
        data: { title: route.title },
    }));
}

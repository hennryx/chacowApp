import { accessRoutes } from './config/access.config';
import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/views/profile/profile.component';
import { MaterialsDocumentsComponent } from './pages/views/admin/materials-documents/materials-documents.component';
import { ResearchPaperComponent } from './pages/views/admin/research-paper/research-paper.component';
import { UserManagementComponent } from './pages/views/admin/user-management/user-management.component';


export const componentMap: any = {
    /* globals */
    ProfileComponent,
    /* admin comps */
    MaterialsDocumentsComponent,
    ResearchPaperComponent,
    UserManagementComponent
};

export function generateRoutes(role: string): Routes {
    const roleRoutes = accessRoutes[role] || [];
    return roleRoutes.map((route: any) => ({
        path: route.path,
        component: componentMap[route.component],
        data: { title: route.title },
    }));
}

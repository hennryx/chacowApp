import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/views/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { PublicLayoutComponent } from './pages/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './pages/private-layout/private-layout.component';
import { ResearchPaperComponent } from './pages/views/admin/research-paper/research-paper.component';
import { MaterialsDocumentsComponent } from './pages/views/admin/materials-documents/materials-documents.component';
import { UserManagementComponent } from './pages/views/admin/user-management/user-management.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        data: { title: 'Atete' },
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
        ]
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        children: [
            /* all roles */
            {
                path: "profile", 
                component: ProfileComponent, 
                canActivate: [authGuard],
                data: { roles: ['admin', 'teacher', 'student'] },
            },

            /* admin routes */
            {
                path: "research",
                component: ResearchPaperComponent,
                canActivate: [authGuard],
                data: { roles: ['admin'] },
            },
            {
                path: "materials",
                component: MaterialsDocumentsComponent,
                canActivate: [authGuard],
                data: { roles: ['admin'] },
            },
            {
                path: "users",
                component: UserManagementComponent,
                canActivate: [authGuard],
                data: { roles: ['admin'] },
            },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

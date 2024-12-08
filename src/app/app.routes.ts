import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/views/dashboard/dashboard.component';
import { ReportsComponent } from './pages/views/reports/reports.component';
import { AttendanceComponent } from './pages/views/attendance/attendance.component';
import { TeachersComponent } from './pages/views/teachers/teachers.component';
import { SchedulesComponent } from './pages/views/schedules/schedules.component';
import { SubjectsComponent } from './pages/views/subjects/subjects.component';
import { ProfileComponent } from './pages/views/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { PublicLayoutComponent } from './pages/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './pages/private-layout/private-layout.component';
import { BatchComponent } from './pages/views/batch/batch.component';
import { DepartmentComponent } from './pages/views/department/department.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        data: { title: 'Atete' },
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full'},
        ]
    },
    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],  // Protect private routes
        children: [
            {path: "dashboard", component: DashboardComponent, canActivate: [authGuard]},
            {path: "reports", component: ReportsComponent, canActivate: [authGuard]},
            {path: "attendance", component: AttendanceComponent, canActivate: [authGuard]},
            {path: "teachers", component: TeachersComponent, canActivate: [authGuard]},
            {path: "schedules", component: SchedulesComponent, canActivate: [authGuard]},
            {path: "subjects", component: SubjectsComponent, canActivate: [authGuard]},
            {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
            {path: "batch", component: BatchComponent, canActivate: [authGuard]},
            {path: "department", component: DepartmentComponent, canActivate: [authGuard]},
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

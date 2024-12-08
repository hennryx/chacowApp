// src/app/config/access.config.ts
export const accessRoutes: any = {
    admin: [
        { path: "research", title: "Research papers", component: 'ResearchPaperComponent', icon: 'pi pi-file' },
        { path: "materials", title: "Materials and documents", component: 'MaterialsDocumentsComponent', icon: 'pi pi-folder' },
        { path: "users", title: " User management", component: 'UserManagementComponent', icon: 'pi pi-users' },
        { path: "profile", title: "Profile", component: 'ProfileComponent', icon: 'pi pi-user' },
    ],
    student: [
        { path: "dashboard", title: "Dashboard", component: 'DashboardComponent', icon: 'pi pi-home' },
        { path: "profile", title: "Profile", component: 'ProfileComponent', icon: 'pi pi-user' },
    ],
    teacher: [
        { path: "dashboard", title: "Dashboard", component: 'DashboardComponent', icon: 'pi pi-home' },
        { path: "reports", title: "Reports", component: 'ReportsComponent', icon: 'pi pi-chart-bar' },
        { path: "attendance", title: "Attendance", component: 'AttendanceComponent', icon: 'pi pi-calendar' },
        { path: "profile", title: "Profile", component: 'ProfileComponent', icon: 'pi pi-user' },
    ],
};
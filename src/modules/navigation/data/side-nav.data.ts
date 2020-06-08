import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSectionsAdmin: SideNavSection[] = [
    {
        text: 'Menú Administración',
        items: ['dashboard', 'clientes', 'proyectos', 'ajustes'],
    },
];

export const sideNavSectionsClient: SideNavSection[] = [
    {
        text: 'Panel Cliente',
        items: ['dashboard', 'proyectos', 'ajustes'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    clientes: {
        icon: 'tachometer-alt',
        text: 'Clientes',
        link: '/clientes',
    },
    proyectos: {
        icon: 'tachometer-alt',
        text: 'Proyectos',
        link: '/proyectos',
    },
    ajustes: {
        icon: 'tachometer-alt',
        text: 'Ajustes',
        link: '/proyectos',
    },
};

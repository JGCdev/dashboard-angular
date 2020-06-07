import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'Menú',
        items: ['dashboard', 'clientes', 'proyectos', 'ajustes', 'charts'],
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
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
};

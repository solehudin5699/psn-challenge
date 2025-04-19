'use client';
import { LOGO_PSN } from '@/configs/images';
import { MENU_LIST } from '@/constant';
import { useLogout } from '@/hooks/useServices';
import { cn } from '@/utils/className';
import { usePathname } from 'next/navigation';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import React from 'react';

const itemRenderer = (item: any) => (
  <a className="flex align-items-center p-menuitem-link">
    <span className={item.icon} />
    <span className="mx-2">{item.label}</span>
    {item.badge && <Badge className="ml-auto" value={item.badge} />}
    {item.shortcut && (
      <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
        {item.shortcut}
      </span>
    )}
  </a>
);

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',
          shortcut: '⌘+S',
          template: itemRenderer,
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          shortcut: '⌘+B',
          template: itemRenderer,
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          shortcut: '⌘+U',
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
              badge: 2,
              template: itemRenderer,
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      badge: 3,
      template: itemRenderer,
    },
  ];

  const end = (
    <div className="flex items-center gap-2">
      <InputText placeholder="Search" type="text" className="w-40 sm:w-auto" />
      <Avatar image="https://avatars.githubusercontent.com/u/65361695?v=4" shape="circle" />
    </div>
  );

  const pathname = usePathname();
  const logout = useLogout();

  const isMenuActive = (url: string) => {
    return pathname === '/' && url === '/' ? '/' : pathname.includes(url);
  };

  const handleLogout = () => {
    logout.mutate(null);
    window.location.href = '/login';
  };
  const handleConfirmLogout = () => {
    confirmDialog({
      message: 'Do you want to logout?',
      header: 'Logout Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => handleLogout(),
      reject: () => {},
    });
  };
  return (
    <div className="h-screen w-full flex">
      <div className="w-0 overflow-hidden md:w-[300px] h-screen md:overflow-y-auto border-r border-gray-300 md:p-3 bg-white transition-all">
        <div className="h-10 w-20 relative mx-auto mt-3 mb-20">
          <img src={LOGO_PSN} alt="Logo" className="object-cover" />
        </div>
        <Menu
          model={[
            ...MENU_LIST.map((el) => ({
              ...el,
              className: cn('rounded-lg', isMenuActive(el.url) && 'bg-gray-200'),
            })),
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              template(item) {
                return (
                  <>
                    <div className="h-[1px] bg-gray-200 mb-3 mt-20" />
                    <button
                      className="cursor-pointer px-5 flex items-center gap-3"
                      onClick={handleConfirmLogout}
                    >
                      <span className={item.icon} />
                      {item.label}
                    </button>{' '}
                  </>
                );
              },
            },
          ]}
          style={{ width: '100%', border: 'none' }}
        />
      </div>
      <div className="flex-1 h-screen overflow-y-auto p-5 pt-0 relative">
        <div className="m-3 sticky top-3 h-20 z-10 w-auto mb-20 bg-white">
          <Menubar className="h-20" model={items} end={end} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;

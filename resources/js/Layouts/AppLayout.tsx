import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import Sidebar, { SidebarItem } from './Sidebar';
import { Home, User, FileText, Settings, Bell } from 'lucide-react'; // Example icons
import MenuBar, { MenuBarItem } from './MenuBarContextType'; // Corrected import for MenuBar


interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar>
          {/* SidebarItem now using Link for navigation */}
          <SidebarItem
            icon={<Home />}
            text="Dashboard"
            // active={route().current('dashboard')}
          />
          <SidebarItem
            icon={<User />}
            text="Employees"
            // active={route().current('hrm.employees')}
          />
          <SidebarItem
            icon={<FileText />}
            text="Payroll"
            // active={route().current('hrm.payroll')}
          />
        </Sidebar>

        {/* MenuBar */}
        {/* <MenuBar>
          <MenuBarItem icon={<Home />} text="Home" active={route().current('home')} />
          <MenuBarItem icon={<Settings />} text="Settings" />
          <MenuBarItem icon={<Bell />} text="Notifications" />
        </MenuBar> */}

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

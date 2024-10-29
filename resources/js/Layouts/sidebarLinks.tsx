const renderLinks = (links: SidebarLink[]) => {
  return links.map((link) => (
    <li key={link.label}>
      {link.children ? (
        <div>
          <div
            onClick={() => toggleDropdown(link.label)}
            className={`flex items-center justify-between p-2 space-x-2 rounded-md cursor-pointer ${
              activeDropdowns.includes(link.label) ? 'bg-indigo-100' : ''
            }`}
          >
            <div className="flex items-center space-x-2">
              {link.icon}
              <span>{link.label}</span>
            </div>
            {activeDropdowns.includes(link.label) ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {activeDropdowns.includes(link.label) && (
            <ul className="pl-6 space-y-2">
              {renderLinks(link.children)}
            </ul>
          )}
        </div>
      ) : (
        <Link
          href={link.href!}
          className={`flex items-center p-2 space-x-2 rounded-md ${
            isActiveLink(link.href) ? 'bg-indigo-200 font-bold' : 'hover:bg-indigo-100'
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      )}
    </li>
  ));
};
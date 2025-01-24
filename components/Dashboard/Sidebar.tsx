'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Toggle the expanded state of a specific menu
  const toggleMenu = (label: string) => {
    setExpandedMenus((prevState) =>
      prevState.includes(label)
        ? prevState.filter((menu) => menu !== label) // Close the menu if it's already open
        : [...prevState, label] // Open the menu if it's not open
    );
  };

  const links = [
    { href: '/dashboard', label: 'Início', subLinks: [] },
    {
      href: '/dashboard/produtos',
      label: 'Produtos',
      subLinks: [
        { href: '/dashboard/produtos/cadastrar', label: 'Cadastrar' },
        { href: '/dashboard/produtos/editar', label: 'Editar' },
        { href: '/dashboard/produtos/deletar', label: 'Deletar' },
      ],
    },
    { href: '/dashboard/pedidos', label: 'Pedidos', subLinks: [] },
  ];

  return (
    <aside className="w-64 bg-blue-700 text-white h-screen flex flex-col">
      <div className="p-4 font-bold text-xl">Painel Administrativo</div>
      <nav className="flex-grow">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <div
                className={`flex flex-row justify-between hover:bg-blue-600 ${
                  pathname === link.href ? 'bg-blue-500' : ''
                }`}
              >
                <button
                  onClick={() => toggleMenu(link.label)}
                  className="pl-4 text-lg text-black hover:text-gray-300 flex justify-between w-full items-center"
                >
                  <div className="block px-4 py-2">{link.label}</div>
                  {link.subLinks.length > 0 && (
                    <>
                      {expandedMenus.includes(link.label) ? (
                        <KeyboardArrowUpIcon fontSize='medium'/>
                      ) : (
                        <KeyboardArrowDownIcon fontSize='medium'/>
                      )}
                    </>
                  )}
                </button>
              </div>
              {expandedMenus.includes(link.label) && link.subLinks.length > 0 && (
                <ul className="pl-8">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.href}>
                      <Link
                        href={subLink.href}
                        className={`block px-4 py-2 ${
                          pathname === subLink.href ? 'bg-blue-500' : ''
                        } hover:bg-blue-600`}
                      >
                        {subLink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={() => {
            localStorage.removeItem('admToken');
            window.location.href = '/dashboard/login';
          }}
          className="w-full bg-red-500 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

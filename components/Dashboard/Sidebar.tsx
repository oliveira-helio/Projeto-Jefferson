'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth } from '@/hooks/UseAuth/useAuth';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const router = useRouter();
  const { logout } = useAuth();

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
        { href: '/dashboard/produtos/alterar', label: 'Alterar' },
        { href: '/dashboard/produtos/remover', label: 'Remover' },
      ],
    },
    { href: '/dashboard/pedidos', label: 'Pedidos', subLinks: [] },
  ];

 


  return (
    <aside className="w-64 bg-pink-500 text-white h-screen flex flex-col">
      <div className="p-4 font-bold text-xl">Painel Administrativo</div>
      <nav className="flex-grow">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <div
                className={`flex flex-row justify-between hover:bg-pink-600 hover:shadow-md ${pathname === link.href ? 'bg-pink-400' : ''}`}
              >
                {link.subLinks.length === 0 ? (
                  // Se não houver subLinks, envolvemos o label com o Link
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 w-full hover:bg-pink-600 hover:shadow-md ${pathname === link.href ? 'bg-pink-400' : ''}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(link.label)}
                    className="text-lg hover:text-gray-300 flex justify-between w-full items-center"
                  >
                    <div className="block px-4 py-2">{link.label}</div>
                    {expandedMenus.includes(link.label) ? (
                      <KeyboardArrowUpIcon fontSize="medium" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="medium" />
                    )}
                  </button>
                )}
              </div>
              {expandedMenus.includes(link.label) && link.subLinks.length > 0 && (
                <ul className="pl-8">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.href}>
                      <Link
                        href={subLink.href}
                        className={`block px-4 py-2 ${pathname === subLink.href ? 'bg-pink-400' : ''
                          } hover:bg-pink-600 hover:shadow-md`}
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
          onClick={logout}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-500 transition text-xl hover:text-black hover:shadow-md"
        >
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

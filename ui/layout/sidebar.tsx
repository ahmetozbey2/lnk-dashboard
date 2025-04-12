import Logo from '@/assets/viola_icon.svg';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Banknote, Clock, CreditCard, FileText, Home, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const menu = [
  {
    title: 'Home',
    icon: <Home className="w-5 h-5" color="#949EB2" />,
    href: '/',
    subItems: [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Tasks', href: '/tasks' },
      { title: 'Notifications', href: '/notifications' },
    ],
  },
  {
    title: 'Personal',
    icon: <User className="w-5 h-5" color="#949EB2" />,
    href: '/personal',
  },
  {
    title: 'Payments',
    icon: <CreditCard className="w-5 h-5" color="#949EB2" />,
    href: '/payments',
    subItems: [
      { title: 'Requests', href: '/payments/requests' },
      { title: 'History', href: '/payments/history' },
      { title: 'Bank accounts', href: '/payments/bank-accounts' },
    ],
  },
  {
    title: 'Expenses',
    icon: <Banknote className="w-5 h-5" color="#949EB2" />,
    href: '/expenses',
  },
  {
    title: 'Time off',
    icon: <Clock className="w-5 h-5" color="#949EB2" />,
    href: '/time-off',
  },
  {
    title: 'Documents',
    icon: <FileText className="w-5 h-5" color="#949EB2" />,
    href: '/documents',
  },
  {
    title: 'Compliance',
    icon: <Settings className="w-5 h-5" color="#949EB2" />,
    href: '/compliance',
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen text-sm flex-1 text-white">
      <Image src={Logo} alt="Viola Logo" width={200} height={40} className="mb-8" />

      <h2 className="text-xs uppercase text-gray-400 mb-2 pl-2">Revival Rugs Inc</h2>

      <Accordion type="multiple" className="w-full gap-y-3 flex flex-col">
        {menu.map((item, index) => (
          <AccordionItem key={item.title} value={`item-${index}`} className="border-none">
            {item.subItems ? (
              <>
                <AccordionTrigger className="hover:bg-[#545454] px-2 py-1 flex justify-between gap-2 text-left text-white">
                  <div className="flex items-center gap-x-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" py-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block text-white hover:bg-purple-600/20 px-3 py-1 rounded-r-full w-fit transition pl-9 hover:bg-purple duration-300">
                      {sub.title}
                    </Link>
                  ))}
                </AccordionContent>
              </>
            ) : (
              <Link
                href={item.href}
                className="hover:bg-[#545454] px-2 py-1 flex  gap-2 text-left text-white duration-300">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}

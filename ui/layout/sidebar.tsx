import Logo from '@/assets/viola_icon.svg';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Banknote, Clock, CreditCard, FileText, Home, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const menu = [
  {
    title: 'Home',
    icon: <Home className="size-5" color="#949EB2" />,
    href: '/',
    subItems: [
      { title: 'Dashboard', href: '/' },
      { title: 'Tasks', href: '/tasks' },
      { title: 'Notifications', href: '/notifications' },
    ],
  },
  {
    title: 'Personal',
    icon: <User className="size-5" color="#949EB2" />,
    href: '/personal',
  },
  {
    title: 'Payments',
    icon: <CreditCard className="size-5" color="#949EB2" />,
    href: '/payments',
    subItems: [
      { title: 'Requests', href: '/payments/requests' },
      { title: 'History', href: '/payments/history' },
      { title: 'Bank accounts', href: '/payments/bank-accounts' },
    ],
  },
  {
    title: 'Expenses',
    icon: <Banknote className="size-5" color="#949EB2" />,
    href: '/expenses',
  },
  {
    title: 'Time off',
    icon: <Clock className="size-5" color="#949EB2" />,
    href: '/time-off',
  },
  {
    title: 'Documents',
    icon: <FileText className="size-5" color="#949EB2" />,
    href: '/documents',
  },
  {
    title: 'Compliance',
    icon: <Settings className="size-5" color="#949EB2" />,
    href: '/compliance',
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen flex-1 text-sm text-white">
      <Link href="/">
        <Image src={Logo} alt="Viola Logo" width={200} height={40} className="mb-8 cursor-pointer" />
      </Link>

      <h2 className="mb-2 pl-2 text-xs uppercase text-gray-400">Revival Rugs Inc</h2>

      <Accordion type="multiple" className="flex w-full flex-col gap-y-3">
        {menu.map((item, index) => (
          <AccordionItem key={item.title} value={`item-${index}`} className="border-none">
            {item.subItems ? (
              <>
                <AccordionTrigger className="flex justify-between gap-2 px-2 py-1 text-left text-white hover:bg-[#545454]">
                  <div className="flex items-center gap-x-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className=" space-y-1 py-1">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="hover:bg-purple-600/20 block w-fit rounded-r-full px-3 py-1 pl-9 text-white transition duration-300 hover:bg-purple">
                      {sub.title}
                    </Link>
                  ))}
                </AccordionContent>
              </>
            ) : (
              <Link
                href={item.href}
                className="flex gap-2 px-2 py-1  text-left text-white duration-300 hover:bg-[#545454]">
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

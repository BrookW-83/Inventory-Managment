"use client"

import Link from "next/link"
import {RxSketchLogo, RxDashboard, RxPerson} from 'react-icons/rx';
import {HiOutlineShoppingBag} from 'react-icons/hi';
import router from "next/router";

const sidebarItems = [
  { href: '/', icon: <RxSketchLogo />, text: 'Home' },
  { href: '/shelf_list', icon: <RxDashboard />, text: 'Dashboard' },
  { href: '/livefedd', icon: <RxPerson />, text: 'Profile' },
  { href: '/PlantLayout', icon: <HiOutlineShoppingBag />, text: 'Cart' },
];

const SideBar = () => {
  return (
    <div className=" bg-blue-800 flex mr-4 sticky align-baseline">
      <div className="w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between fixed top-0 left-0">
        <div className="flex flex-col items-center">
          {sidebarItems.map((item, index) => (
            <Link href={item.href} key={index}>
              {/* <a className={`sidebar-item ${router.pathname === item.href ? 'bg-black text-white' : 'hover:bg-gray-200 text-black'}`}> */}
              <div className="bg-slate-400 hover:bg-slate-300 cursor-pointer my-4 text-white p-3 rounded-lg inline-block">
                {item.icon}
              </div>
              
            </Link>
          ))}
        </div>
      </div>
      <main></main>
    </div>
  );
};

export default SideBar
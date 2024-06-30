"use client";

import { logout } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { sharedIcons, sidebarLinks } from "../../constants";
import CustomSvg from "./CustomSvg";
import { boolean } from "zod";

const Sidebar = () => {
  const router = useRouter()
  const [menu, setMenu] = useState<string|null>(null)
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      
    } catch (error) {
      console.log(error)
    }
  }
 const handleToggle = (menu: string) => {
  setMenu(prev => (prev === menu ? null : menu))
 }
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-lg:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/shopping-card.svg"
            width={34}
            height={34}
            alt="E-shopper logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="2xl:text-26 font-ibm-plex-serif text-[18px] font-bold text-blue-600 max-xl:hidden;">
            E-shopper
          </h1>
        </Link>
        {sidebarLinks.map((item, index) => {
          return <Link 
          aria-disabled={item.route?true:false}
          href={item.route?item.route:''}>
          <MenuItem 
          key={index} 
          item={item} 
          subMenuOpen={menu===item.label}
          handleToggle={()=>{handleToggle(item.label)}}/>
          </Link>;
        })}
      </nav>
      <footer 
      className="group flex gap-3 cursor-pointer" 
      onClick={()=>{handleLogout()}}>
        <CustomSvg
          title={sharedIcons.logout.title}
          style="w-7 h-7 group-hover:fill-primary"
          d={sharedIcons.logout.d}
          viewBox={sharedIcons.logout.viewBox}
        />
        <p className="text-16 font-medium text-gray-800 transition group-hover:text-primary">Logout</p>
      </footer>
    </section>
  );
};

const MenuItem = ({
  item,
  subMenuOpen,
  handleToggle,
  setOpen
}: {
  item: MenuItemProps;
  subMenuOpen?: boolean;
  handleToggle?: () => void;
  setOpen?: any
}) => {
  const pathname = usePathname();
  return (
    <div>
    
        <div>
          <div
            className={cn(
              "flex items-center justify-between py-1 2xl:p-4 max-lg:pr-4 rounded-lg cursor-pointer font-medium text-gray-800",
              { "transition-all duration-300 ease-in-out bg-primary text-white ": subMenuOpen }, {"group": !subMenuOpen}
            )}
            onClick={()=>{handleToggle!()}}
            key={item.label}
          >
            <div
              className={cn(
                "flex gap-3 py-1 max-lg:p-4 rounded-lg justify-start"
              )}
            >
              <div className="relative size-6">
                <CustomSvg
                  title={item.label}
                  style={cn(item.icon?.style,{[item.icon?.open!]: subMenuOpen})}
                  d={item.icon?.d}
                  strokeLine={item.icon?.strokeLine}
                  strokeWidth={item.icon?.strokeWidth}
                  viewBox={item.icon?.viewBox}
                />
              </div>
              <p className="group-hover:text-primary">{item.label}</p>
            </div>
           { item.subMenuItems  && <div
              className={`${
                subMenuOpen
                  ? "transition-all transform duration-500 rotate-180"
                  :  "transition-all transform duration-500"
              } flex`}
            >
              <CustomSvg
                title="arrow"
                style="w-4 h-4 group-hover:fill-primary"
                color={
                  subMenuOpen && sharedIcons.arrow?.color !== "none"
                    ? "#ffff"
                    : sharedIcons.arrow?.color
                }
                width={sharedIcons.arrow?.width}
                height={sharedIcons.arrow?.height}
                d={sharedIcons.arrow.d}
                viewBox={sharedIcons.arrow?.viewBox}
              />
            </div>}
          </div>

          {item.subMenuItems && subMenuOpen &&  (
            <div className="flex flex-col">
              {item.subMenuItems.map((subItem, index) => {
                return (
                  <Link
                    href={subItem.route!}
                    key={index}
                    
                    className={cn(
                      "flex gap-3 p-4 rounded-lg justify-center text-black font-semibold",
                      { "text-primary": pathname === subItem.route }
                    )}
                  >
                    {subItem.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      
     
    </div>
  );
};

export default Sidebar;
export { MenuItem };


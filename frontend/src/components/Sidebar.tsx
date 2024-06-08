"use client";

import { logout } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { sharedIcons, sidebarLinks } from "../../constants";
import CustomSvg from "./CustomSvg";

const Sidebar = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
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
          return <MenuItem key={index} item={item} />;
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
        <p className="text-16 font-medium text-gray-800 group-hover:text-primary">Logout</p>
      </footer>
    </section>
  );
};

const MenuItem = ({
  item,
  setOpen,
}: {
  item: MenuItemProps;
  setOpen?: any;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.route || pathname.startsWith(`${item.route}/`);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  return (
    <div>
      {item.subMenuItems ? (
        <div>
          <div
            className={cn(
              "flex items-center justify-between py-1 2xl:p-4 max-sm:pr-4 rounded-lg cursor-pointer font-medium text-gray-800",
              { "bg-primary text-white": subMenuOpen }
            )}
            onClick={toggleSubMenu}
            key={item.label}
          >
            <div
              className={cn(
                "flex gap-3 py-1 max-md:p-4 rounded-lg justify-start"
              )}
            >
              <div className="relative size-6">
                <CustomSvg
                  title={item.label}
                  style="w-7 h-7"
                  color={
                    subMenuOpen && item.icon?.color !== "none"
                      ? "#ffff"
                      : item.icon?.color
                  }
                  d={item.icon?.d}
                  stroke={subMenuOpen ? "#ffff" : item.icon?.stroke}
                  strokeLine={item.icon?.strokeLine}
                  strokeWidth={item.icon?.strokeWidth}
                  viewBox={item.icon?.viewBox}
                />
              </div>
              <p>{item.label}</p>
            </div>
            <div
              className={`${
                subMenuOpen
                  ? "transition-all transform duration-500 rotate-180"
                  : ""
              } flex`}
            >
              <CustomSvg
                title="arrow"
                style="w-4 h-4"
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
            </div>
          </div>

          {subMenuOpen && (
            <div className="flex flex-col">
              {item.subMenuItems.map((subItem, index) => {
                return (
                  <Link
                    href={subItem.route!}
                    key={index}
                    onClick={(e) => {
                      if (setOpen) setOpen(false);
                    }}
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
      ) : (
        <Link
          href={item.route!}
          key={item.label}
          onClick={(e) => {
            if (setOpen) setOpen(false);
          }}
          className={cn(
            "flex gap-3 items-center py-1 p-4 rounded-lg justify-start",
            { "bg-primary text-white": pathname === item.route }
          )}
        >
          <div className="relative size-6">
            <CustomSvg
              title={item.label}
              style="w-7 h-7"
              color={
                pathname === item.route && item.icon?.color !== "none"
                  ? "#ffff"
                  : item.icon?.color
              }
              d={item.icon?.d}
              stroke={pathname === item.route ? "#ffff" : item.icon?.stroke}
              strokeLine={item.icon?.strokeLine}
              strokeWidth={item.icon?.strokeWidth}
              viewBox={item.icon?.viewBox}
            />
          </div>
          <p
            className={cn("text-16 font-medium text-gray-800", {
              "text-white": pathname === item.route,
            })}
          >
            {item.label}
          </p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
export { MenuItem };


"use client";

import { logout } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sidebarLinks } from "../../constants";

const Sidebar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState<string | null>(null);
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggle = (menu: string) => {
    setMenu((prev) => (prev === menu ? null : menu));
  };
  const pathname = usePathname();

  useEffect(() => {
    const matchedItem = sidebarLinks.find(
      (item) =>
        item.subMenuItems?.some((subItem) => subItem.route === pathname) ||
        item.route === pathname
    );
    if (matchedItem) {
      setMenu(matchedItem.label);
    } else {
      setMenu(null);
    }
  }, [pathname]);
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-lg:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image
            src="/images/e-shopper logo(4).png"
            alt="E-shopper logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "60%", height: "auto" }}
          />
        </Link>
        <hr className="w-full h-0.5 my-0.5 bg-gray-100 border-0 rounded"/>
        {sidebarLinks.map((item, index) => {
          return (
            <Link
              aria-disabled={item.route ? true : false}
              href={item.route ? item.route : ""}
              key={index}
            >
              <MenuItem
                key={index}
                item={item}
                subMenuOpen={menu === item.label}
                handleToggle={() => {
                  handleToggle(item.label);
                }}
              />
            </Link>
          );
        })}
      </nav>
      <footer
        className="flex gap-3 cursor-pointer text-gray-800 hover:text-primary"
        onClick={() => {
          handleLogout();
        }}
      >
        <LogOut />
        <p className="text-16 font-medium">Logout</p>
      </footer>
    </section>
  );
};

const MenuItem = ({
  item,
  subMenuOpen,
  handleToggle,
  setOpen,
}: {
  item: MenuItemProps;
  subMenuOpen?: boolean;
  handleToggle?: () => void;
  setOpen?: any;
}) => {
  const pathname = usePathname();
  const IconComponent = item.icon;
  return (
    <div>
      <div>
        <div
          className={cn(
            "flex items-center justify-between py-1 2xl:p-4 max-lg:pr-4 rounded-lg cursor-pointer font-medium text-gray-800",
            {
              "transition-all duration-300 ease-in-out bg-primary-foreground text-primary ":
                subMenuOpen,
            },
            { "hover:text-primary": !subMenuOpen }
          )}
          onClick={() => {
            handleToggle!();
          }}
          key={item.label}
        >
          <div
            className={cn(
              "flex gap-3 py-1 max-lg:p-4 rounded-lg justify-start"
            )}
          >
            <div className="relative size-6 ">
              {IconComponent && <IconComponent />}
            </div>
            <p>{item.label}</p>
          </div>
          {item.subMenuItems && (
            <div
              className={cn("transition-all transform duration-400 ", {
                "transition-all transform duration-400 rotate-180 text-primary":
                  subMenuOpen,
              })}
            >
              <ChevronDown size={18} />
            </div>
          )}
        </div>

        {item.subMenuItems && subMenuOpen && (
          <div className="flex flex-col">
            {item.subMenuItems.map((subItem, index) => {
              return (
                <Link
                  href={subItem.route!}
                  key={index}
                  className={cn(
                    "flex gap-3 p-4 rounded-lg justify-center text-gray-600 font-semibold hover:text-primary",
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

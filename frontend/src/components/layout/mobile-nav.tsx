"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";

import { logout } from "@/lib/actions/user.actions";
import { LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MenuItem } from "./side-bar";
import { sidebarLinks } from "../../../constants";

const MobileNav = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

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
    <section className="w-full max-w-1/2">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="text-gray-800">
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-white w-2/3 flex flex-col justify-between"
        >
          <VisuallyHidden.Root>
          <SheetTitle>Nav Content</SheetTitle>
          </VisuallyHidden.Root>
          <div>
            <Link
              href="/dashboard"
              className="flex cursor-pointer items-center gap-1 px-4"
            >
              <Image
                src="/images/e-shopper logo(4).png"
                alt="E-shopper logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "60%", height: "auto" }}
              />
            </Link>
            <nav className="flex flex-col gap-6 pt-8 text-white">
              {sidebarLinks.map((item, index) => {
                return (
                  <Link href={item.route ? item.route : ""}>
                    <MenuItem
                      key={index}
                      item={item}
                      subMenuOpen={menu === item.label}
                      handleToggle={() => {
                        handleToggle(item.label);
                      }}
                      setOpen={setSheetOpen}
                    />
                  </Link>
                );
              })}
              USER
            </nav>
          </div>
          <footer
            className="flex align-bottom gap-3 cursor-pointer text-gray-800 hover:text-primary"
            onClick={() => {
              handleLogout();
            }}
          >
            <LogOut />
            <p className="text-16 font-medium">Logout</p>
          </footer>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

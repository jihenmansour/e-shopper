"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { sharedIcons, sidebarLinks } from "../../constants";
import { MenuItem } from "./Sidebar";
import CustomSvg from "./CustomSvg";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/user.actions";

const MobileNav = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full max-w-[264px]">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger>
          <CustomSvg
            title="arrow"
            style="w-7 h-7"
            color={sharedIcons.menu.color}
            d={sharedIcons.menu.d}
            viewBox={sharedIcons.arrow?.viewBox}
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 px-4"
          >
            <Image
              src="/icons/shopping-card.svg"
              width={34}
              height={34}
              alt="E-shopper logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-blue-600 ">
              Eshopper
            </h1>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto;">
            <nav
              className="flex h-full flex-col
                     gap-6 pt-16 text-white"
            >
              {sidebarLinks.map((item, index) => {
                return (
                  <MenuItem key={index} item={item} setOpen={setSheetOpen} />
                );
              })}
              USER
            </nav>

            <footer
              className="group flex gap-3 cursor-pointer"
              onClick={() => {
                handleLogout();
              }}
            >
              <CustomSvg
                title={sharedIcons.logout.title}
                style="w-7 h-7 group-hover:fill-primary"
                d={sharedIcons.logout.d}
                viewBox={sharedIcons.logout.viewBox}
              />
              <p className="text-16 font-medium text-gray-800 group-hover:text-primary">
                Logout
              </p>
            </footer>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

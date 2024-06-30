import { getUserInfo } from "@/lib/actions/user.actions";
import { apiURL } from "@/lib/utils";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Header = async () => {
  const user = await getUserInfo();
  return (
    <header className="flex items-center justify-between px-4 py-6 bg-white shadow">
      <nav className="flex justify-between items-center">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 lg:hidden">
          <MobileNav />
        </div>
      </nav>
      <div className="flex gap-2 pr-8">
        <div className="w-12 h-12 rounded-sm ">
          <Image
            src={`${apiURL}/images/${user?.image}`}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
           className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{user?.fullname}</p>
          <p className="font-sm text-gray-400">{user?.role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

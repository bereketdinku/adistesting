"use client";
import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./NavItem";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href={"/"}>
            <AdminNavItem
              label="Summary"
              icon={MdDashboard}
              selected={pathname === "/"}
            />
          </Link>
          <Link href={"/add-songs"}>
            <AdminNavItem
              label="AddSongs"
              icon={MdLibraryAdd}
              selected={pathname === "/add-songs"}
            />
          </Link>
          <Link href={"/manage-songs"}>
            <AdminNavItem
              label="ManageSongs"
              icon={MdDns}
              selected={pathname === "/manage-songs"}
            />
          </Link>
         
        </div>
      </Container>
    </div>
  );
};

export default NavBar;

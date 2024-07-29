"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser: User | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Book your home
        </button>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem onClick={() => {}} label="My Trips" />
                  <MenuItem onClick={() => {}} label="My Favorites" />
                  <MenuItem onClick={() => {}} label="My Reservations" />
                  <MenuItem onClick={() => {}} label="My Properties" />
                  <MenuItem onClick={() => {}} label="My cozy home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={() => loginModal.onOpen()} label="Login" />
                  <MenuItem
                    onClick={() => registerModal.onOpen()}
                    label="Sign Up"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

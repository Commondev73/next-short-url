"use client";

import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const { user, accessToken, refreshToken, clearAuth } = useAuthStore();
  const { mutate: logout } = useLogout(accessToken ?? "", refreshToken ?? "");

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        clearAuth();
        router.replace("/login");
      },
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <LinkIcon className="size-8" />
          <span className="text-3xl font-bold">ShortURL</span>
        </Link>

        <div className="font-medium flex items-center gap-2">
          {user ? (
            <>
              <span className="px-4 py-2">{user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

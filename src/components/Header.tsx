"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCommandPalette } from "./CommandPaletteProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Topics" },
  { href: "/problems", label: "Problems" },
  { href: "/patterns", label: "Patterns" },
];

export function Header() {
  const pathname = usePathname();
  const { open } = useCommandPalette();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="font-semibold tracking-tight text-neutral-100 hover:text-white">
          algo<span className="text-yellow-400">/</span>midterm
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-neutral-50"
                    : "text-neutral-400 transition-colors hover:text-neutral-100"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={open}
            className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/70 px-2.5 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-200"
            aria-label="Open search"
          >
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </button>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-medium text-neutral-900 hover:bg-yellow-300">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

import StreamProvider from "@/providers/StreamProvider";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  
  if (!user) {
    return (
      <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
        <section className="flex justify-center items-center">
          <Image src="assets/logo.svg" alt="logo" width={100} height={100} />
          <h1 className="text-lg font-extrabold  lg:text-2xl">
            Connect, communicate, Collabrate in Real Time
          </h1>
        </section>
        <div className="mt-3">
          <SignIn
            routing="hash"
            appearance={{
              baseTheme: neobrutalism,
            }}
          />
        </div>
      </main>
    );
  }
  return <main className="animate-fade-in">
    <StreamProvider>{children}</StreamProvider></main>;
};

export default MainLayout;

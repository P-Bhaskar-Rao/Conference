import { SignUp } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes"
import Image from "next/image"

const Registerpage = () => {
  return (
    <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
    <section className="flex justify-center items-center">
        <Image src='assets/logo.svg' alt='logo' width={100} height={100}/>
        <h1  className="text-lg font-extrabold  lg:text-2xl">Connect, communicate, Collabrate in Real Time</h1>
    </section>
      <div className="mt-3">
          <SignUp appearance={{
              baseTheme:neobrutalism}}/>
      </div>
  </main>
  )
}

export default Registerpage
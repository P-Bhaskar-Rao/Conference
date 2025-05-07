import CallList from "@/components/CallList"


const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 animate-fade-in">
    <h1 className="text-3xl text-black text-center mt-3">Previous Meetings</h1>
    <CallList type="ended"/>
</section>
  )
}

export default Previous
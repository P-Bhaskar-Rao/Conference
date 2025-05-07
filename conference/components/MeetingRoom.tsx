'use client'
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
    CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LayoutList, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

import EndCallButton from "./EndCallButton";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  
  if (!user) return null;
  if (callingState !== CallingState.JOINED) return <Loading />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <Button
        className="ml-5 font-semibold bg-gray-900 hover:scale-110 rounded-3xl"
        onClick={() => {
          const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
          navigator.clipboard.writeText(meetingLink);
          toast("Meeting Link Copied", {
            duration: 3000,
            className: "!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center",
          });
        }}
      >
        Invite People
      </Button>

      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center animate-fade-in">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/*call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={()=>router.push('/')}/>
            <DropdownMenu>
                <div className="flex items-center">
                    <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] ">
                        <LayoutList size={20} className="text-white"/>
                    </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className="border-black bg-black text-white">
                    {
                        ['Grid','Speaker-Left','Speaker-Right'].map((item,index)=>(
                            <div key={index}>
                                <DropdownMenuItem
                                onClick={()=>setLayout(item.toLowerCase() as CallLayoutType)}
                                >
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="border-black"/>
                            </div>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <CallStatsButton/>
            <button 
              onClick={()=>setShowParticipants((prev)=>!prev)}
              aria-label="Toggle participants list"
            >
                <div className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-">
                    <Users size={20} className="text-white"/>
                </div>
            </button>
            <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
 
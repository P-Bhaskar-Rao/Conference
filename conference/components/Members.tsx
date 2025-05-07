'use client'

import { cn } from "@/lib/utils" // Utility function for conditional class names
import { Call } from "@stream-io/video-react-sdk" // Importing Call type from Stream SDK
import Image from "next/image" // Next.js Image component for optimized images
import { useEffect, useState } from "react" // React hooks for state and effects

// Interface for component props
type MembersProps = {
    call: Call // Expects a Call object from Stream SDK
}

interface CallMember {
    user: {
        id: string;
        image?: string;
    }
}

// Members component to display meeting participants
const Members = ({ call }: MembersProps) => {
    const [callMembers, setCallMembers] = useState<CallMember[]>([])

    useEffect(() => {
        const getMembers = async () => {
            if (!call) return;
            const members = await call.queryMembers()
            setCallMembers(members.members)
        }
        getMembers()
    }, [call])

    if (!call) return null;
    if (callMembers.length === 0) return null;

    return (
        <div className="relative flex w-full">
            {callMembers.map((member, index) => {
                const user = member.user
                return (
                    <Image
                        key={user.id}
                        src={user.image || '/assets/avatar.png'}
                        alt="attendees"
                        width={40}
                        height={40}
                        className={cn("rounded-full", { absolute: index > 0 })}
                        style={{ top: 0, left: index * 28 }}
                    />
                )
            })}
            
            {/* Show the total number of participants */}
            <div className="flex justify-center items-center absolute left-[136px] size-10 rounded-full border-[5px] border-gray-800 bg-gray-800 text-white shadow-2xl">
                {callMembers.length}
            </div>
        </div>
    )
}

export default Members
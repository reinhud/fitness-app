'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function AccountCard() {
    return (
        <Card className="relative h-48 rounded-t-xl overflow-hidden m-4 shadow-md">
            {/* Top Background */}
            <div className="absolute top-0 left-0 w-full h-[40%] bg-blue-500 border-b-2 border-grey-200"></div>
            
            {/* Bottom Background */}
            <div className="absolute bottom-0 left-0 w-full h-[60%]"></div>
        
            {/* Avatar Wrapper */}
            <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-15">
                {/* Avatar */}
                <div className="relative">
                    <Avatar className="w-[7rem] h-[7rem] shadow-md border-2 border-gray-200">
                        <AvatarImage src={"/img/default_user_avatar.jpg"} />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>             
                </div>
            </div>

            {/* Username */}
            <h1 className="text-xl absolute top-3/4 left-1/2 transform -translate-x-1/2 z-10 font-semibold">Username</h1>    
                
        </Card>
    );
}

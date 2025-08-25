import React from "react";
import { MapPin, User } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";


const UserCard = ({ user } : {user: any}) => {
  const { name, id, address, profilePic } = user;
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
      {/* Avatar */}
      <div className="flex justify-center mt-4">
        <Avatar className="w-25 h-25">
          {profilePic && <AvatarImage src={profilePic} alt={name} />}
          <AvatarFallback>
            {name
              .split(" ")
              .map((n:any) => n[0])
              .join("")
              .toUpperCase() || <User className="w-10 h-10 text-gray-400" />}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-50">{name}</h3>
        <p className="text-accent mt-1">@{id}</p>
        <div className="flex w-80 items-center justify-center mt-4">
            <p className="text-gray-500 text-center">{address}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;

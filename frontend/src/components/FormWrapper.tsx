'use client';
import { useState } from "react";
import Join from "./Join";
import Create from "./Create";

const RoomSelector = ({ selectedRoom }: { selectedRoom: 'join' | 'create' }) => {
  switch (selectedRoom) {
    case 'join':
      return <Join />
    case 'create':
      return <Create />
    default:
      return <Join />
  }
}

export default function FormWrapper() {
  const [selectedRoom, setSelectedRoom] = useState<'join' | 'create'>('join');
  const handleSelectRoom = (room: 'join' | 'create') => {
    setSelectedRoom(room);
  }
  
  return (
    <>
      <div className="flex items-center text-center">
        <span className={`w-1/2 p-4 cursor-pointer ${selectedRoom == 'join' && 'bg-secondary  rounded-t-lg text-primary'}`}
          onClick={() => handleSelectRoom('join')}>Ingressar
        </span>
        <span className={`w-1/2 p-4 cursor-pointer ${selectedRoom == 'create' && 'bg-secondary  rounded-t-lg text-primary'}`} onClick={() => handleSelectRoom('create')} >
          Nova Reunião
        </span>
      </div>
      <div className="max-auto w-full h-full flex flex-1 items-center justify-center">
        <RoomSelector selectedRoom={selectedRoom} />
      </div>
    </>
  )
}
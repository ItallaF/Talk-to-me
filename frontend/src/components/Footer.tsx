'use client'
import { Camera, Cameramutate, Computer, Computermutate, Mic, Micmutate, Phone } from "@/Icons";
import Container from "./Container";
import { useState } from "react";

export default function Footer() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOffset, setIsCameraOff] = useState(false);
  const [isScreenOffSharing, setIsScreenOffSharing] = useState(false);
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0') + ':';
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return (
    <footer className="fixed bottom-0 bg-black py-6 w-full">
      <Container>
        <div className="grid grid-cols-3">
          <div className="flex items-center">
            <span className="text-xl">{hours}{minutes}</span>
          </div>
          <div className="flex space-x-6 justify-center">
            {isMuted ? (
              <Micmutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => setIsMuted(!isMuted)} />
            ) : (
              <Mic className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => setIsMuted(!isMuted)} />
            )}
            {isCameraOffset ? (
              <Cameramutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => setIsCameraOff(!isCameraOffset)} />
            ) : (
              <Camera className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => setIsCameraOff(!isCameraOffset)} />
            )}
            {isScreenOffSharing ? (
              <Computermutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => setIsScreenOffSharing(!isScreenOffSharing)} />
            ) : (
              <Computer className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => setIsScreenOffSharing(!isScreenOffSharing)} />
            )}
            <Phone className="h-12 w-16 text-white p-2 hover:bg-red-500 cursor-pointer bg-primary rounded-md" />
          </div>
        </div>
      </Container>
    </footer>
  )
}
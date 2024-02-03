'use client';
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";

export default function Room({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext);
  const localStrem = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('conectado');
      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id
      });
      await initCamera();
    });

    socket?.on('new user', (data) => {
      console.log('usuario conectado', data);
    })

  }, [socket]);

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });
    if (localStrem.current) localStrem.current.srcObject = video;
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[80%] ">
        <div className="md:w-[85%] w-full m-3">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full mirror-mode"
                autoPlay ref={localStrem} />
              <span className="absolute bottom-35">Italla Felyne</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full" />
              <span className="absolute bottom-35">Italla Felyne</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full"></video>
              <span className="absolute bottom-35">Italla Felyne</span>
            </div>
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full"></video>
              <span className="absolute bottom-35">Italla Felyne</span>
            </div>
          </div>
        </div>
        <Chat roomId={params.id} />
      </div>
      <Footer />
    </div>
  )
}
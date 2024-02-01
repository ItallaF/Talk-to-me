'use client';
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContexts";
import { useContext, useEffect } from "react";

export default function Room({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext)
  useEffect(() => {
    socket?.on('connection', ()=>{
      console.log('conectado');
      socket.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id
      })
    })
  }, [socket]);
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-[80%] ">
        <div className="md:w-[85%] w-full m-3">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full"></video>
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
            <div className="bg-gray-950 w-full rounded-md h-full p-2">
              <video className="w-full h-full"></video>
              <span className="absolute bottom-35">Italla Felyne</span>
            </div>
          </div>
        </div>
        <Chat />
      </div>
      <Footer />
    </div>
  )
}
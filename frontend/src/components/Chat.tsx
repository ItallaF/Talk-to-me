import { IDataStream } from "@/app/room/[id]/page";
import { SocketContext } from "@/contexts/SocketContext";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";

interface IChatMassage {
  mesage: string;
  username: string;
  roomId: string;
  time: string;
}

export default function Chat({ roomId }: { roomId: string }) {
  const currentMsg = useRef<HTMLInputElement>(null);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState<IChatMassage[]>([]);
  
  useEffect(() => {
    socket?.on('chat', (data) => {
      console.log('message DATA: ', data);
      setChat((prevState) => [...prevState, data]);
    })
  }, [socket]);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (currentMsg.current && currentMsg.current?.value !== '') {
      const sendMsgToServer = {
        mesage: currentMsg.current.value,
        username: sessionStorage.getItem('username'),
        roomId,
        time: new Date().toLocaleTimeString(),
      };

      socket?.emit('chat', sendMsgToServer);
      setChat((prevState) => [...prevState, { ...sendMsgToServer, username: sessionStorage.getItem('username') ?? '' }]);      
      currentMsg.current.value = '';
    }
  }

  return (
    <>
      <div className="relative min-h-[70vh] bg-gray-900 px-4 pt-4 w-[20%] tablet:cols-2">
        <div className="grid h-[80%] w-full phone:justify-around">
          {chat.map((chat, index) => {
            return (
              <div className="bg-gray-950 rounded p-2 mb-4" key={index}>
                <div className="flex items-center text-pink-400 space-x-2">
                  <span>{chat.username }</span>
                  <span>{chat.time}</span>
                </div>
                <div className="mt-5 text-sm">
                  <p>{chat.mesage}</p>
                </div>
              </div>
            )
          })}

          <form className="flex items-end"
            onSubmit={(e) => sendMessage(e)}>
            <div className="flex relative items-center">
              <input
                type="text"
                name=""
                id=""
                ref={currentMsg}
                className="px-3 py-2 bg-gray-950 rounded-md w-full"
              />
              <button type="submit">
                <Image className="absolute right-2 top-2.5 cursor-pointer"
                  src="/send.png"
                  width={20}
                  height={20}
                  alt="send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
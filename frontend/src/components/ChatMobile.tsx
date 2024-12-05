import { SocketContext } from '@/contexts/SocketContext';
import Image from 'next/image';
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  text: string;
};
interface IChatMassage {
  mesage: string;
  username: string;
  roomId: string;
  time: string;
}

type ChatProps = {
  messages: Message[];
  onSendMessage: (message: string) => void;
  roomId: string;
};
const ChatMobille: React.FC<ChatProps> = ({ roomId }: { roomId: string }, { messages, onSendMessage }) => {
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
    <div className="flex flex-col h-80">
      <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded bg-gray-100">
        {chat.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma mensagem ainda.</p>
        ) : (
          chat.map((chat, index) => (
            <div>
              <div className="my-2 p-2 bg-blue-500 text-white rounded">
                <span>{chat.username}</span>
                <span>{chat.time}</span>
              </div>
              <div>
                <p>{chat.mesage}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form className="flex items-end"
        onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-md  bg-gray-950"
          placeholder="Digite sua mensagem..."
          ref={currentMsg}        
        />
        <button type="submit">
          <Image className="right-2 top-2.5 cursor-pointer"
            src="/send.png"
            width={20}
            height={20}
            alt="send" />
        </button>
      </form>
    </div>
  );
};

export default ChatMobille;

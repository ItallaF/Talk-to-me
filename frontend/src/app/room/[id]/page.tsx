'use client';
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef } from "react";

interface IAnswer {
  sender: string;
  description: RTCSessionDescriptionInit;
}

export default function Room({ params }: { params: { id: string } }) {
  const { socket } = useContext(SocketContext);
  const localStrem = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

  useEffect(() => {
    socket?.on('connect', async () => {
      console.log('conectado');
      socket?.emit('subscribe', {
        roomId: params.id,
        socketId: socket.id,
      });
      await initCamera();
    });
    
    socket?.on('new user', (data) => {
      console.log('Novo usuario tentando conectar', data);
      createPeerConnection(data.socketId, false);
      socket.emit('newUserStart', {
        to: data.socketId,
        sender: socket.id,
      });
    });

    socket?.on('newUserStart', (data) => {
      console.log('Usuario coectado na sala', data);
      createPeerConnection(data.sender, true);
    });

    socket?.on('sdp', (data) => { handleAnswer(data) });

  }, [socket]);

  const handleAnswer = async (data: IAnswer) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data.description.type === 'offer') {
      await peerConnection.setRemoteDescription(data.description);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      console.log('criando uma resposta');

      socket?.emit('sdp', {
        to: data.sender,
        sender: socket?.id,
        description: peerConnection.localDescription,
      });
    }
  }

  const createPeerConnection = async (socketId: string, createOffer: boolean) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };

    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;
    const peerConnection = peerConnections.current[socketId];

    if (createOffer) {
      const peerConnection = peerConnections.current[socketId];
      
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log('creiando uma ofertar')

      socket?.emit('sdp', {
        to: socketId,
        sender: socket?.id,
        description: peerConnection.localDescription,
      })
    }

  }
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
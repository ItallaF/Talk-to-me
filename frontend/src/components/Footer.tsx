'use client'
import { Camera, Cameramutate, Computer, Computermutate, Mic, Micmutate, Phone, Message } from "@/Icons";
import Container from "./Container";
import { MutableRefObject, useState } from "react";

export default function Footer({
  videoMediaStream,
  peerConnections,
  localStream,
  logout
}: {
  videoMediaStream: MediaStream;
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
  localStream: MutableRefObject<HTMLVideoElement | null>;
  logout: () => void;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0') + ':';
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const toggleMuted = () => {
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = isMuted;
    });
    setIsMuted(!isMuted);

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'audio') {
          if (videoMediaStream?.getAudioTracks().length > 0) {
            sender.replaceTrack(
              videoMediaStream
                ?.getAudioTracks()
                .find((track) => track.kind === 'audio') || null,
            );
          }
        }
      });
    });
  };

  const toggleVideo = () => {
    setIsCameraOff(!isCameraOff);
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff;
    });

    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(
            videoMediaStream
              ?.getVideoTracks()
              .find((track) => track.kind === 'video') || null,
          );
        }
      });
    });
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (localStream.current) localStream.current.srcObject = videoShareScreen;

      Object.values(peerConnections.current).forEach((peerConnections) => {
        peerConnections.getSenders().forEach((sender) => {
          if (sender.track?.kind === 'video') {
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0]);
          }
        });
      });

      setIsScreenSharing(!isScreenSharing);
      return;
    }

    if (localStream.current) localStream.current.srcObject = videoMediaStream;

    Object.values(peerConnections.current).forEach((peerConnections) => {
      peerConnections.getSenders().forEach((sender) => {
        if (sender.track?.kind === 'video') {
          sender.replaceTrack(videoMediaStream?.getVideoTracks()[0]);
        }
      });
    });
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <footer className="fixed bottom-0 bg-black py-6 w-full">
      <Container>
        <div className="tablet:grid tablet:grid-cols-3 phone:grid phone:grid-cols-repeat(1, minmax(0, 1fr))">
          <div className="flex items-center phone:justify-center">
            <span className="text-xl">{hours}{minutes}</span>
          </div>
          <div className="gap-2 grid laptop:grid-cols-4 phone:grid-cols-2 phone:justify-items-center ph:grid-cols-2 ph:justify-items-center">
            {isMuted ? (
              <Micmutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => toggleMuted()} />
            ) : (
              <Mic className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => toggleMuted()} />
            )}
            {isCameraOff ? (
              <Cameramutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => toggleVideo()} />
            ) : (
              <Camera className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => toggleVideo()} />
            )}
            {isScreenSharing ? (
              <Computermutate className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md"
                onClick={() => toggleScreenSharing()} />
            ) : (
              <Computer className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
                onClick={() => toggleScreenSharing()} />
            )}
            <Phone className="h-12 w-16 text-white p-2 hover:bg-red-500 cursor-pointer bg-primary rounded-md"
              onClick={() => logout()} />
          </div>
          <div className="grid justify-items-end">
            <Message className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md"
            onClick={() => toggleMuted()} />
          </div>
        </div>
      </Container>
    </footer>
  )
}
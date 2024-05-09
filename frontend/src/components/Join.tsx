'use client';
import { FormEvent, useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

export default function Join() {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && name.current.value !== '' && id.current && id.current.value !== '') {
      sessionStorage.setItem('username', name.current.value);
      const roomId = id.current.value;
      window.location.href = `/room/${roomId}`
      // router.push(`/room/${roomId}`);
    }
  }

  return (
    <form onSubmit={(e) => handleJoinRoom(e)} className="space-y-8">
      <div className="tablet:min-w-[580px] bg-secondary rounded-b-lg space-y-8 p-10 phone:min-w-[340px]">
        <Input placeholder="Seu Nome" type="text" ref={name} />
        <Input placeholder="ID da reunião" type="text" ref={id} />

        <Button title="Entrar" type="submit" />
      </div>
    </form>
  )
}
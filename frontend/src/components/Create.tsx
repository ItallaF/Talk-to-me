'use client';
import { FormEvent, useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

export default function Create() {
  const name = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && name.current.value !== '') {
      sessionStorage.setItem('username', name.current.value);
      const roomId = generateRandomString();
      console.log('🚀 ~ handleCreateRoom ~ roomId:', roomId);
      router.push(`/room/${roomId}`);
    }
  }

  function generateRandomString() {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
  }

  return (
    <>
      <form onSubmit={(e) => handleCreateRoom(e)} className="space-y-8">
        <div className="tablet:min-w-[580px] bg-secondary rounded-b-lg space-y-8 p-10 phone:min-w-[340px]">
          <Input placeholder="Seu nome" type="text" ref={name} />

          <Button title="Criar" type="submit" />
        </div>
      </form>
    </>
  )
}
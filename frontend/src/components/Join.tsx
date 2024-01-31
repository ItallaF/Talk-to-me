'use client';
import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

export default function Join() {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="min-w-[580px] bg-secondary rounded-b-lg space-y-8 p-10">
        <Input placeholder="Digite o código da reunião" type="text" ref={name}/>
        <Input placeholder="ID da reunião" type="text" ref={id}/>

        <Button title="Entrar" type="submit" />
      </div>
    </>
  )
}
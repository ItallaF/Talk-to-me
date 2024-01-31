'use client';
import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

export default function Create() {
  const name = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <div className="min-w-[580px] bg-secondary rounded-b-lg space-y-8 p-10">
        <Input placeholder="Seu nome" type="text" />

        <Button title="Criar" type="submit" />
      </div>
    </>
  )
}
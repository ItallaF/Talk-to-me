import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className=" mx-auto w-full h-full flex flex-1 items-center justify-center">
        <Container>
          <div className=" max-auto w-full h-full flex flex-1 items-center justify-center">
          <div className="min-w-[580px] bg-secondary py-4 rounded-lg space-y-6 px-10">
            <Input placeholder="Digite o código da reunião" type="text" />
            <Input placeholder="ID da reunião" type="text" />

            <Button title="Entrar" type="submit"/>
            </div>
          </div>          
        </Container>      
      </div>
    </main>
  );
}

import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";
import Header from "@/components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className=" mx-auto w-full h-full flex flex-1 items-center justify-center">
        <Container>
          <FormWrapper />
        </Container>      
      </div>
    </main>
  );
}

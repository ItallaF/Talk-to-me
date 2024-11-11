import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";
import Header from "@/components/Header";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col phone:min-w-full">
      <Header />
      <div className="mx-auto w-full h-full flex flex-1 items-center justify-center phone:min-w-full">
        <Container>
          <FormWrapper />
        </Container>
      </div>
    </main>
  );
}

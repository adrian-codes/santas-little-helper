import "./globals.css";

import Form from "./components/form";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="">
        <h1 className="text-lg mb-[1.5rem]">
          Are you on the Naughty or Nice list?
        </h1>
      </div>
      <div>
        <Form />
      </div>
    </main>
  );
}

import Header from "../components/client/Header";
import SOSpage from "../components/client/SOSpage";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <br />
      <main className="bg-amber-50 min-h-screen w-full items-center rounded-2xl border">
        <SOSpage/>
      </main>
    </div>
  );
}

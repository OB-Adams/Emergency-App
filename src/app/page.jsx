import Header from "../components/client/Header";
import SOSpage from "../components/client/SOSpage";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="bg-white items-center min-h-screen rounded-2xl border border-gray-200 mx-3.5">
        <SOSpage/>
      </main>
    </div>
  );
}

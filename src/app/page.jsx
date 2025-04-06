import Header from "../components/client/Header";
import SOSpage from "../components/client/SOSpage";
import ResponderDashboard from "./responder_dashboard/page";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="bg-white items-center min-h-screen rounded-2xl border border-gray-200 mx-3.5">
       <ResponderDashboard/>
      </main>
    </div>
  );
}

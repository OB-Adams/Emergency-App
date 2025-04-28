import Header from "../../components/client/Header";

export default function Requests() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
        <Header />
        <main className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] gap-4 sm:gap-6 md:gap-8 lg:gap-14 rounded-2xl border border-gray-200 m-2 sm:m-3.5">
            <h1>Requests</h1>
        </main>
    </div>
  )
}

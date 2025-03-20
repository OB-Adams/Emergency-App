import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import SessionWrapper from "../components/client/SessionWrapper"
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Emergency Response App",
  description: "A quick emergency response system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Toaster
          position="top-center"
          richColors
          duration={3000}
          closeButton
          toastOptions={{
            className: 'bg-red-500 text-white border border-red-700 rounded-xl shadow-md',
            descriptionClassName: 'text-sm font-medium',
            style: {
              boxShadow: '0 4px 6px rgba(220, 38, 38, 0.3)',
              color: "red",
              fontSize: "18px", // Custom shadow matching header
            },
          }}
          className="mx-auto max-w-md" // Center horizontally within a max width
          offset="20px" // Distance from the top
          mobileOffset="10px" // Adjusted offset for mobile
        />
        <SessionWrapper>
        {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
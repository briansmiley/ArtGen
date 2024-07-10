import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ClerkInterface from "@/components/ClerkInterface";
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full text-slate-700">
        <body className="h-full">
          {/* background gradient */}
          <div className="fixed inset-0 bg-gradient-to-br from-purple-400 to-teal-400 -z-10" />
          {/* clerk button */}
          <ClerkInterface />
          {/* everything else */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

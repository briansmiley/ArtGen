import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import "./globals.css";
import UserInfo from "./UserInfo";
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserInfo />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

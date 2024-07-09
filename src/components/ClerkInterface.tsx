import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import UserInfo from "./UserInfo";
export default function ClerkInterface() {
  return (
    <div className="flex justify-end items-center p-2">
      <SignedOut>
        <div className="bg-teal-800 text-white px-2 py-1 rounded-md w-fit">
          <SignInButton
            forceRedirectUrl={"/api/userAuthCallback"}
            signUpForceRedirectUrl={"/api/userAuthCallback"}
          />
        </div>
      </SignedOut>
      <SignedIn>
        <UserInfo />
      </SignedIn>
    </div>
  );
}

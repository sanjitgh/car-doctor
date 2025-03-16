"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SocialLogin() {
  const session = useSession();
  const router = useRouter();
  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/");
    }
  }, [session?.user]);

  return (
    <div className="flex gap-10 items-center">
      <button onClick={() => handleSocialLogin("google")} className="btn">
        Google Login
      </button>
      <button onClick={() => handleSocialLogin("github")} className="btn">
        Github Login
      </button>
    </div>
  );
}

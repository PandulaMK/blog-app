import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requireAuth = true) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (requireAuth && !token) {
      router.push("/login"); // Redirect only if authentication is required
    }
  }, [requireAuth, router]);
}

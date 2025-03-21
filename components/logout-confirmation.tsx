// components/logout-confirmation.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LogoutConfirmation() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
      <Card className="mx-auto max-w-sm mt-10">
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Are you sure you want to logout?</p>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="destructive">
              Yes, Logout
            </Button>
            <Button onClick={() => router.push("/")} variant="outline">
              No, Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}
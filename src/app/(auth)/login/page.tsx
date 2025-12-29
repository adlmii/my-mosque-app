"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

// Komponen tombol biar bisa loading state
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full bg-emerald-700 hover:bg-emerald-800" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Masuk...
        </>
      ) : (
        "Masuk Dashboard"
      )}
    </Button>
  );
}

export default function LoginPage() {
  // Hook untuk handle form submission & error message
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-optimized">
      <div className="w-full max-w-md space-y-4">

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-emerald-700" />
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-950">
              Login Pengurus
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Masukkan akun DKM untuk mengelola data masjid.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={dispatch} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@masjid.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium flex items-center">
                  ⚠️ {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <LoginButton />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
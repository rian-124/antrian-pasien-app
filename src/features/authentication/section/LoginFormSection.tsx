"use client";

import Link from "next/link";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/TextField";
import { useLoginForm } from "@/hooks/UseLoginForm";

export default function LoginFormSection() {
  const { formData, error, isLoading, handleChange, handleSubmit } =
    useLoginForm();
  return (
    <section className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
          Sign in
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Use your username and password to continue.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert message={error} />}

        <TextField
          label="Username"
          name="username"
          placeholder="Enter your username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          autoFocus
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            name="remember"
            label="Remember me"
            checked={formData.remember}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Link
            href="/forgot-password"
            className="rounded text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </section>
  );
}

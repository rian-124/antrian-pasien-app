"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const initialData: LoginFormData = { username: "", password: "", remember: false };

export function useLoginForm(redirectTo = "/dashboard") {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return { formData, error, isLoading, handleChange, handleSubmit };
}
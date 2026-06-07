"use client";

import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useLogin, useSignup } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Required"),
});
const signupSchema = z
  .object({
    name: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string().min(1, "Please re-enter your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

const Field = forwardRef<
  HTMLInputElement,
  { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>
>(function Field({ label, error, ...props }, ref) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-ink-400">{label}</span>
      <input
        ref={ref}
        {...props}
        className="w-full rounded-xl border border-ink-800 bg-ink-850 px-3 py-2 text-ink-100 outline-none focus:border-brand-500/60"
      />
      {error && (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      )}
    </label>
  );
});

function Submit({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-2.5 font-semibold text-ink-950 transition hover:bg-brand-400 disabled:opacity-50"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : children}
    </button>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const submit = (data: LoginForm) =>
    login.mutate(data, {
      onSuccess: () => {
        toast.success("Signed in");
        onDone();
      },
      onError: (e) => toast.error(e.message),
    });

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <Field
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Field
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Submit loading={login.isPending}>Sign in</Submit>
    </form>
  );
}

function SignupForm({ onDone }: { onDone: () => void }) {
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const submit = ({ name, email, password }: SignupForm) =>
    signup.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Account created");
          onDone();
        },
        onError: (e) => toast.error(e.message),
      },
    );

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <Field label="Name" error={errors.name?.message} {...register("name")} />
      <Field
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Field
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Field
        label="Confirm password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Submit loading={signup.isPending}>Create account</Submit>
    </form>
  );
}

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-ink-800 bg-ink-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <button onClick={onClose} className="text-ink-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onDone={onClose} />
        ) : (
          <SignupForm onDone={onClose} />
        )}

        <p className="mt-4 text-center text-sm text-ink-400">
          {mode === "login" ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-medium text-brand-400 hover:text-brand-300"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

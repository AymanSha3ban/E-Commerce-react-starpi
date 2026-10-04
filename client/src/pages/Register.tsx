import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterFormData } from "@/Schema/Register";
import { useForm } from "react-hook-form";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error : any) => {
      const message =
        error?.response?.data?.error?.message ||
        "Invalid email or password. Please try again.";
      setErrorMessage(message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center p-2">
      <Card className="w-full max-w-sm border-border bg-card text-card-foreground shadow-xl rounded-xl">
        <CardHeader className="space-y-1 text-center p-4 pb-2">
          <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <UserPlus className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">Create account</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Enter details to create account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2.5 p-4 pt-2">
            {/* Global API Error Alert */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {/* Username */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-medium text-foreground">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("username")}
                  className={`pl-9 h-9 text-xs bg-background focus-visible:ring-teal-500 ${
                    errors.username ? "border-destructive focus-visible:ring-destructive" : "border-input"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-[11px] text-destructive">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={`pl-9 h-9 text-xs bg-background focus-visible:ring-teal-500 ${
                    errors.email ? "border-destructive focus-visible:ring-destructive" : "border-input"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`pl-9 pr-9 h-9 text-xs bg-background focus-visible:ring-teal-500 ${
                    errors.password ? "border-destructive focus-visible:ring-destructive" : "border-input"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-9 mt-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold text-xs gap-2 shadow-lg shadow-teal-500/10"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-border p-3">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-400 font-semibold hover:text-teal-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
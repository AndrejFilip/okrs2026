"use client";
import React from "react";
import { loginSchema } from "@/app/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoBicycle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useToast } from "@/app/hooks/useToast";

import { LoginForm } from "../../../../../lib/types/types";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { Loader } from "@/app/app/components/Loader";
import { Divider } from "@/app/app/components/Divider";
import { ErrorMessage } from "../../../app/components/ErrorMessage";

export const Login = () => {
  const { t } = useTranslation();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const { customToast } = useToast();

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast(
        customToast({
          header: t("loginPage.LoggingFailure"),
          message: t("loginPage.loginSuccessToastMessage"),
          variant: "error",
        })
      );
    } else {
      redirect("/app/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", { redirectTo: "/app/dashboard" });
  };

  if (isSubmitting || isGoogleLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        {...{
          className: "w-[500px] flex flex-row justify-between items-center",
        }}
      >
        <IoBicycle {...{ className: "w-[100px] h-[100px]" }} />
        <Link {...{ href: "/" }}>
          <span {...{ className: "text-xs font-mono text-gray-500" }}>
            {t("loginPage.backToHome")}
          </span>
        </Link>
      </div>
      <div {...{ className: "w-full flex flex-col gap-4 mt-4" }}>
        <span {...{ className: "text-2xl font-mono font-bold text-slate-800" }}>
          {t("loginPage.login")}
        </span>
        <form
          {...{
            onSubmit: handleSubmit(onSubmit),
            className: "flex flex-col gap-4",
          }}
        >
          <input
            {...{
              className: `border p-4 rounded-lg border-2 border-solid ${errors.email ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              type: "text",
              placeholder: t("loginPage.username"),
              ...register("email"),
            }}
          />
          <ErrorMessage {...{ message: errors.email?.message }} />
          <input
            {...{
              className: `border p-4 rounded-lg border-2 border-solid ${errors.password ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              type: "password",
              placeholder: t("loginPage.password"),
              ...register("password"),
            }}
          />
          <ErrorMessage {...{ message: errors.password?.message }} />
          <button
            {...{
              className:
                "bg-white border border-1 border-slate-800 text-slate-800 p-4 rounded-lg cursor-pointer font-bold hover:bg-slate-800 hover:text-white font-mono",
              type: "submit",
            }}
          >
            {t("loginPage.loginButtonWithEmail")}
          </button>
        </form>
        <Divider {...{ label: t("loginPage.or") }} />
        <button
          {...{
            className:
              "w-full border items-center justify-evenly flex p-4 rounded-lg cursor-pointer font-bold hover:bg-slate-800 hover:text-white font-mono text-center",
            onClick: handleGoogleSignIn,
            type: "button",
          }}
        >
          <FaGoogle {...{ className: "w-[20px] h-[20px]" }} />{" "}
          {t("loginPage.loginWithGoogle")}
        </button>
      </div>

      <div {...{ className: "flex justify-center items-center mt-4" }}>
        <span {...{ className: "text-sm font-mono text-gray-500" }}>
          {t("loginPage.noAccountYet")}{" "}
          <Link {...{ href: "/auth/activate" }}>
            <span
              {...{
                className:
                  "text-sm font-mono text-slate-800 font-bold hover:text-orange-600",
              }}
            >
              {t("loginPage.registerNow")}
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
};

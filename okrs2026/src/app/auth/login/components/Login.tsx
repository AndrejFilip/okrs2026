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

import { UserLoginAction } from "../../../../../lib/actions/auth";
import { LoginForm } from "../../../../../lib/types/types";

export const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const { customToast } = useToast();

  const onSubmit = async (data: LoginForm) => {
    const result = await UserLoginAction(data);

    if (result) {
      toast(
        customToast({
          header: "Error",
          message: result.message,
          variant: "error",
        })
      );
    } else {
      toast(
        customToast({
          header: t("loginPage.loginSuccessToastHeader"),
          message: t("loginPage.loginSuccessToastMessage"),
          variant: "success",
        })
      );
    }
  };

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
          {errors.email ? (
            <span
              {...{ className: "text-red-400 text-xs font-mono font-bold" }}
            >
              {errors.email.message}
            </span>
          ) : null}
          <input
            {...{
              className: `border p-4 rounded-lg border-2 border-solid ${errors.password ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              type: "password",
              placeholder: t("loginPage.password"),
              ...register("password"),
            }}
          />
          {errors.password ? (
            <span
              {...{ className: "text-red-400 text-xs font-mono font-bold" }}
            >
              {errors.password.message}
            </span>
          ) : null}
          <button
            {...{
              className:
                "bg-white border border-1 border-slate-800 text-slate-800 p-4 rounded-lg cursor-pointer font-bold hover:bg-slate-800 hover:text-white font-mono disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed",
              type: "submit",
            }}
          >
            {t("loginPage.loginButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

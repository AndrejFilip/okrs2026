"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdAccountCircle, MdError } from "react-icons/md";
import { ActivationForm as ActivationFormType } from "../../../../../lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { activationSchema } from "@/app/schemas/loginSchema";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { ActivateUser } from "../../../../../lib/actions/auth";
import { toast } from "react-toastify";
import { useToast } from "@/app/hooks/useToast";
import { redirect } from "next/navigation";
import { Loader } from "@/app/components/Loader";

export const ActivationForm = () => {
  const { t } = useTranslation();
  const [is6char, setIs6char] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ActivationFormType>({ resolver: zodResolver(activationSchema) });

  const password = watch("password");

  const { customToast } = useToast();

  useEffect(() => {
    setIs6char((password?.length ?? 0) >= 6);
    setIsUppercase(/[A-Z]/.test(password || ""));
    setIsNumber(/\d/.test(password || ""));
  }, [password]);

  const onSubit = async (data: ActivationFormType) => {
    const result = await ActivateUser(data);

    if (result) {
      toast(
        customToast({
          header: t("activationPage.activationFailure"),
          message: t("activationPage.äctivationFailureToastMessage"),
          variant: "error",
        }),
      );
    } else {
      toast(
        customToast({
          header: t("activationPage.activationOk"),
          message: t("activationPage.activationSuccessToastMessage"),
          variant: "success",
        }),
      );

      redirect("/auth/login");
    }
  };
  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <div>
      <form
        {...{
          className: "flex flex-col gap-4",
          onSubmit: handleSubmit(onSubit),
        }}
      >
        <div {...{ className: "flex items-center gap-2" }}>
          <span
            {...{ className: "text-2xl font-mono font-bold text-slate-800" }}
          >
            {t("activationPage.activateYourAccount")}
          </span>
          <MdAccountCircle {...{ className: "w-10 h-10 text-slate-800" }} />
        </div>

        <div {...{ className: "flex flex-col gap-2" }}>
          <span {...{ className: "font-mono font-bold" }}>
            {t("activationPage.email")}
          </span>
          <input
            {...{
              className: `border p-4 rounded-lg border-gray-300 border-2 ${errors.email ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              type: "email",
              placeholder: t("activationPage.email"),
              ...register("email"),
            }}
          />
          <ErrorMessage {...{ message: errors.email?.message }} />
        </div>
        <div {...{ className: "flex flex-row gap-4" }}>
          <div {...{ className: "flex flex-col gap-2" }}>
            <span {...{ className: "font-mono font-bold" }}>
              {t("activationPage.name")}
            </span>
            <input
              {...{
                type: "text",
                placeholder: t("activationPage.name"),
                className: `border p-4 rounded-lg border-gray-300 border-2 ${errors.name ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
                ...register("name"),
              }}
            />
            <ErrorMessage {...{ message: errors.name?.message }} />
          </div>
          <div {...{ className: "flex flex-col gap-2" }}>
            <span {...{ className: "font-mono font-bold" }}>
              {t("activationPage.bike")}
            </span>
            <input
              {...{
                type: "text",
                placeholder: t("activationPage.bike"),
                className:
                  "border p-4 rounded-lg border-gray-300 border-2 hover:border-slate-800 font-mono",
                ...register("bike"),
              }}
            />
          </div>
        </div>
        <div {...{ className: "flex flex-col gap-2" }}>
          <span {...{ className: "font-mono font-bold" }}>
            {t("activationPage.password")}
          </span>
          <input
            {...{
              type: "password",
              placeholder: t("activationPage.password"),
              className: `border p-4 rounded-lg border-gray-300 border-2 ${errors.password ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              ...register("password"),
            }}
          />
          <ErrorMessage {...{ message: errors.password?.message }} />
          <div {...{ className: "flex flex-col gap-1 mt-1" }}>
            <div {...{ className: "flex items-center gap-1" }}>
              <MdError
                {...{
                  className: `w-5 h-5 text-gray-500 ${is6char ? "text-green-500" : "text-red-400"}`,
                }}
              />
              <span
                {...{
                  className: `text-sm font-mono ${is6char ? "text-green-500" : "text-red-400"}`,
                }}
              >
                {t("activationPage.mustBeAtLeast6Chars")}
              </span>
            </div>
            <div {...{ className: "flex items-center gap-1" }}>
              <MdError
                {...{
                  className: `w-5 h-5 ${isUppercase ? "text-green-500" : "text-red-400"}`,
                }}
              />
              <span
                {...{
                  className: `text-sm font-mono ${isUppercase ? "text-green-500" : "text-red-400"}`,
                }}
              >
                {t("activationPage.mustContaintUppercase")}
              </span>
            </div>
            <div {...{ className: "flex items-center gap-1" }}>
              <MdError
                {...{
                  className: `w-5 h-5 ${isNumber ? "text-green-500" : "text-red-400"}`,
                }}
              />
              <span
                {...{
                  className: `text-sm font-mono ${isNumber ? "text-green-500" : "text-red-400"}`,
                }}
              >
                {t("activationPage.mustContaintNumber")}
              </span>
            </div>
          </div>
        </div>

        <div {...{ className: "flex flex-col gap-2" }}>
          <span {...{ className: "font-mono font-bold" }}>
            {t("activationPage.retypePassword")}
          </span>
          <input
            {...{
              type: "password",
              placeholder: t("activationPage.retypePassword"),
              className: `border p-4 rounded-lg border-gray-300 border-2 ${errors.retypePassword ? "border-red-400" : "border-gray-300"} hover:border-slate-800 font-mono`,
              ...register("retypePassword"),
            }}
          />
          <ErrorMessage {...{ message: errors.retypePassword?.message }} />
        </div>
        <button
          {...{
            className:
              "bg-white border border-1 border-slate-800 text-slate-800 p-4 rounded-lg cursor-pointer font-bold hover:bg-slate-800 hover:text-white font-mono",
            type: "submit",
          }}
        >
          {t("activationPage.activateYourAccount")}
        </button>
      </form>
    </div>
  );
};

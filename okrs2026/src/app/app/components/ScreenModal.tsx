"use client";

import React, { memo } from "react";
import { useTranslation } from "react-i18next";

interface ScreenModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
  onConfirmLabel: string;
  onCancelLabel: string;
}

export const ScreenModal = memo(
  ({
    isOpen,
    onConfirm,
    onCancel,
    onCancelLabel,
    onConfirmLabel,
    message = "Ste si istý?",
  }: ScreenModalProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
      <div
        {...{
          className:
            "fixed inset-0 z-50 flex items-center justify-center bg-white",
        }}
      >
        <div
          {...{
            className: "bg-white flex flex-col gap-3",
          }}
        >
          <span
            {...{
              className: "text-2xl font-mono font-bold text-slate-800 ",
            }}
          >
            {t("logOutModal.areYouSure")}
          </span>
          <span {...{ className: "text-slate-600 font-mono" }}>{message}</span>
          <div {...{ className: "flex gap-4" }}>
            <button
              {...{
                onClick: onConfirm,
                className:
                  "px-6 py-3 bg-gray-200 text-white font-mono font-bold rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer",
              }}
            >
              {onConfirmLabel}
            </button>
            <button
              {...{
                onClick: onCancel,
                className:
                  "px-6 py-3 bg-slate-800 text-white font-mono font-bold rounded-lg hover:bg-slate-700 cursor-pointer",
              }}
            >
              {onCancelLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

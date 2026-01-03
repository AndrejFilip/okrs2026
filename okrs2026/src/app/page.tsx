"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div {...{ className: "w-full flex justify-center" }}>
      <p {...{ className: "text-lg font-mono" }}>{t("rovnica")}</p>
    </div>
  );
}

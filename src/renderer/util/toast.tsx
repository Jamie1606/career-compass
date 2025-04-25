import ErrorIcon from "@/icons/error-icon";
import InfoIcon from "@/icons/info-icon";
import SuccessIcon from "@/icons/success-icon";
import WarningIcon from "@/icons/warning-icon";
import { addToast } from "@heroui/react";

export function showToast(title: string, description: string, type: "success" | "error" | "warning" | "info") {
  addToast({ title: title, description: description, color: type === "success" ? "success" : type === "error" ? "danger" : type === "warning" ? "warning" : "primary", icon: type === "success" ? <SuccessIcon width={20} height={20} /> : type === "error" ? <ErrorIcon width={20} height={20} /> : type === "warning" ? <WarningIcon width={20} height={20} /> : <InfoIcon width={20} height={20} />, timeout: 2500 });
}

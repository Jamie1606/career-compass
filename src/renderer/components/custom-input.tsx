import { Input, InputProps } from "@heroui/react";

export default function CustomInput({ ...props }: InputProps) {
  return <Input classNames={{ inputWrapper: "group-data-[focus-visible=true]:ring-[#1d4ed8]/80" }} {...props} />;
}

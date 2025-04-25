import AddIcon from "@/icons/add-icon";
import { Button } from "@heroui/react";

interface AddIconButtonProps {
  onOpen: () => void;
}

export default function AddIconButton({ onOpen }: AddIconButtonProps) {
  return (
    <Button className="bg-[#1d4ed8]/90" isIconOnly onPress={onOpen}>
      <AddIcon width={20} height={20} fill="#ffffff" />
    </Button>
  );
}

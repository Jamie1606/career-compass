import AddIcon from "@/icons/add-icon";
import { Button } from "@heroui/react";

interface AddIconButtonProps {
  hoverTitle?: string;
  onOpen: () => void;
}

export default function AddIconButton({ hoverTitle, onOpen }: AddIconButtonProps) {
  return (
    <Button className="bg-[#1d4ed8]/90" isIconOnly onPress={onOpen} title={hoverTitle}>
      <AddIcon width={20} height={20} fill="#ffffff" />
    </Button>
  );
}

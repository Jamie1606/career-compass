import EditIcon from "@/icons/edit-icon";
import { Button } from "@heroui/react";

interface EditIconButtonProps {
  onOpen: () => void;
  hoverTitle?: string;
}

export default function EditIconButton({ hoverTitle, onOpen }: EditIconButtonProps) {
  return (
    <Button color="warning" size="sm" isIconOnly onPress={onOpen} title={hoverTitle}>
      <EditIcon width={16} height={16} fill="#ffffff" />
    </Button>
  );
}

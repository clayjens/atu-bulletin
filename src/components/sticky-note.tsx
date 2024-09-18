import { Card } from "@nextui-org/react";

import { cn } from "@/utils/cn";
import {
  type StickyNoteStyle,
  getRandomRotation,
} from "@/utils/sticky-note-helper";

interface StickyNoteProps {
  children: React.ReactNode;
  style: StickyNoteStyle;
}

export default function StickyNote({ children, style }: StickyNoteProps) {
  const rotation = getRandomRotation();

  return (
    <Card
      className={cn("max-w-md", style.base)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
    </Card>
  );
}

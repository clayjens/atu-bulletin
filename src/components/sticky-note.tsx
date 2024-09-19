import { Card } from "@nextui-org/react";

import { cn } from "@/utils/cn";
import {
  type StickyNoteStyle,
  getRandomRotation,
} from "@/utils/sticky-note-helper";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
  style: StickyNoteStyle;
}

export default function StickyNote({
  children,
  style,
  className,
}: StickyNoteProps) {
  const rotation = getRandomRotation();

  return (
    <Card
      className={cn(`${className}`, style.base)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
    </Card>
  );
}

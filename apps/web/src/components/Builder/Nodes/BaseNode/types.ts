interface BaseNodeProps {
  id: number;
  isSelected: boolean;
  onPositionChange?: (id: number, x: number, y: number) => void;
  children: React.ReactNode;
}

export type { BaseNodeProps };

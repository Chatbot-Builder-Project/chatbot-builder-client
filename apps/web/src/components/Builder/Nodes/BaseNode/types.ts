interface BaseNodeProps {
  id: number;
  onPositionChange?: (id: number, x: number, y: number) => void;
  children: React.ReactNode;
}

export type { BaseNodeProps };

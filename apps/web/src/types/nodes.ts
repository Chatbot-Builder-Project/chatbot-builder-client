export interface BaseNodeData {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
}

export interface DragItem extends BaseNodeData {
  type: string;
}

export type NodeComponentProps<T extends BaseNodeData> = {
  data: T;
  onPositionChange: (id: string, x: number, y: number) => void;
};

export type NodeComponent<T extends BaseNodeData> = React.FC<NodeComponentProps<T>>;

export interface NodeRegistry {
  [key: string]: NodeComponent<BaseNodeData>;
}

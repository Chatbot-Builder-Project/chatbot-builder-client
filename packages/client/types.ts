export interface BaseNode {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
}

export interface CustomNodeTypeA extends BaseNode {
  type: "typeA";
  extraPropertyA: string;
}

export interface CustomNodeTypeB extends BaseNode {
  type: "typeB";
  extraPropertyB: number;
}

export type BuilderNode = CustomNodeTypeA | CustomNodeTypeB;

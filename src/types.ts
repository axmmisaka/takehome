// Type info for the JSON
export interface Marks {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
export interface BaseElementNode<T extends string> extends Marks {
  type: T;
  children: AnyNode[]; 
  title?: string;
}
export interface BlockNode extends BaseElementNode<'block'> {
  title: string;
}

export interface ClauseNode extends BaseElementNode<'clause'> {
  title: string;
}

export interface MentionNode extends BaseElementNode<'mention'> {
  color: string;
  title: string;
  id: string;
  value: string;
  variableType?: string;
  // Bold but required assumption to make: Mention only has 1 child node
  // that is a text node
  children: [TextNode];
}

export type CustomNode = BlockNode | ClauseNode | MentionNode;
// Anything not 'block', 'clause' and 'mention' is HTML (I think)
export type HTMLNode = BaseElementNode<Exclude<string, CustomNode>>;
export interface TextNode extends Marks {
  text: string;
}
export type ElementNode = CustomNode | HTMLNode;
export type AnyNode = ElementNode | TextNode;

export type DocumentData = AnyNode[];

// TS Type magic
export function isTextNode(node: AnyNode): node is TextNode {
  return (node as TextNode).text !== undefined;
}

export function isBlockNode(node: AnyNode): node is BlockNode {
    if (isTextNode(node)) return false;
    return node.type === "block";
}

export function isClauseNode(node: AnyNode): node is ClauseNode {
    if (isTextNode(node)) return false;
    return node.type === "clause";
}

export function isMentionNode(node: AnyNode): node is MentionNode {
    if (isTextNode(node)) return false;
    return node.type === "mention";
}


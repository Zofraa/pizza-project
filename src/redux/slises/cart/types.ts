export type TCartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export type cartSliceState = {
  // interface типизирует только обьект, но у меня какие-то траблы тут, так что использую type
  totalPrice: number;
  items: TCartItem[];
};

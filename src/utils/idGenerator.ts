
export const generateId = (): string => {
  return `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

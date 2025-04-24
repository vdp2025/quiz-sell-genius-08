
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
}

export function generateComponentId(): string {
  return generateId('component');
}

export function generateStageId(): string {
  return generateId('stage');
}

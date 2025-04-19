
import { Block } from '@/types/editor';
import { BlockFactory } from './blocks/BlockFactory';
export { getDefaultContentForType } from './blocks/defaultContent';

export function createDefaultBlocks(styleType: string): Block[] {
  return BlockFactory.createDefaultBlocks(styleType);
}

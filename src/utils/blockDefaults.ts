
import { Block } from '@/types/editor';
import { createStyleHeroBlock, createStyleResultBlock } from './blocks/styleBlocks';
import { createHeadlineBlock, createBenefitsBlock, createTestimonialsBlock } from './blocks/commonBlocks';
import { createOfferBlock, createGuaranteeBlock, createFaqBlock } from './blocks/salesBlocks';
export { getDefaultContentForType } from './blocks/defaultContent';

export function createDefaultBlocks(styleType: string): Block[] {
  return [
    createStyleHeroBlock(styleType, 0),
    createStyleResultBlock(styleType, 1),
    createHeadlineBlock(2),
    createBenefitsBlock(3),
    createOfferBlock(4),
    createTestimonialsBlock(5),
    createGuaranteeBlock(6),
    createFaqBlock(7)
  ];
}

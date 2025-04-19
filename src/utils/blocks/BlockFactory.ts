
import { Block } from '@/types/editor';
import { generateId } from '../idGenerator';
import { getDefaultContentForType } from './defaultContent';
import { 
  createHeadlineBlock, 
  createBenefitsBlock, 
  createTestimonialsBlock 
} from './commonBlocks';
import {
  createOfferBlock,
  createGuaranteeBlock,
  createFaqBlock
} from './salesBlocks';
import {
  createStyleHeroBlock,
  createStyleResultBlock
} from './styleBlocks';

/**
 * BlockFactory - A class to manage creation of different block types
 * using the Factory Method pattern
 */
export class BlockFactory {
  /**
   * Creates a block of the specified type
   * @param type The type of block to create
   * @param order The order of the block in the layout
   * @param styleType Optional style type for style-specific blocks
   * @returns A new Block instance
   */
  static createBlock(type: Block['type'], order: number, styleType?: string): Block {
    switch (type) {
      case 'headline':
        return createHeadlineBlock(order);
      case 'benefits':
        return createBenefitsBlock(order);
      case 'testimonials':
        return createTestimonialsBlock(order);
      case 'offer':
        return createOfferBlock(order);
      case 'guarantee':
        return createGuaranteeBlock(order);
      case 'faq':
        return createFaqBlock(order);
      case 'style-hero':
        return createStyleHeroBlock(styleType || 'Natural', order);
      case 'style-result':
        return createStyleResultBlock(styleType || 'Natural', order);
      default:
        // For block types without a specific factory method,
        // create a generic block with default content
        return {
          id: generateId(),
          type,
          content: getDefaultContentForType(type),
          order
        };
    }
  }

  /**
   * Creates a set of default blocks for a style page
   * @param styleType The style type
   * @returns An array of blocks
   */
  static createDefaultBlocks(styleType: string): Block[] {
    return [
      this.createBlock('style-hero', 0, styleType),
      this.createBlock('style-result', 1, styleType),
      this.createBlock('headline', 2),
      this.createBlock('benefits', 3),
      this.createBlock('offer', 4),
      this.createBlock('testimonials', 5),
      this.createBlock('guarantee', 6),
      this.createBlock('faq', 7)
    ];
  }
}

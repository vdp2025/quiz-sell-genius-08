
import { QuizQuestion } from '../types/quiz';
import { selfPerceptionQuestions } from './questions/selfPerceptionQuestions';
import { styleExperienceQuestions } from './questions/styleExperienceQuestions';
import { purchaseIntentQuestions } from './questions/purchaseIntentQuestions';
import { desiredOutcomesQuestions } from './questions/desiredOutcomesQuestions';

// Make sure all strategic questions have image URLs
// Using placeholder images if none are defined
const ensureImagesForQuestions = (questions: QuizQuestion[]) => {
  return questions.map((question, index) => {
    if (!question.imageUrl) {
      // Use placeholder images if no image URL is provided
      const placeholderImages = [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        'https://images.unsplash.com/photo-1518770660439-4636190af475',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
      ];
      
      // Use a different placeholder image for each question (cycling through the array)
      question.imageUrl = placeholderImages[index % placeholderImages.length];
      console.log(`Added placeholder image to question ${question.id}: ${question.imageUrl}`);
    }
    return question;
  });
};

// Ensure all question categories have image URLs
const processedSelfPerceptionQuestions = ensureImagesForQuestions(selfPerceptionQuestions);
const processedStyleExperienceQuestions = ensureImagesForQuestions(styleExperienceQuestions);
const processedPurchaseIntentQuestions = ensureImagesForQuestions(purchaseIntentQuestions);
const processedDesiredOutcomesQuestions = ensureImagesForQuestions(desiredOutcomesQuestions);

// Concatenate all strategic questions in the correct order
export const strategicQuestions: QuizQuestion[] = [
  ...processedSelfPerceptionQuestions,
  ...processedStyleExperienceQuestions,
  ...processedPurchaseIntentQuestions,
  ...processedDesiredOutcomesQuestions
];

console.log('Strategic questions loaded:', strategicQuestions.length);
console.log('Questions with images:', strategicQuestions.filter(q => !!q.imageUrl).length);


import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um ID único
 */
export const generateId = (): string => {
  return `id-${uuidv4().substring(0, 8)}`;
};

/**
 * Gera um ID único para o estágio do quiz
 */
export const generateStageId = (): string => {
  return `stage-${uuidv4().substring(0, 8)}`;
};

/**
 * Gera um ID único para um componente do quiz
 */
export const generateComponentId = (): string => {
  return `component-${uuidv4().substring(0, 8)}`;
};

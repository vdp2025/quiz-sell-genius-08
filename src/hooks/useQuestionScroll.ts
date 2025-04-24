import { useCallback } from "react";

export function useQuestionScroll() {
  const scrollToQuestion = useCallback((questionId: string) => {
    const el = document.getElementById(`question-${questionId}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);
  return { scrollToQuestion };
}

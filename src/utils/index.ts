export const checkAnswer = (
  value: string | undefined,
  corrected_answer: string[]
): boolean => {
  const answerKey = value?.split(".")[0].trim() || "";
  return corrected_answer?.includes(answerKey);
};

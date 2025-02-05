export const checkAnswers = (
  selected_answers: string[] | undefined,
  corrected_answer: string[]
): boolean => {
  if (selected_answers?.length !== corrected_answer?.length) {
    return false;
  }

  return selected_answers.every((value) => {
    const answerKey = value?.split(".")[0].trim() || "";
    return corrected_answer?.includes(answerKey);
  });
};

export const checkIsInCorrectedAnwser = (
  value: string | undefined,
  corrected_answer: string[]
): boolean => {
  const answerKey = value?.split(".")[0].trim() || "";
  return corrected_answer?.includes(answerKey);
};

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
};

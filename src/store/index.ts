import { create } from "zustand";
import { IQuestionItemState } from "../../types";

type Patch<T> = T | ((prevState: T) => T);

interface GlobalState {
  questionsList: IQuestionItemState[];
  setQuestionList: (patch: Patch<IQuestionItemState[]>) => void;
  questionListStatus: "None" | "Loading" | "Loaded";
  setQuestionListStatus: (
    questionListStatus: "None" | "Loading" | "Loaded"
  ) => void;
  resetStore: () => void;
}

const getInitialState = () => {
  return {
    questionListStatus: "None" as const,
    questionsList: [],
  };
};

export const useGlobalStore = create<GlobalState>()((set) => ({
  ...getInitialState(),
  setQuestionList: (patch) =>
    set((prevState) => ({
      questionsList:
        patch instanceof Function ? patch(prevState.questionsList) : patch,
    })),
  setQuestionListStatus: (questionListStatus) =>
    set(() => ({ questionListStatus })),
  resetStore: () => set(() => ({ ...getInitialState() })),
}));

import { create } from "zustand";
import { IQuestionItemState } from "../types";

type Patch<T> = T | ((prevState: T) => T);

interface IGlobalState {
  questionList: IQuestionItemState[];
  setQuestionList: (patch: Patch<IQuestionItemState[]>) => void;
  questionListStatus: "None" | "Loading" | "Loaded";
  setQuestionListStatus: (
    questionListStatus: "None" | "Loading" | "Loaded"
  ) => void;
  resetStore: () => void;
}

const getInitialState = () => {
  return {
    questionListStatus: "None",
    questionList: [] as IQuestionItemState[],
  } as const;
};

export const useGlobalStore = create<IGlobalState>()((set) => ({
  ...getInitialState(),
  setQuestionList: (patch) =>
    set((prevState) => ({
      questionList:
        patch instanceof Function ? patch(prevState.questionList) : patch,
    })),
  setQuestionListStatus: (questionListStatus) =>
    set(() => ({ questionListStatus })),
  resetStore: () => set(() => ({ ...getInitialState() })),
}));

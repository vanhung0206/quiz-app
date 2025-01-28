import { create } from "zustand";
import { IConfig, IQuestionItemState } from "../types";

type Patch<T> = T | ((prevState: T) => T);

interface IGlobalState {
  questionList: IQuestionItemState[];
  setQuestionList: (patch: Patch<IQuestionItemState[]>) => void;
  questionListStatus: "None" | "Loading" | "Loaded";
  setQuestionListStatus: (
    questionListStatus: "None" | "Loading" | "Loaded"
  ) => void;
  config: IConfig;
  setConfig: (patch: Patch<IConfig>) => void;

  resetStore: () => void;
}

const getInitialState = () => {
  return {
    questionListStatus: "None",
    questionList: [] as IQuestionItemState[],
     
    config: {
      numberOfQuestion: 45,
      totalTime: 45,
      random: false,
    }
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

  setConfig: (patch) =>
    set((prevState) => ({
      config:
        patch instanceof Function ? patch(prevState.config) : patch,
    })),
  resetStore: () => set(() => ({ ...getInitialState() })),
}));

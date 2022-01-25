import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export enum ToastType {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2,
}

export interface State {
  toast: {
    display: boolean;
    type: ToastType;
    message: string;
  };
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    toast: {
      display: false,
      type: ToastType.SUCCESS,
      message: "",
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}

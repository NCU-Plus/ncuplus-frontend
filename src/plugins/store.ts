import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export enum ToastType {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2,
}

export interface Toast {
  type: ToastType;
  message: string;
}

export interface State {
  toasts: Toast[];
  usernameMap: Map<number, string>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    toasts: [],
    usernameMap: new Map(),
  },
  mutations: {
    pushToast(state, toast: Toast) {
      state.toasts.push(toast);
    },
    shiftToast(state) {
      state.toasts.shift();
    },
    setUsernameMap(state: State, data: { userId: number; username: string }) {
      state.usernameMap.set(data.userId, data.username);
    },
  },
  actions: {
    async pushToast({ commit }, toast: Toast) {
      commit("pushToast", toast);
      return new Promise<void>((resolve) =>
        setTimeout(() => {
          commit("shiftToast");
          resolve();
        }, 5000)
      );
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}

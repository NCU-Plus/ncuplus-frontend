import axios from "axios";
import { useStore } from "@/plugins/store";

export async function initUsernameMap() {
  const store = useStore();
  const response = await axios.get(
    process.env.VITE_APP_API_URL + `/user/names`
  );
  for (const user of response.data.data)
    store.commit("setUsernameMap", { userId: user.id, username: user.name });
}

export function getUsernameById(id: number) {
  const store = useStore();
  const username = store.state.usernameMap.get(id);
  if (username) return username;
  axios
    .get(process.env.VITE_APP_API_URL + `/user/name/${id}`)
    .then((response) => {
      store.commit("setUsernameMap", {
        userId: id,
        username: response.data.data,
      });
      return response.data.data;
    });
  return "未知使用者";
}

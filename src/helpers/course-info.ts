import { store, ToastType } from "@/plugins/store";
import axios, { AxiosResponse } from "axios";

export async function reation(
  target: string,
  operation: string,
  id: number,
  targetArray: any[]
) {
  try {
    let response: AxiosResponse<any, any>;
    if (target === "comment")
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/${operation}`,
        { commentId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/${operation}`,
        { reviewId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    if (operation === "like") {
      targetArray
        .find((targetData) => targetData.id === id)
        .likes.push(response.data.data);
    } else {
      targetArray
        .find((targetData) => targetData.id === id)
        .dislikes.push(response.data.data);
    }
    await store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } catch (error: any) {
    let message;
    if (error.response.data.statusCode === 401) message = "尚未登入";
    else if (error.response.data.statusCode === 403) {
      if (
        (error.response.data.message as string).startsWith(
          "You cannot like or dislike your own"
        )
      ) {
        message = "你不能推噓自己的內容!";
      } else if (
        (error.response.data.message as string).startsWith(
          "You have already liked or disliked"
        )
      ) {
        message = "你已經為這篇內容推噓過了!";
      }
    }
    await store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function add(
  target: string,
  id: number,
  content: string,
  targetArray: any[]
) {
  if (content === "") return;
  try {
    let response = await axios.post(
      process.env.VITE_APP_API_URL + `/course-info/${target}`,
      { courseId: id, content: content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    targetArray.push({ ...response.data.data, likes: [], dislikes: [] });

    await store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } catch (error: any) {
    let message = "未知錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";

    await store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function edit(
  target: string,
  id: number,
  content: string,
  targetArray: any[]
) {
  if (content === "") return;
  try {
    let response: AxiosResponse<any, any>;
    if (target === "comment")
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/edit`,
        { commentId: id, content: content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/edit`,
        { reviewId: id, content: content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    targetArray.find((targetData) => targetData.id === id).content = content;

    await store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } catch (error: any) {
    let message = "未知錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";

    await store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function del(target: string, id: number, targetArray: any[]) {
  try {
    let response: AxiosResponse<any, any>;
    if (target === "comment")
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/delete`,
        { commentId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-info/${target}/delete`,
        { reviewId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    targetArray.splice(
      targetArray.findIndex((targetData) => targetData.id === id),
      1
    );

    await store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } catch (error: any) {
    let message = "未知錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";

    await store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

import { store, ToastType } from "@/plugins/store";
import axios, { AxiosResponse } from "axios";

export async function reaction(
  target: string,
  operation: string,
  id: number,
  targetArray: any[]
) {
  try {
    let response: AxiosResponse<any, any>;
    if (target === "comment")
      response = await axios.post(
        process.env.VITE_APP_API_URL +
          `/course-feedback/${target}/${operation}`,
        { commentId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL +
          `/course-feedback/${target}/${operation}`,
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
  classNo: string,
  content: string,
  targetArray: any[]
) {
  if (content === "") return;
  try {
    let response = await axios.post(
      process.env.VITE_APP_API_URL + `/course-feedback/${target}`,
      { classNo: classNo, content: content },
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
        process.env.VITE_APP_API_URL + `/course-feedback/${target}/edit`,
        { commentId: id, content: content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-feedback/${target}/edit`,
        { reviewId: id, content: content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    const targetData = targetArray.find((targetData) => targetData.id === id);
    targetData.content = content;
    targetData.updatedAt = response.data.data.updatedAt;

    await store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "操作成功",
    });
  } catch (error: any) {
    let message = "未知錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";
    else if (error.response.data.statusCode === 403) message = "無此權限";

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
        process.env.VITE_APP_API_URL + `/course-feedback/${target}/delete`,
        { commentId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    else
      response = await axios.post(
        process.env.VITE_APP_API_URL + `/course-feedback/${target}/delete`,
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
    else if (error.response.data.statusCode === 403) message = "無此權限";

    await store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function uploadPastExam(
  classNo: string,
  uploadData: {
    year: string;
    description: string;
    file: File;
  },
  pastExamArray: any[]
) {
  if (
    !uploadData.file ||
    uploadData.year === "" ||
    uploadData.description === ""
  ) {
    store.dispatch("pushToast", {
      type: ToastType.WARNING,
      message: "請填寫完整資料",
    });
    return;
  }
  const formdata = new FormData();
  formdata.append("classNo", classNo);
  formdata.append("file", uploadData.file);
  formdata.append("year", uploadData.year);
  formdata.append("description", uploadData.description);
  try {
    const resp = await axios.post(
      process.env.VITE_APP_API_URL + `/course-feedback/past-exam/upload`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "上傳成功",
    });

    pastExamArray.push(resp.data.data);
  } catch (error: any) {
    let message = "上傳時發生錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";
    else if (error.response.data.statusCode === 400) message = "檔案不合法";
    store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function downloadPastExam(
  pastExamId: number,
  pastExamArray: any[]
) {
  try {
    const resp = await axios.get(
      `${process.env.VITE_APP_API_URL}/course-feedback/past-exam/${pastExamId}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // save file to local
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement("a");
    link.href = url;
    const savedFilename = resp.headers["content-disposition"].substring(
      resp.headers["content-disposition"].indexOf("=") + 1
    );
    link.download = savedFilename ? savedFilename : "pastexam";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    pastExamArray.find((pastExam) => pastExam.id === pastExamId)
      .downloadCount++;
  } catch (error: any) {
    let message = "下載時發生錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";
    store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

export async function deletePastExam(pastExamId: number, pastExamArray: any[]) {
  try {
    await axios.post(
      `${process.env.VITE_APP_API_URL}/course-feedback/past-exam/delete`,
      { pastExamId: pastExamId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    pastExamArray.splice(
      pastExamArray.findIndex((pastExam) => pastExam.id === pastExamId),
      1
    );
    store.dispatch("pushToast", {
      type: ToastType.SUCCESS,
      message: "刪除成功",
    });
  } catch (error: any) {
    let message = "刪除時發生錯誤";
    if (error.response.data.statusCode === 401) message = "尚未登入";
    else if (error.response.data.statusCode === 403) message = "無此權限";

    store.dispatch("pushToast", {
      type: ToastType.ERROR,
      message: message,
    });
  }
}

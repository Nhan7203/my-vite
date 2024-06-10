import * as request from "../../utils/request";

export const getAllNotisByUser = async (userId: number) => {
  try {
    const res = await request.get(`Notification/getAllNotisByUser?userId=${userId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateNotificationReadStatus = async (notificationId: number) => {
    try {
      const response = await request.put(
        `Notification/updateNotificationReadStatus?notificationId=${notificationId}`,
        {
          isRead: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating notification read status:", error);
      throw error;
    }
  };

  export const deleteAllNotificationsByUser = async (userId: number) => {
    try {
      const res = await request.deleteData(`Notification/deleteAllNotificationsByUser?userId=${userId}`);
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteOneNotification = async (notificationId: number) => {
    try {
      const res = await request.deleteData(`Notification/deleteOneNotification?notificationId=${notificationId}`);
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
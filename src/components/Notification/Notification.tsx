import { deleteAllNotificationsByUser, deleteOneNotification, getAllNotisByUser, updateNotificationReadStatus } from "../../apiServices/NotificationService/notificationService";
import { FaRegTrashCan, IoNotificationsOutline } from "../../import/import-libary";
import { useEffect, useState } from "../../import/import-another";
import { empty, noti, trash } from "../../import/import-assets";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { iNotification } from "../../interfaces";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<iNotification[]>([]);
  const token = localStorage.getItem("token");

  //------------------------ fetch Notifications ---------------------------------------------

  useEffect(() => {
    if (token) {
      const userIdFromToken = getUserIdFromToken(token);

      const fetchNotifications = async () => {
        try {
          const result = await getAllNotisByUser(userIdFromToken);
          setNotifications(result);
        } catch (error) {
          console.error("Error retrieving notifications:", error);
        }
      };

      fetchNotifications();
    }
  }, [token]);

//------------------- Handle Box Noti -------------------------------------

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleMouseLeave = () => {
    setShowNotification(false);
  };

//------------------- handle Click Noti -----------------------------------

  const handleNotificationClick = async (notification: iNotification) => {
    if (!notification.isRead) {
      const updatedNotifications = notifications.map((n) =>
        n.notificationId === notification.notificationId
          ? { ...n, isRead: true }
          : n
      );
      setNotifications(updatedNotifications);

      try {
        const response = await updateNotificationReadStatus(
          notification.notificationId
        );

        if (!response) {
          throw new Error("Error updating notification status");
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

  //-------------------------Delete Noti-----------------------------------------

  const deleteNotification = async (notificationId: number) => {
    try {
      await deleteOneNotification(notificationId);

      setNotifications(
        notifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  //------------------------ Delete All Noti -----------------------------------

  const deleteAllNotifications = async () => {
    try {
      if (token) {
        const userIdFromToken = getUserIdFromToken(token);

        await deleteAllNotificationsByUser(userIdFromToken);

        setNotifications([]);
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  return (
    <div className="icon-noti">
      <IoNotificationsOutline
        fontSize="2.0em"
        className="icon-noti "
        onClick={toggleNotification}
      />
      <div className="cart-count">
        {notifications.filter((notification) => !notification.isRead).length}
      </div>
      <div
        className={`noti-box ${showNotification ? "active" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        {notifications && notifications.length > 0 ? (
          <>
            <div
              style={{
                overflow: "auto",
                height: "400px",
                width: "499px",
              }}
            >
              {notifications.map((notification) => (
                <div
                  className={`element-noti ${
                    notification.isRead ? "" : "unread"
                  }`}
                  key={notification.notificationId}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="img-noti">
                    <img src={noti} alt="" />
                  </div>
                  <div className="text-noti">
                    <div className="header-noti">{notification.header}</div>
                    <div className="content-noti">{notification.content}</div>
                    <div className="date-noti">
                      {new Date(notification.createdDate).toLocaleString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                  <div className="status-noti">
                    <FaRegTrashCan
                      fontSize="1.5em"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteNotification(notification.notificationId)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="icon-trash-all" onClick={deleteAllNotifications}>
              <img src={trash} alt=""></img>
              Delete all
            </div>
          </>
        ) : (
          <img src={empty} alt="" style={{ width: "50px" }} />
        )}
      </div>
    </div>
  );
};

export default Notification;

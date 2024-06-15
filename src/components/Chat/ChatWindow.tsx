import { useState, useEffect, useMemo } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getUserIdFromToken } from "../../utils/jwtHelper";

interface ChatMessage {
  userId: number;
  senderId: number;
  sender: string;
  content: string;
  createdDate: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  const currentUserId = useMemo(() => {
    if (!token) {
      console.error("Token not found");
      return null;
    }
    const userId = getUserIdFromToken(token);
    return typeof userId === "string" ? parseInt(userId) : userId;
  }, [token]);

  useEffect(() => {
    if (currentUserId) {
      fetchChats(currentUserId);
    }
  }, [currentUserId]);
  const fetchChats = async (userId: string) => {
    try {
      const response = await fetch(
        `https://localhost:7030/api/Chat/getUserChat?userId=${parseInt(userId)}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else if (response.status === 404) {
        setMessages([]);
      } else {
        throw new Error("Failed to fetch chat messages");
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = async (userId: number) => {
    setIsLoading(true);
    setSelectedUser(userId);

    try {
      const [currentUserChatsResponse, selectedUserChatsResponse] =
        await Promise.all([
          fetch(
            `https://localhost:7030/api/Chat/getUserChat?userId=${currentUserId}`
          ),
          fetch(`https://localhost:7030/api/Chat/getUserChat?userId=${userId}`),
        ]);

      const currentUserChats = currentUserChatsResponse.ok
        ? await currentUserChatsResponse.json()
        : [];
      const selectedUserChats = selectedUserChatsResponse.ok
        ? await selectedUserChatsResponse.json()
        : [];

      const filteredCurrentUserChats = currentUserChats.filter(
        (message: ChatMessage) => message.senderId === userId
      );

      const filteredSelectedUserChats = selectedUserChats.filter(
        (message: ChatMessage) => message.senderId === currentUserId
      );

      const combinedMessages = [
        ...filteredCurrentUserChats,
        ...filteredSelectedUserChats,
      ].sort(
        (a: ChatMessage, b: ChatMessage) =>
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );

      setMessages(combinedMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    const message = newMessage;
    const receiverId = selectedUser || 2;

    fetch(
      `https://localhost:7030/api/Chat/SendChat?senderId=${currentUserId}&message=${message}&recieverId=${receiverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      }
    )
      .then((response) => response.json())
      .then((data) => setMessages([...messages, data]))
      .catch((error) => console.error("Error sending message:", error));

    setNewMessage("");
  };

  const uniqueSenders: { [key: number]: string } = {};

  messages.forEach((message) => {
    if (message.senderId !== currentUserId) {
      uniqueSenders[message.senderId] = message.sender;
    }
  });

  const hasChatted = Object.keys(uniqueSenders).length > 0;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      {isLoading ? (
        <Typography variant="body1" align="center" sx={{ my: 2 }}>
          Loading...
        </Typography>
      ) : !selectedUser ? (
        hasChatted ? (
          <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
            {Object.entries(uniqueSenders).map(([senderId, sender]) => (
              <Typography
                key={senderId}
                onClick={() => handleUserClick(Number(senderId))}
                sx={{
                  backgroundColor: "lightblue",
                  padding: "8px",
                  borderRadius: "8px",
                  margin: "4px 0",
                  cursor: "pointer",
                }}
              >
                <strong>{sender}</strong>
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" align="center" sx={{ my: 2 }}>
            Let's start your first chat with Staff.
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Message"
                variant="outlined"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                sx={{ mr: 1, flexGrow: 1 }}
              />
              <Button variant="contained" onClick={handleSendMessage}>
                Send
              </Button>
            </Box>
          </Typography>
        )
      ) : (
        <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
          {messages.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ my: 2 }}>
              No messages to display.
            </Typography>
          ) : (
            messages.map((message, index) => (
              <Typography
                key={index}
                align={message.senderId === currentUserId ? "right" : "left"}
                sx={{
                  backgroundColor:
                    message.senderId === currentUserId
                      ? "lightblue"
                      : "#f0f0f0",
                  padding: "8px",
                  borderRadius: "8px",
                  margin: "4px 0",
                  textAlign:
                    message.senderId === currentUserId ? "right" : "left",
                }}
              >
                <strong>{message.sender}</strong>: {message.content}
                <br />
                <small>
                  {new Date(message.createdDate).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </Typography>
            ))
          )}
        </Box>
      )}

      {selectedUser && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Message"
            variant="outlined"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            sx={{ mr: 1, flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      )}

      <Button variant="outlined" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default ChatWindow;

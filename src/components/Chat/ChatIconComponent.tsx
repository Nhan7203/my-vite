import { IconButton } from "@mui/material";
import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatIcon from "@mui/icons-material/Chat";

const ChatIconComponent = () => {
  const [open, setOpen] = useState(false);

  const handleIconClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton
        onClick={handleIconClick}
        style={{ position: "fixed", bottom: "80px", right: "20px" }}
      >
        <ChatIcon fontSize="large" />
      </IconButton>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ChatIconComponent;

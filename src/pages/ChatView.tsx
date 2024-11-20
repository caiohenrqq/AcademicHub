import "./Style.css";
import React from "react";
import { useParams } from "react-router-dom";

const ChatView: React.FC = () => {
  const { topicName } = useParams<{ topicName: string }>();

  return (
    <div className="chat-view">
      <h1>Chat for: <br /> {topicName}</h1>
    </div>
  );
};

export default ChatView;


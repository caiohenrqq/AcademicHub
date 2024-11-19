import React from "react";
import "./Style.css";

interface Topics {
  topicName: string;
  lastMessage: string;
}

const Chats: React.FC<Topics> = ({ topicName, lastMessage }) => {
  return (
  <div className="chat">
    <h2 className="topic-name">
        {topicName};
      <p className="last-message">
        {lastMessage};
      </p>
    </h2>
  </div>
  );
};

export default Chats;

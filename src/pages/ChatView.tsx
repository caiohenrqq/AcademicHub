import React, { useState } from "react";
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonFooter, IonInput, IonFabButton } from "@ionic/react";
import { paperPlane, arrowBack } from "ionicons/icons";  
import "./Style.css";
import { useParams } from "react-router-dom";

const ChatView: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey, how are you?", sender: "other" },
    { text: "I'm good, thanks for asking!", sender: "me" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "me" };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const { topicName } = useParams<{ topicName: string }>();

  return (
    <div className="chat-view">
      {/* Chat Header */}
      <IonHeader>
          <IonButtons slot="start">
            <IonButton routerLink="/topicos">
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{topicName}</IonTitle>
      </IonHeader>
      {/* Chat Content: Messages */}
      <IonContent className="chat-content">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "me" ? "message-sent" : "message-received"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </IonContent>

      {/* Message Input Area */}
      <IonFooter>
        <div className="message-input-container">
          <IonInput
            value={message}
            onIonChange={(e) => setMessage(e.detail.value!)}
            placeholder="Type a message..."
            className="input"
            clearInput={true}
          />
        
          <IonFabButton onClick={handleSendMessage}>
            <IonIcon icon={paperPlane} />
          </IonFabButton>          
          
        </div>
      </IonFooter>
    </div>
  );
};

export default ChatView;

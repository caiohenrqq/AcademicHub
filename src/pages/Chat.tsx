import React, { useState } from "react";
import { IonContent, IonHeader, IonButtons, IonButton, IonIcon, IonTitle, IonFooter, IonInput, IonFabButton, IonPage } from "@ionic/react";
import { paperPlane, arrowBack } from "ionicons/icons";
import { useParams } from "react-router-dom";
import "./Style.css";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hey, how are you?", sender: "other", time: "10:30:32 AM" },
    { text: "I'm good, thanks for asking!", sender: "me", time: "10:32:16 AM" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message, sender: "me", time: new Date().toLocaleTimeString() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const { topicName } = useParams<{ topicName: string }>();

  return (
    <IonPage>
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
              <div>{msg.text}</div>
              <div className="message-time">{msg.time}</div>
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
    </IonPage>
  );
};

export default Chat;

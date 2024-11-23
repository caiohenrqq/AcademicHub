import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonFooter,
  IonInput,
  IonFabButton,
} from "@ionic/react";
import { paperPlane, arrowBack } from "ionicons/icons";
import "./Style.css";
import { useParams } from "react-router-dom";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../firebase";

const Chat: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ id: string; text: string; sender: string; timestamp: any }[]>([]);

  useEffect(() => {
    // Real-time listener for Firestore messages
    const messagesRef = collection(database, `topics/${topicId}/messages`);
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any
      );
    });

    return () => unsubscribe(); // Cleanup listener
  }, [topicId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const messagesRef = collection(database, `topics/${topicId}/messages`);
      await addDoc(messagesRef, {
        text: message,
        sender: "currentUserId", // Replace with authenticated user ID
        timestamp: new Date(),
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-view">
      {/* Chat Header */}
      <IonHeader>
        <IonButtons slot="start">
          <IonButton routerLink="/topicos">
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonButtons>
        <IonTitle>{topicId}</IonTitle>
      </IonHeader>

      {/* Chat Content */}
      <IonContent className="chat-content">
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "currentUserId" ? "message-sent" : "message-received"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </IonContent>

      {/* Message Input */}
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

export default Chat;

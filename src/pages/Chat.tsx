import React, { useEffect, useState, useRef } from "react";
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
  IonItem,
  isPlatform,
} from "@ionic/react";
import { paperPlane, arrowBack } from "ionicons/icons";
import "./Style.css";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { database } from "../firebase";
import { getAuth } from "firebase/auth";
import LoadingPopup from "../Loading";
import { Keyboard } from "@capacitor/keyboard";
import { App } from "@capacitor/app";

const Chat: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topicName, setTopicName] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: string; timestamp: any }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  useEffect(() => {
    if (isPlatform("hybrid")) {
      const handleKeyboardShow = () => {
        // Add the class to IonContent when the keyboard shows
        const content = document.querySelector("ion-content");
        if (content) {
          content.classList.add("keyboard-open");
        }
      };

      const handleKeyboardHide = () => {
        // Remove the class from IonContent when the keyboard hides
        const content = document.querySelector("ion-content");
        if (content) {
          content.classList.remove("keyboard-open");
        }
      };

      // Listen for the keyboard show and hide events
      Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
      Keyboard.addListener("keyboardWillHide", handleKeyboardHide);

      // Listen for the back button press (Android)
      const handleBackButton = () => {
        const content = document.querySelector("ion-content");
        if (content) {
          content.classList.remove("keyboard-open");
        }
      };

      App.addListener("backButton", handleBackButton);

      // Cleanup listeners on unmount
      return () => {
        Keyboard.removeAllListeners();
        App.removeAllListeners();
      };
    } else {
      // Web fallback: The keyboard plugin isn't available, so log a warning (optional)
      console.warn("Keyboard plugin is not available on the web.");
    }
  }, []);

  useEffect(() => {
    const fetchTopicName = async () => {
      try {
        const topicDoc = doc(database, "topics", topicId);
        const topicSnapshot = await getDoc(topicDoc);

        if (topicSnapshot.exists()) {
          setTopicName(topicSnapshot.data().name || "Unknown Topic");
        } else {
          setTopicName("Topic Not Found");
        }
      } catch (error) {
        console.error("Error fetching topic name:", error);
        setTopicName("Error Loading Topic");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicName();
  }, [topicId]);

  // Fetch and listen for messages
  useEffect(() => {
    const messagesPath = collection(database, `topics/${topicId}/messages`);
    const q = query(messagesPath, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any
      );
    });

    return () => unsubscribe();
  }, [topicId]);

  useEffect(() => {
    const scrollToBottom = async () => {
      if (contentRef.current) {
        await contentRef.current.scrollToBottom(600);
      }
    };
    scrollToBottom();
  }, [messages]);
  

  const handleSendMessage = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && message.trim()) {
      const messagesPath = collection(database, `topics/${topicId}/messages`);
      await addDoc(messagesPath, {
        text: message,
        sender: currentUser.displayName,
        timestamp: new Date(),
      });
      setMessage("");
    } else {
      console.log("User not authenticated or message is empty");
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
        <IonTitle>{loading ? "Carregando..." : topicName}</IonTitle>
      </IonHeader>

      {/* Chat Content */}
      <IonContent className="chat-content" ref={contentRef} scrollEvents={true} scrollY={true}>
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === getAuth().currentUser?.displayName
                    ? "message-sent"
                    : "message-received"
                }`}
              >
                {<strong>{msg.sender}</strong>}: {msg.text}
              </div>
            ))}
          </div>

          <IonItem className="chat-input">
            <div className="message-input-container">
              <IonInput
                value={message}
                onIonChange={(e) => setMessage(e.detail.value!)}
                placeholder="Escreva sua mensagem..."
                className="input"
                clearInput={true}
              />
              <IonFabButton onClick={handleSendMessage}>
                <IonIcon icon={paperPlane} />
              </IonFabButton>
            </div>
          </IonItem>
        </div>
        <LoadingPopup isOpen={loading} />
      </IonContent>
    </div>
  );
};

export default Chat;

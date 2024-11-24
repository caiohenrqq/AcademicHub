import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonPopover,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonButton,
} from "@ionic/react";
import { database } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import "./Style.css";
import { useUser } from "../UserContext";
import { useHistory } from "react-router-dom";

const Topicos = () => {
  const { user, loading } = useUser();

  const { logout } = useUser();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/folder/Login");
  };

  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsSnapshot = await getDocs(collection(database, "topics"));
      const fetchedTopics = [];

      for (const topicDoc of topicsSnapshot.docs) {
        const topicId = topicDoc.id;
        const messagesRef = collection(database, `topics/${topicId}/messages`);

        // Query for the most recent message (limit to 1, ordered by timestamp)
        const messagesQuery = query(
          messagesRef,
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const messagesSnapshot = await getDocs(messagesQuery);

        let lastMessage = "";
        let lastUser = "";
        let lastMessageTime = "";

        // Get the most recent message if available
        if (!messagesSnapshot.empty) {
          const lastMessageDoc = messagesSnapshot.docs[0];
          lastMessage = lastMessageDoc.data().text;
          lastUser = lastMessageDoc.data().sender;

          // Check if timestamp is a Firestore Timestamp object and convert it to a Date
          const timestamp = lastMessageDoc.data().timestamp;
          if (timestamp instanceof Timestamp) {
            lastMessageTime = timestamp.toDate().toLocaleTimeString(); // Format timestamp to time string
          }
        }

        fetchedTopics.push({
          id: topicId,
          name: topicDoc.data().name,
          lastMessage,
          lastUser,
          lastMessageTime,
        });
      }

      setTopics(fetchedTopics);
    };

    fetchTopics();
  }, []); // Empty dependency array ensures it runs once on component mount

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="topicos-section">
          <div className="pesquisar">
            <div className="icone">
              <IonImg
                src="/favicon.png"
                alt="AcademicHub, sua comunidade universitária :)"
              />
            </div>
            <div className="container-pesquisar">
              <IonSearchbar
                className="rounded-searchbar"
                placeholder="Escolha seu tópico"
              />
              <IonButtons className="menuicon" slot="start">
                <IonMenuButton
                  id="click-trigger"
                  menu="main-menu"
                  autoHide={false}
                />
              </IonButtons>
              <IonPopover trigger="click-trigger" triggerAction="click">
                <IonContent class="ion-padding">
                  <IonButton onClick={handleLogout}>Logout</IonButton>
                </IonContent>
              </IonPopover>
            </div>
          </div>

          <section className="chats-section">
            {user ? (
              <IonText className="topic-name center">
                <h2>Olá, {user.displayName || user.email}!</h2>
              </IonText>
            ) : (
              <IonText>
                <h2>Olá, Guest!</h2>
              </IonText>
            )}
            <IonList>
              {topics.map((topic) => (
                <IonItem
                  className="topic-name"
                  button
                  key={topic.id}
                  routerLink={`/chat/${topic.id}`}
                >
                  <IonLabel>
                    <h2>{topic.name}</h2>
                    <p>
                      <IonText className="topic-message">
                        <strong>{topic.lastUser}</strong>
                        {topic.lastMessage
                          ? `: ${topic.lastMessage}`
                          : "Nenhuma mensagem."}
                      </IonText>
                      <span className="right">{topic.lastMessageTime}</span>
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </section>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Topicos;

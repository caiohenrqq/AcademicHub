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
  IonInput,
  IonModal,
} from "@ionic/react";
import { database } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import "./Style.css";
import { useUser } from "../UserContext";
import { useHistory } from "react-router-dom";
import LoadingPopup from "../Loading";

const Topicos = () => {
  const { user } = useUser();
  const { logout } = useUser();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [newTopicName, setNewTopicName] = useState(""); // State for new topic name
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    history.push("/folder/Login");
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsSnapshot = await getDocs(collection(database, "topics"));
        const fetchedTopics = [];

        for (const topicDoc of topicsSnapshot.docs) {
          const topicId = topicDoc.id;
          const messagesRef = collection(
            database,
            `topics/${topicId}/messages`
          );

          const messagesQuery = query(
            messagesRef,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const messagesSnapshot = await getDocs(messagesQuery);

          let lastMessage = "";
          let lastUser = "";
          let lastMessageTime = "";

          if (!messagesSnapshot.empty) {
            const lastMessageDoc = messagesSnapshot.docs[0];
            lastMessage = lastMessageDoc.data().text;
            lastUser = lastMessageDoc.data().sender;

            const timestamp = lastMessageDoc.data().timestamp;
            if (timestamp instanceof Timestamp) {
              lastMessageTime = timestamp.toDate().toLocaleTimeString();
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
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false); // Toggle loading state off once data is loaded
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <LoadingPopup isOpen={loading} />;
  }

  const handleCreateTopic = async () => {
    if (newTopicName.trim()) {
      try {
        // Add new topic to Firestore
        await addDoc(collection(database, "topics"), {
          name: newTopicName,
          createdAt: new Date(),
        });
        setNewTopicName(""); // Clear input field
        setShowModal(false); // Close the modal
        console.log("New topic created!");
      } catch (error) {
        console.error("Error creating topic: ", error);
      }
    } else {
      console.log("Please provide a valid topic name.");
    }
  };

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
                  <IonButton onClick={() => setShowModal(true)}>
                    Criar
                  </IonButton>
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
          {/* Modal for creating a new topic */}
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div style={{ padding: "20px" }}>
              <h2>Criar Novo Tópico</h2>
              <IonInput
                value={newTopicName}
                onIonChange={(e) => setNewTopicName(e.detail.value!)}
                placeholder="Nome do Tópico"
                clearInput
              />
              <IonButton
                onClick={handleCreateTopic}
                disabled={!newTopicName.trim()}
              >
                Criar Tópico
              </IonButton>
              <IonButton onClick={() => setShowModal(false)}>
                Cancelar
              </IonButton>
            </div>
          </IonModal>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Topicos;

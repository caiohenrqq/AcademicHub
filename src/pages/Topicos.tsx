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
} from "@ionic/react";

import "./Style.css";

import { Link } from "react-router-dom";

const Topicos = () => {
  // Sample data (this will be dynamic in the future, pulled from a database)
  const topics = [
    {
      name: "Mathematics",
      lastUser: "John Doe",
      lastMessage: "Can anyone help with calculus?",
      lastMessageTime: "10:30 AM",
      id: 1,
    },
    {
      name: "CS:GO Strategies",
      lastUser: "Jane Smith",
      lastMessage: "Headshot in the A site!",
      lastMessageTime: "9:15 AM",
      id: 2,
    },
    // Add more topics here as needed
  ];

  return (
    <>
      <IonPage id="main-content">
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
                    Here is going to be a great button!
                  </IonContent>
                </IonPopover>
              </div>
            </div>

            <section className="chats-section">
              <IonList>
                {topics.map((topic) => (
                  <IonItem
                    button
                    key={topic.id}
                    routerLink={`/chat/${topic.id}`}
                  >
                    <IonLabel>
                      <h2 className="topic-name">{topic.name}</h2>
                      <p>
                        <IonText className="topic-name" color="dark">
                          <strong>{topic.lastUser}</strong>: {topic.lastMessage}
                        </IonText>
                        <span> - {topic.lastMessageTime}</span>
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </section>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Topicos;

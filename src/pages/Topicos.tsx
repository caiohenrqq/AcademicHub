import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonPopover,
} from "@ionic/react";
import Topics from "./Chats";


const PesquisaPage = () => {
  const topics = [
    {
      topicName: "Math",
      lastMessage: "How do hooks work?",
    },
    {
      topicName: "Computer-Science",
      lastMessage: "How to define an interface?",
    },
    { 
      topicName: "Another-Stuff", 
      lastMessage: "Is Styled-components better?" 
    },
  ];
  return (
    <>
      {/* Topic's Page */}
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
                {/* Menu Button */}
                <IonButtons className="menuicon" slot="start">
                  <IonMenuButton
                    id="click-trigger"
                    menu="main-menu"
                    autoHide={false}
                  />
                </IonButtons>
                {/* Menu */}
                <IonPopover trigger="click-trigger" triggerAction="click">
                  <IonContent class="ion-padding">Hello World!</IonContent>
                </IonPopover>
              </div>
            </div>

            <section className="chats-section">
              {topics.map((topic, index) => (
                <Topics
                  key={index}
                  topicName={topic.topicName}
                  lastMessage={topic.lastMessage}
                ></Topics>
              ))}
            </section>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PesquisaPage;

import React from "react";
import "./Style.css";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";

interface Topics {
  topicName: string;
  lastMessage: string;
  topicId: number; 
}

const Chats: React.FC<Topics> = ({ topicName, lastMessage, topicId }) => {
  const history = useHistory();

  const goToChat = () => {
    history.push(`/topicos/?topicName=${encodeURIComponent(topicId)}`);
  };
  
  return (
    <div onClick={goToChat} className="chat">
      <IonList lines="full" inset={true}>
        <IonItem button={true} detail={false}>
          <IonLabel color="medium">
            <strong className="topic-name">{topicName}</strong>
            <br />
            <IonNote color="medium" className="ion-text-wrap">
              {lastMessage}
            </IonNote>
          </IonLabel>
          <div className="metadata-end-wrapper" slot="end">
            <IonNote color="medium">06:11</IonNote>
          </div>
        </IonItem>
      </IonList>
    </div>
  );
};

export default Chats;

import React from "react";
import { IonList, IonItem, IonLabel, IonNote } from "@ionic/react";
import { useHistory } from "react-router-dom";

interface Topics {
  topicName: string;
  lastMessage: string;
}

const Chats: React.FC<Topics> = ({ topicName, lastMessage }) => {
  const history = useHistory();

  const goToChat = () => {
    window.location.href = `/topicos/${topicName}`;
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

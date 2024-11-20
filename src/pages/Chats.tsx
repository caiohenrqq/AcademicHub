import React from "react";
import "./Style.css";
import { useHistory } from "react-router-dom";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { chevronForward, listCircle } from "ionicons/icons";

interface Topics {
  topicName: string;
  lastMessage: string;
}

// const history = useHistory();

// // Function to navigate to topics after successful login
// const goToTopicos = () => {
//   history.push("/topicos");
// };

const Chats: React.FC<Topics> = ({ topicName, lastMessage }) => {
  return (
    <div className="chat">
      <IonList inset={true}>
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

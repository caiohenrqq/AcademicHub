import React from "react";
import { IonList, IonItem, IonLabel, IonNote } from "@ionic/react";
import { useHistory } from "react-router-dom";

const Chats = ()=> {
  return (
    <div className="chat">
      <IonList lines="full" inset={true}>
        <IonItem button={true} detail={false}>
          <IonLabel color="medium">
            <strong className="topic-name">{}</strong>
            <br />
            <IonNote color="medium" className="ion-text-wrap">
              {}
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

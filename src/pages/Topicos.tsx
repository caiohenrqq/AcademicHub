import {
    IonContent,
    IonPage,
  } from "@ionic/react";
import "./Page.css";
import { useHistory } from "react-router";

  const Topicos: React.FC = () => {
    return (
      <IonPage>
        <IonContent fullscreen>
          <section className="topicos-section">
            
          </section>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Topicos;
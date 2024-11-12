import {
    IonContent,
    IonPage,
  } from "@ionic/react";
import "./Page.css";
import { useHistory } from "react-router";
import { IonSearchbar } from '@ionic/react';

  const Topicos: React.FC = () => {
    return (
      <IonPage>
        <IonContent fullscreen>
          <section className="topicos-section">
            <div className="pesquisar"> 
              <div className="container-pesquisar">
                <IonSearchbar class="rounded-searchbar" placeholder="Escolha seu tópico">
                </IonSearchbar>
              </div>
            </div>
          </section>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Topicos;
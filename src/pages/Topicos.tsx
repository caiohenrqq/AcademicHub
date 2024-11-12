import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonFooter,
  IonImg,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { search } from "ionicons/icons";
import favicon from "/favicon.png";

const PesquisaPage = () => {
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
                <IonMenuButton autoHide={false}></IonMenuButton>
              </IonButtons>
            </div>
          </div>
        </section>
      </IonContent>
      <IonFooter translucent={true}>
        <IonToolbar className="footer">
          <div className="footer-content">
            <IonImg
              className="icon-footer"
              src="/favicon.png"
              alt="AcademicHub, sua comunidade universitária :)"
            />
            <IonTitle className="titulo-footer">
              um app para universitários.
            </IonTitle>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PesquisaPage;

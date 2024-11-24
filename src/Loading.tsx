import React from "react";
import { IonModal, IonSpinner } from "@ionic/react";
import "./pages/Style.css"; 

interface LoadingPopupProps {
  isOpen: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isOpen }) => {
  return (
    <IonModal isOpen={isOpen} backdropDismiss={false} className="loading-popup">
      <div className="loading-container">
        <IonSpinner />
        <p>Carregando...</p>
      </div>
    </IonModal>
  );
};

export default LoadingPopup;

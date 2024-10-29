import React from "react";
import classnames from "classnames";
import pokeball from "./assets/frente-urso.png";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;

const styles = StyleSheet.create({
    card: {
      width: '100%',
      height: '100%',
      borderRadius: 4,
      shadowColor: '#DEDEDE',  // Substituto para box-shadow
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,  // Adicionado para sombras em Android
      transitionDuration: '0.3s', // Usar animações no React Native requer o Animated API, então esse valor só define a duração de uma transição direta
      transform: [{ perspective: 1000 }],  // Simula preserve-3d com perspectiva
      position: 'relative',
    },
  
    img: {
      width: '95%',
      height: '95%',
    },
  
    cardFace: {
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  
    cardBackFace: {
      transform: [{ rotateY: '180deg' }],
    },
  
    isFlipped: {
      transform: [{ rotateY: '180deg' }],
    },
  
    isInactive: {
      opacity: 0, // Controla visibilidade de elementos inativos
    },
  });
  
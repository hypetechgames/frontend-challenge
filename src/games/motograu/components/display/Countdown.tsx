import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    // Inicie o primeiro contador após uma pausa de 7 segundos
    const initialCountdown = setTimeout(() => {
      setCounter(3);
    }, 9000);

    // Limpar o timeout quando o componente for desmontado ou quando o primeiro contador não for mais necessário
    return () => {
      clearTimeout(initialCountdown);
    };
  }, []); // Este efeito só será executado uma vez no montar do componente

  useEffect(() => {
    if (counter !== null) {
      // Quando o contador inicial não for nulo, execute a contagem regressiva
      const countdownInterval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      // Limpar o intervalo do countdown quando o contador chegar a 0
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [counter]); // Este efeito será acionado sempre que o valor do contador for atualizado

  return (
    <div>
      {counter !== null ? (
        // Renderizar o valor do contador na tela com estilos embutidos para animação de piscar
        <p style={{ fontSize: '4em', animation: 'blink-animation 1s infinite' }}>
          {counter}
        </p>
      ) : (
        // Mensagem de espera durante o intervalo de 7 segundos
        <></>
      )}
      <style>
        {`
          @keyframes blink-animation {
            to {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Countdown;

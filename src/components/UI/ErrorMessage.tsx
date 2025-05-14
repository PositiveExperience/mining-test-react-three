import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import './ErrorMessage.css';

const ErrorMessage = observer(({ text }: { text: string }) => {
  const { nodeStore } = useStores();

  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-text">{text}</p>
      <button 
        className="retry-button"
        onClick={() => nodeStore.loadNodes('./src/assets/data/MIM_Scheme.xml')}
      >
        Повторить попытку
      </button>
    </div>
  );
});

export default ErrorMessage;
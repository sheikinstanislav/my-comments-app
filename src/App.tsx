import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store'; // Змінено на правильний імпорт
import CommentsPage from './pages/CommentsPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App w-full">
          <CommentsPage />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;

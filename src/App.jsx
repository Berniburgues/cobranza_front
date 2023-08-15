import React from 'react';
import { UserProvider } from './contexts/UserContext'; // Asegúrate de importar el UserProvider
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return (
    <UserProvider>
      <section>
        <RouterProvider router={router} />
      </section>
    </UserProvider>
  );
};

export default App;

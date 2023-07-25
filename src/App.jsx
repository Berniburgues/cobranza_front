import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return (
    <section>
      <RouterProvider router={router} />
    </section>
  );
};

export default App;

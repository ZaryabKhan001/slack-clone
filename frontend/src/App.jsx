import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router';
import { HomePage, AuthPage } from './pages/index.js';

const App = () => {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<Navigate to={'/'} replace />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='*' element={<Navigate to={'/auth'} replace />} />
        </Routes>
      </SignedOut>
    </>
  );
};

export default App;

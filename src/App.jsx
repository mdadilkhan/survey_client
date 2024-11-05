import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RegisterForm from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Quiz from './pages/Question.jsx';
import Landing from './pages/Landing.jsx';
import Thankyou from './pages/Thankyou.jsx';
import { useSelector } from 'react-redux';

// ProtectedRoute component
const ProtectedRoute = () => {
  const userDetails = useSelector((state) => state.userDetails.currentUser);

  if (!userDetails || !userDetails.token) {
    return <Navigate to="/register" />;
  }
  return <Outlet />; 
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/question/:questionId" element={<Quiz />} />
            <Route path="/thankyou" element={<Thankyou />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RegisterForm from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Quiz from './pages/Question.jsx';
import Landing from './pages/Landing.jsx';
import Thankyou from './pages/Thankyou.jsx';
import { useSelector } from 'react-redux';
import Time from './pages/Times.jsx';
import PayementDetails from './pages/Payment.jsx';
import ThankyouWorkshop from './pages/ThankYouWorkshop.jsx';
import ViewResult from './pages/ViewResult.jsx'
import WorkShop from './pages/WorkShop.jsx';
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
          <Route path="/" element={<Landing />} />
          <Route path="/workshop" element={<WorkShop />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/workshop/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/question/:questionId" element={<Quiz />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/workshop/thankyou" element={<ThankyouWorkshop />} />
            <Route path="/workshop/payment" element={<PayementDetails/>}/>
            <Route path="/workshop/result" element={<ViewResult/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

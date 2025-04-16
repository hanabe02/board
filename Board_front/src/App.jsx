import { Routes, Route, Navigate,  } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; // ✅ useEffect 추가
import BoardPage from './pages/BoardPage';
import WritePage from './pages/WritePage';
import LoginPage from './pages/loginPage';
import BoardDetailPage from './pages/BoardDetailPage'; 


function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedLogin, setCheckedLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckedLogin(true); // ✅ 복구 완료 표시
  }, []);

  if (!checkedLogin) return <div>로딩 중...</div>;


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/board"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <BoardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/write"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <WritePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/board/:boardId"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <BoardDetailPage />
          </PrivateRoute>
        }
      />
    </Routes>
    
  );
}

export default App;

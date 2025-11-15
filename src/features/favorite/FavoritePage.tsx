import React, { useEffect } from "react";
import { authClient } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authClient.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
    }
  }, [currentUser, navigate]);

  return <h1>This is FavoritePage</h1>;
};

export default FavoritePage;

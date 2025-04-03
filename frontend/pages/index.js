import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dashboard from "./dashboard"; // Import the Dashboard component

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");

    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show loading while checking authentication
  }

  return <Dashboard />;
};

export default Home;

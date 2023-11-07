import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem('username');
    if (username === '' || username === null) {
    }
  }, [navigate]);

  return <div>
    <center><h1>Hello Home</h1></center>
  </div>;
}

export default Home;



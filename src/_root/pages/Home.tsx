import DashBoard from "../../components/DashBoard";
import LeaderBoard from "../../components/LeaderBoard";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const role = user.role;
  document.title = "Player Management-Home";


  if(role === 'admin' || role === 'staff') {
    return <div><DashBoard/></div>
  } else {
    return <LeaderBoard/>
  }
};

export default Home;

import LeaderBoard from "../../components/LeaderBoard";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const role = user.role;
  document.title = "Player Management-Home";

  return (
    <div>
      {role === "admin" ? (
        <div>Admin</div>
      ) : role === "staff" ? (
        <div>Staff</div>
      ) : (
        <LeaderBoard />
      )}
    </div>
  );
};

export default Home;

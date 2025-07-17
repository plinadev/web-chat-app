import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden backdrop-blur-lg shadow-2xl">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;

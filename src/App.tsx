import "./App.css";
import Board from "./components/Board";
import Profile from "./components/Profile";
import PageLayout from "./PageLayout";

function App() {
  return (
    <>
      <PageLayout>
        <Board />
        <Profile />
      </PageLayout>
    </>
  );
}

export default App;

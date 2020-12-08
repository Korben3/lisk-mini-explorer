import "./App.css";
import Header from "./components/Header";
import DelegatesTable from "./components/DelegatesTable";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import Snowfall from "react-snowfall";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Snowfall snowflakeCount={40} />
        <Header />
        <Statistics />
        <DelegatesTable />
        <Footer />
      </div>
    </div>
  );
};

export default App;

import { useState } from "react";
import Result from "./assets/components/Result";
import Header from "./assets/components/Header"
import Navbar from "./assets/components/Navbar";

function App() {

  const [isTestComplete, setIsTestComplete] = useState(false);

  const handleTestCompletion = () => {
    setIsTestComplete(true);
  };

  const handleTestReset = () => {
    setIsTestComplete(false);
  }

  return (
    <>
      <Navbar />
      {!isTestComplete && <Header />}
      <Result onTestComplete={handleTestCompletion} onTestReset={handleTestReset} showResult={isTestComplete} />
    </>
  )
}

export default App;

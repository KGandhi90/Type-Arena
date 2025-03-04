import { useState } from "react";
import Result from "./assets/components/Result";
import Header from "./assets/components/Header"

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
      {!isTestComplete && <Header />}
      <Result onTestComplete={handleTestCompletion} onTestReset={handleTestReset} showResult={isTestComplete} />
    </>
  )
}

export default App;

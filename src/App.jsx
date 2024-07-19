import { useState } from "react";
import "./App.css";
import Landing from "./Pages/Landing";
import Dumbcharades from "./Pages/dumbcharades";
import SendPage from "./Pages/SendPage";
function App() {
  const [gameIndex, setIndex] = useState(null);
  let content;
  switch (gameIndex) {
    case 0:
      content = <Dumbcharades onClose={()=>{setIndex(null);}}/>;
      break;
    default:
      content = <Landing onNext={()=>{setIndex(0);}}/>;
  }
  return (
  <div>
    {/* {content} */}
    <SendPage/>
  </div>
  );
}

export default App;
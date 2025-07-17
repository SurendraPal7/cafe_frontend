
/*import "./Home.css";
// function Home(props){
function Home({name, age}){
  let id=2525662;
  return(
     <div>

  {/* <h1>Hello {props.name}. you are {props.age} years old.</h1> }
  <h1 style={{backgroundColor:"orange",color:"blue"}}>Hello {name}. you are {age} years old.</h1>
   
  <h2  className="App-Home-Header">Your student id is {id}</h2>
  <p>This is paragraph</p>

   </div>

  );
 
}


export default Home;
*/


import { useState } from "react";
export default function Home() {
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState();
  const incrementRun = () => {
    if (wicket < 10) {
      setRun(run + 1);
      setMessage("Well Done");
    }
  };
  const incrementWicket = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setMessage("Better Luck Next Time");
    } else {
      setMessage("Game Over");
    }
  };

  return (
    <>
      <button onClick={incrementRun}>Run</button>
      <h3>{run}</h3>
      <button onClick={incrementWicket}>Wicket</button>
      <h3>{wicket}</h3>
      <hr />
      {message}
    </>
  );
}
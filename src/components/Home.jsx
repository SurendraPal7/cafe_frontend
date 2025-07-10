import "./Home.css";
// function Home(props){
function Home({name, age}){
  let id=2525662;
  return(
     <div>

  {/* <h1>Hello {props.name}. you are {props.age} years old.</h1> */}
  <h1 style={{backgroundColor:"orange",color:"blue"}}>Hello {name}. you are {age} years old.</h1>
   
  <h2  className="App-Home-Header">Your student id is {id}</h2>
  <p>This is paragraph</p>

   </div>

  );
 
}

export default Home;
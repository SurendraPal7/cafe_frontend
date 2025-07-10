import React from 'react'

// export default function Temp({flag}) {
//     if(flag) return <h1>Flag is true</h1>
//     if(!flag) return <h1>Flag is false</h1>
// //   return (
// //     <div>
// //         <h1 >Hello from temp</h1>
// //     </div>
// //   )
// }



// export default function Temp({flag}) {
//     // return flag ? <h1>Flag is true</h1>:<h1>Flag is false</h1>
//     return flag && <h1>Flag is true</h1>
 
// }



// export default function Temp() {
//     const handlClick=()=>{
//         alert("Button clicked");
//     }
//     const handleSubmit=(name)=>{
//         alert(`Hello ${name}`);

//     }
//   return (
//     <div>
//         <button onClick={handlClick}>Click</button>
//         <button onClick={()=>handleSubmit("john")}>Submit</button>
//     </div>
//   );
// }


import { useState } from 'react';
export default function Temp() {
    const [score,setScore]=useState(0);
    const updateScore=()=>{
        setScore(score+1);
    }
    const decreaseScore=()=>{
        setScore(score-1);
    }
  return (
    <div>
         {score}
    <p>
        <button style={{cursor:"pointer"}} onClick={updateScore}>increment Score</button>
         <button style={{cursor:"pointer"}} onClick={decreaseScore}>Decriment Score</button>



        
    </p>

        



    </div>
  )
}

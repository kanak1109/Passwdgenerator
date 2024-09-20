import { useState,useCallback, useEffect,useRef } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [nAllow,setnAllow]=useState(false);
  const [cAllow,setcAllow]=useState(false);
  
  const [Password,setPassword]=useState("");
  //ref
  const PassRef=useRef(null)
  const copyPasstoClipborad=useCallback(()=>{
    window.navigator.clipboard.writeText(Password);
  },[Password]);
  const PasswordGenarator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVVWXYZabcdefghijklmnopqrstuvwxyz"

    if (nAllow) str += '0123456789';
    if (cAllow) str += '!@#$%^&*+_(){}[]';

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [nAllow, cAllow, length,setPassword]);
  useEffect(()=>{
    PasswordGenarator()
  },[nAllow, cAllow, length,setPassword]);

  return (
    <>
   
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>  <h1 className='text-4xl text-center text-white  p-4'> 
  Password Generator
</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={Password} 
            className='outline-none w-full py-1 px-3' 
            placeholder='password' 
            readOnly 
            ref={PassRef}
          />
          <button onClick={copyPasstoClipborad} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
</div>
<div className='flex text-sm gap-x-2'>
  <div className='flex item-center gap-x-1'>
    <input
    type="range"
    min={6}
    max={100}
    className='cursor-pointer'
    onChange={(e)=>(setlength(e.target.value))}/>
    <label>length:{length}</label>
  </div>
  <div className='flex item-center gap-x-1'>
    <input
    type="checkbox"
    defaultChecked={nAllow}
    id="numberInput"
    onChange={()=>setnAllow((prev)=>!prev)}/>
</div>
<label htmlFor="numberInput">Number</label>
<div className='flex item-center gap-x-1'>
    <input
    type="checkbox"
    defaultChecked={cAllow}
    id="characterInput"
    onChange={()=>setcAllow((prev)=>!prev)}/>
</div>
<label htmlFor="characterInput">Characters</label>
</div>
</div>
    </>
  );
}

export default App;


import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(0);
  console.log('data', data)
  return (
    <div className="App">
      <div>哈哈哈</div>
      <div>{data}</div>
      <button onClick={() => setData(v => ++v)}>add</button>
      <span style={{ color: 'red' }} className="wewe">23</span>
      <Todo />
    </div>
  );
}

function Todo() {
  const [val, setVal] = useState(0);
  return (
    <div>
      <div>todu<button onClick={() => setVal(v => ++v)}>change</button></div>
      <div>{val}</div>
    </div>
  )
}

export default App;

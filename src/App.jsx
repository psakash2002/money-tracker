import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
        getTransactions().then((transactions)=>{
          setTransactions(transactions);
        })
  });
  async function getTransactions(){
      const url = process.env.REACT_APP_API_URL+"/transactions";
      const response =await fetch(url);
      return await response.json();

  }
  function addNewTransaction(ev){
      ev.preventDefault();
      const url = process.env.REACT_APP_API_URL+"/transaction";
      const price = name.split(' ')[0];
      const data = {name:name.substring(price.length+1),price,dateTime, description};
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },})
        .then(()=>{
            setName('');
            setDateTime('');
            setDescription('');
        })
        .catch(error=>{
          console.log(error);
        })
      //console.log(url);
  }
  let balance = 0;
  for(const transaction of transactions){
      balance+=transaction.price;
  }
  return (
    <main>
      <h1>Rs.{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className='container'>
        <div className='basic'>
          <input type='text' 
                 value={name}
                 placeholder='+200 Samsung TV'
                 onChange={ev => (setName(ev.target.value))} />
          <input type='datetime-local'
                 value = {dateTime}
                 onChange={ev => (setDateTime(ev.target.value))}/>
        </div>
        <div className='Description'>
          <input type='text' placeholder='Description'
                 value={description}
                 onChange={ev => setDescription(ev.target.value)}/>
        </div>
        </div>
        <button type='submit'>Track</button>
        
      </form>
      <div className='transactions'>
      <div className='transaction'>
            <div className='left'>
                <div className='name'>New Doggie</div>
                <div className='description'>Time for new doggie</div>
            </div>
            <div className='right'>
              <div className='price red'>-Rs.10000</div>
              <div className='datetime'>2014-3-09 13:45</div>
            </div>
          </div>
        {transactions.length > 0 && transactions.map(transaction => (
            <div className='transaction'>
            <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
              <div className={"price " +(transaction.price<0?'red':'green')}>Rs.{transaction.price}</div>
              <div className='datetime'>{transaction.datetime}</div>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}

export default App;

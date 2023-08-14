function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}
function validate(withdrawalAmount, balance){
  let label = "amount";
  if (withdrawalAmount > balance){
    return( 'Transaction Failed: Withdrawl amount more than the account balance!');
 }
  
  if (isNaN(withdrawalAmount) == true) {
    return( 'Please enter a valid ' + label);
    
  }
  if (Math.sign(withdrawalAmount) == -1) {
    return( 'Please enter a valid ' + label);
  }
  if (!withdrawalAmount) {
    return( 'Please enter a valid ' + label);
  }
  return "S";
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    if (email) {
   
    fetch(`/account/findOne/${email}`)
    .then( (response) => { if(response.ok) {return response.text();} else return Promise.reject(response);})
    .then(text => {
        try {
            const data = JSON.parse(text);
            const balance = data.balance;
            const strValid = validate(amount, balance); 
            console.log('JSON:', data);
                    
            if (strValid == "S"){
              fetch(`/account/update/${email}/-${amount}`)
              .then(response => response.text())
              .then(text => {
             try {
                const data = JSON.parse(text);
                const myObj = JSON.parse(JSON.stringify(data.value));
                props.setStatus("Balance is " + myObj.balance);
                props.setShow(false);
                console.log('JSON:', data);
               }  catch(err) {
                props.setStatus('Withdrawal failed')
                console.log('err:', text);
        }
        
    });
            } else
            {
                props.setStatus(strValid);
            }
        } catch(err) {
            props.setStatus(err)
            console.log('err:', err);
        }
    }).catch((response) => {console.log(response.status)});
  }
  else{
    props.setStatus("Please enter email address");
  }}
  

  
  


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      min="0"
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

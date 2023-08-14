function AllData(){
    const [data, setData] = React.useState([]);   
    var userObjs = []; 
   

    React.useEffect(() => {
        
        // fetch all accounts from API

        (async () => {
            var res  = await fetch('/account/all');
            var data = await res.json();    
            console.log(data);  
            //setData(JSON.stringify(data));  
            userObjs = JSON.parse(JSON.stringify(data))              
            console.log('users = ' + userObjs);
           
            setData(userObjs);
        })();

      
       /* fetch('/account/all')
             .then(response => {
                         debugger;
                 console.log(JSON.stringify(response));
                 response.json()
             })
             .then(data => {
                 debugger;
                 console.log(data);
                 setData(JSON.stringify(data));                
             }); */

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        
    <Card
      bgcolor="primary"
      header="All Data"
      style="width:;"
      body={ <>
      <div className="table-responsive">
      <table  className="table table-bordered">
      <thead className="thead-light">
      <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
    <tbody>
    
    { 
      data.map(item => {
        return(
          <tr key={item._id}>
            
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.balance}</td>
          </tr>
        );
          
      })
      }
    </tbody>    
   </table>
      
     <br/>
     </div>
      </> 
      
    }
      />
    </>);
}

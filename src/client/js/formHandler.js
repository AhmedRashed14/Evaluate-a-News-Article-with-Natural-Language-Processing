function handleSubmit(event) {
  //Prevent page from refreshing
    event.preventDefault()

    // check what text was put into the form field
    let formUrl = document.getElementById('url').value
    //Check the url added
    if(Client.checkForUrl(formUrl)){
      //watching the console to see stats of working(stages)
      console.log('Succeded Submit:)')
      postingUrl('http://localhost:8081/apiRequest',{url:formUrl})
      .then((res)=>{
        //Apdating the UI by adding retrieved data to a specified div
        document.getElementById("subjectivity").innerText = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("agreement").innerText = `Agreement: ${res.agreement}`;
        document.getElementById("irony").innerText = `Irony: ${res.irony}`;
        document.getElementById("confidence").innerText = `Confidence: ${res.confidence}`;
      })
    }
    else {
      //to alert the user of invalid input
      document.getElementById('results').innerText='Please, Enter a vaild URL'
    }
}
// async function to fetch data by the server from the API
const postingUrl = async ( url = '', data = {})=>{
        console.log('Loading...');
        //Making a POST request carring the url to server
        const response = await fetch(url, {
          //method used
        	method: 'POST',
          mode:'cors',
          //same origin only
        	credentials: 'same-origin',
          //Type of data transfered
        	headers: {
            	'Content-Type': 'application/json',
        	},
       // Body data type must match "Content-Type" header
       //turn json file into a string to be recognized by the Server
        	body: JSON.stringify(data),
  	});

        try {
          //turing back object to be json file to be used
          const newData = await response.json();
          //indacation of completion of the process
          console.log('Process Done..')
          return newData;
        }
        //to catch and handle errors
        catch(error) {
        console.log("error", error);
        }
    }
// exporting function to build webpack dependency tree
export { handleSubmit }

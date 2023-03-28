const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync('./src/index.html', "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let  temperature = tempVal.replace('{%temp%}', orgVal.main.temp);
      temperature = temperature.replace('{%tempMin%}', orgVal.main.temp_min);
      temperature = temperature.replace('{%tempMax%}', orgVal.main.temp_max);
      temperature = temperature.replace('{%location%}', orgVal.name);
      temperature = temperature.replace('{%country%}', orgVal.sys.country);
    
      return temperature;


   
};

  
const server = http.createServer((req, res) => {
  if(req.url == '/') {
      requests(
        'https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=d8df07ef287b4772704c9777fc1976ea&units=metric'
      )
      .on('data', (chunk) =>{
        const objData = JSON.parse(chunk);
        const arrData = [objData];

        // console.log(arrData);

        const realtimeData = arrData.map((val) => {
          return replaceVal(homeFile, val);
        }).join("");
        res.write(realtimeData);
        // console.log(realtimeData);
        // console.log(arrData[0].main.temp/10 );
      }) 
        .on('end', (err) => {
          if(err) console.log(err);
          res.end();
          // console.log('end');
        });
  }
  else {
    res.end('file not found');
  }
});


server.listen(8000, (err) => {
  if(err) console.log(err);
  console.log('server is running');
})
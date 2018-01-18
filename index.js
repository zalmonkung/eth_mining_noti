const https = require("https");
var app = require('express')();
var port = process.env.PORT || 7777;
var token = 'B3s44sxg9DAHBtvktVIxtkCGbwFuNsMiT1f8zdRan09';
var unpaid = 0.04325;
var eththb = 0;
var value = 0;


function sendLine(msg){
  const request = require('request');
   request({
     method: 'POST',
     uri: 'https://notify-api.line.me/api/notify',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
  },
     'auth': {
       'bearer': token
  },form: {
       message: msg,
    }
  }, (err,httpResponse,body) => {
  });
   console.log("sendLine : "+msg);
}


function getBx(){
  const url ="https://bx.in.th/api/orderbook/?pairing=21";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });

  res.on("end", () => {
    body = JSON.parse(body);
    eththb = parseFloat(body.bids[0][0]).toFixed(2);

  });
});

}

async function getMiner(){
	await getBx();

  const url ="https://api.ethermine.org/miner/0x2c05c58775E35b1C576bC5F5Ec593b2e87587817/currentStats";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });

  res.on("end", () => {
    body = JSON.parse(body);
    unpaid = (body.data.unpaid*0.000000000000000001);
    value = (unpaid*eththb).toFixed(2);

    sendLine("ขุดได้เหรียญ ETH แล้ว = "+unpaid+" อัตราแลกเปลี่ยน = "+eththb+ " คิดเป็นเงิน = "+value+" บาท");
    //sendLine("ตอนนี้ได้เงินจากเครื่องขุดบิทคอยน์ "+value+" บาท");
    
  });
});

}

getMiner();


/*

app.get('/', function (req, res) {
	getMiner();
    res.send('<h1>'+"ตอนนี้ได้เงินจากเครื่องขุดบิทคอยน์ "+value+" บาท"+'</h1>');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
*/


//getMiner();
setInterval(function(){getMiner()},20000);
























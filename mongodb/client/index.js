const fetch = require('isomorphic-fetch');
const shipping = 'http://35.199.23.49/';
const accounts = 'http://35.236.212.26/';
const users = 'http://35.194.86.100/';
const delay = 5000;

function startTimer(serviceName, url) {
  setInterval(async () => {
    try {
      console.log('---------');
      const serviceResponse = await fetch(url);
      if (serviceResponse.status == 200) {
        const serviceData = await serviceResponse.json();
        console.log(`${serviceName} data: ${JSON.stringify(serviceData)}`);
      } else {
        console.log(`${serviceName} service not available`);
      }
    } catch (e) {
      console.log(`Error connecting to ${serviceName} service`);
    }
  }, delay);
}


startTimer('Accounts', accounts);
startTimer('Shippings', shipping);
startTimer('Users', users);
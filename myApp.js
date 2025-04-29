const express = require('express');
const app = express();
const helmet = require('helmet'); //Helps secure app by setting various HTTP headers to prevent attacks 

// app.use(helmet.hidePoweredBy()); // Hide the header that indicates site uses Express

// app.use(helmet.frameguard({action: 'deny'})) //helps prevent clickjacking by setting the X-Frame-Options header
// app.use(helmet.xssFilter()); //sets the X-XSS-Protection HTTP header (for older browsers to prevent reflected XSS attacks- not needed for modern browsers)
// app.use(helmet.noSniff()); //prevents MIME type sniffing attacks (tells browser not to guess file types)
// app.use(helmet.ieNoOpen()); //Prevent IE from Opening Untrusted HTML

// const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

// //Ask Browsers to Access Your Site via HTTPS only
// app.use(helmet.hsts({
//   maxAge: ninetyDaysInSeconds, //Sets the duration of the HTTPS enforcement (in seconds)
//   force: true //Applies the rule even if the app isn't running behind HTTPS in development/testing environments
// }));

// app.use(helmet.dnsPrefetchControl()); //Disables DNS Prefetching
// app.use(helmet.noCache()); //disables client-side caching

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"], //the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes
//     scriptSrc: ["'self'", "trusted-cdn.com"], //is just a plain domain — no inner quotes needed
//   }
// }));

// Everything commented above is included in the 'parent' helmet below except 'noCache(), and 'contentSecurityPolicy() but these can be enabled as necessary.
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

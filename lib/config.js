/*
 * Copyright (c) 2012-2016 Digital Bazaar, Inc. All rights reserved.
 */
 var bedrock = require('bedrock');
 var config = bedrock.config;
 
if(process.env.C9_HOSTNAME) {
  bedrock.events.on('bedrock.configure', function() {
    config.server.port = 8081;
    config.server.httpPort = 8080;
    config.server.bindAddr = [process.env.IP];
    config.server.domain = process.env.C9_HOSTNAME;
    config.server.host = config.server.domain + ':8080'; 
    config.server.baseUri = 'https://' + config.server.host;
  })
  // only run application on HTTP port
  bedrock.events.on('bedrock-express.ready', function(app) {
    // attach express to regular http
    require('bedrock-server').servers.http.on('request', app);
    // cancel default behavior of attaching to HTTPS
    return false;
  });          
}

Hapi = require('hapi')
Path = require('path')
server = new (Hapi.Server)
usernames = []
numUsers = 0
_ = require('lodash')
fs = require('fs')
R = require('ramda')
config = require(__dirname + '/config.js')
r = require('rethinkdb')
plugins = [ { register: require('./routes/routes.js') } ]
sysData = require('./common/LoadCsv.js')
SysCommon = require('./common/SysCommon.js')
dataCommon = require('./common/dataCommon.js')

sysData.InitCarga(); 
PathDefault = '/dist/src';
i = 0;
socketServer;

ioHandler = (socket) !->
  socketServer = socket
  socket.on 'sendtask' !->
      (sendTaskIO) task, socket 
  
  socket.on 'adduser' (username) !-> 
     r.connect(config.rethinkdb)
      .then (conn) !-> r.table('Sessions').insert (* username : username).run conn

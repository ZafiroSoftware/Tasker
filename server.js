"use strict"
var Hapi = require("hapi");
var Path = require('path');
var _ = require('lodash');
var R = require('ramda');
var fs = require("fs"); 
var config = require(__dirname + "/config.js");
var r = require('rethinkdb');
var server = new Hapi.Server();
var plugins = [ { register: require('./routes/routes.js') } ];
var sysData = require('./common/LoadCsv.js');
var SysCommon = require('./common/SysCommon.js');
var dataCommon = require('./common/dataCommon.js');

//---------------------------------------------------------------------------------------------------------------------------------
//Inicializacion del server
//---------------------------------------------------------------------------------------------------------------------------------           

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
sysData.InitCarga(); //Inicializamos la cargar de archivos csv

var PathDefault = '/dist/src';
var i = 0;
var socketServer;
server.connection( config.hapi ,
                  { cors: true }, 
                  { connections: { routes: { files: {relativeTo: Path.join(__dirname, PathDefault)} } } }
                 );

var socketio = require("socket.io")(server.listener)
var ioHandler = function (socket)
{ socketServer = socket;
  socket.on('sendtask',function(task)
  { sendTaskIO(task , socket) });

  socket.on('adduser',function (username)
  { socket.username = username;
    r.connect(config.rethinkdb)
     .then(function(conn)
     {
      r.table('Sessions')
       .insert({'username': username ,'socketid':socket.id, 'ipCliente': socket.client.conn.remoteAddress,
                'TimeInitConexion': socket.handshake.time, 'reference':socket.handshake.headers.referer, 'online': true})
       .run(conn)
     });
  });

  socket.on('deletetask',function (task)
  { r.connect(config.rethinkdb)
     .then(function(conn)
      {
      _.map(task.actorSend, function(actor)
      {
      r.table('Sessions')
       .filter({'username':actor , online:true })
       .run(conn)
       .then(function(result){ return result.toArray();})
       .then(function(result)
       {  _.map(result,function(s){ socket.broadcast.to(s.socketid).emit('deletetask', task) }); })   
      }) 
    })
  });

  socket.on('disconnect', function() 
  {
    r.connect(config.rethinkdb)
     .then(function(conn)
     {
       r.table('Sessions')
       .filter({socketid: socket.id })
       .update({TimeOffConexion: socket.handshake.time , online: false})
       .run(conn)   
     })
  });
}
socketio.on("connection", ioHandler);

//---------------------------------------------------------------------------------------------------------------------------------
//funciones para manipulacion de tareas roles y actores
//---------------------------------------------------------------------------------------------------------------------------------
//Envia las tareas d
var sendTasks = function(events)
{
  _.map(events,sendTask);
}
module.exports.sendTasks = sendTasks;

//Busca el evento pasando como argunmento la entidad y la entrada
var sendTask = function(event)
{ var actorName;
  var NamesActor = {};
  if(dataCommon.existsElement(sysData.Actor_Role(), 'actor', event.who ) === true){ NamesActor = [ event.who] ;}
  else{ NamesActor = SysCommon.ActorByRole(event.who); }
  var emitTask = 
  {  
      'event':event.event ,
      'in':event['in'], 
      'task': event.action + '_' + event.event,
      'use': event.use,
      'what':event.what, 
      'how':event.how,
      'entity':event.entity,
      'out':event.out,
      'actorSend': NamesActor,
      'TimeCreate' : new Date()
  };
  r.connect(config.rethinkdb)
   .then(function(conn)
    { r.table('IssuedTask')
       .insert(emitTask)
       .run(conn)
       .then(function(result)
       { emitTask.id = result.generated_keys[0]; 
        _.map(NamesActor, function(actorName)
        {
         r.table('Sessions')
          .filter({'username':actorName , online:true })
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result)
          { _.map(result,function(s){ socketio.sockets.connected[s.socketid].emit('sendtask', emitTask) }); })  
        });
       });
     })
}

var sendTaskIO = function(task,socket)
{_.map(SysCommon.SearchEvent(task.entity, task.out )
      ,function(event){ 
       var NamesActor = {};
        if(dataCommon.existsElement(sysData.Actor_Role(), 'actor', event.who ) === true){ NamesActor = [ event.who] ;}
        else{ NamesActor = SysCommon.ActorByRole(event.who); }
  
       var emitTask = {'event':event.event ,
                       'in':event['in'], 
                       'task': event.action + '_' + event.event,
                       'use': event.use,
                       'what':event.what, 
                       'how':event.how,
                       'entity':event.entity,
                       'out':event.out,
                       'actorSend': NamesActor,
                       'TimeCreate' : new Date()
                       };

      r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('IssuedTask')
          .insert(emitTask)
          .run(conn)
          .then(function(result)
          { emitTask.id = result.generated_keys[0]; 
            _.map(NamesActor, function(actorName)
             {
              r.table('Sessions')
               .filter({'username':actorName , online:true })
               .run(conn)
               .then(function(result){ return result.toArray();})
               .then(function(result)
                {  _.map(result,function(s)
                  { socket.broadcast.to(s.socketid).emit('sendtask', emitTask) }); 
               }) 
              });
          })
        });   
      });
}

var SessionOff = function()
{
  r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('Sessions')
     .filter({online:true})
     .update({online:false})
     .run(conn)   
  })
}()
//---------------------------------------------------------------------------------------------------------------------------------           
//Inicializacion del server
//--------------------------------------------------------------------------------------------------------------------------------- 

server.register(plugins, function (err) 
  {if (err) { throw err; }
   server.start(function () 
    { console.log('Server running at: ' + server.info.uri);
      server.log('info', 'Server running at: ' + server.info.uri); } );
  });

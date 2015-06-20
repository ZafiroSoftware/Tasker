"use strict"
var Hapi = require("hapi");
var Path = require('path');
var server = new Hapi.Server();
var usernames = [];
var numUsers = 0;
var _ = require('lodash');
var fs=require("fs"); 
var R = require('ramda');

var config = require(__dirname + "/config.js");
var r = require('rethinkdb');
var plugins = [ { register: require('./routes/routes.js') } ];
var sysData = require('./common/LoadCsv.js');
var SysCommon = require('./common/SysCommon.js');
var dataCommon = require('./common/dataCommon.js');
//---------------------------------------------------------------------------------------------------------------------------------
//Inicializacion del server
//---------------------------------------------------------------------------------------------------------------------------------           

sysData.InitCarga(); //Inicializamos la cargar de archivos csv

var PathDefault = '/dist/src';
var i = 0;
var socketServer;
server.connection({ host: '192.168.1.111', port: 8000  },
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
//Busca el evento pasando como argunmento la entidad y la entrada

var sendTask = function(event)
{ var actorName;
  var NamesActor = {};
  if(dataCommon.existsElement(sysData.Actor_Role(), 'actor', event.who ) === true){ NamesActor = [ event.who] ;}
  else{ NamesActor = SysCommon.ActorByRole(event.who); }

  var emitTask = {'event':event.event ,
                  'in':event['in'], 
                  'task': event.action + '_' + event.event,
                  'use': event.use,
                  'what':event.what, 
                  'how':event.how,
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
          {  _.map(result,function(s){ socketio.sockets.connected[s.socketid].emit('sendtask', emitTask) }); })  
        });
       });
     })
}

var sendTaskIO = function(task,socket)
{_.map(SysCommon.SearchEvent(task.event, task.out )
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

//---------------------------------------------------------------------------------------------------------------------------------           
//Inicializacion del server
//--------------------------------------------------------------------------------------------------------------------------------- 
//server.register(require('hapi-auth-jwt2'), function (err) {

//    if(err){
//      console.log(err);
//    }
    // see: http://hapijs.com/api#serverauthschemename-scheme
//    server.auth.strategy('jwt', 'jwt', true, { key: secret,  validateFunc: validate });

//    server.route([
//      {
//        method: "GET", path: "/", config: { auth: false },
//        handler: function(request, reply) {
//          reply({text: 'Token not required'});
//        }
//      },
//      {
//        method: 'GET', path: '/restricted', config: { auth: 'jwt' },
//        handler: function(request, reply) { 
//          reply({text: 'You used a Token!'}).header("Authorization", request.headers.authorization);
//        }
//      }
//    ]);
//});

//server.start(function () { console.log("Server starter ", server.info.uri); });
//server.register(plugins, function (err) 
//              {if (err) { throw err; }
//               server.start(function () 
//                { server.log('info', 'Server running at: ' + server.info.uri); } );
//              });

//r.connect(config.rethinkdb)
//.then(function(conn) 
//{
//    r.dbList().run(conn)
//    .then(function(dbList)
//    {
//        if (dbList.indexOf(config.rethinkdb.db) > -1)
//        {
//            server._rdbConn = conn ;
//            server.register(plugins, function (err) 
//              {if (err) { throw err; }
//               server.start(function () 
//                { server.log('info', 'Server running at: ' + server.info.uri); } );
//              });
//        } else {
//            r.dbCreate(config.rethinkdb.db).run(conn);
//            server._rdbConn = conn ;
//            server.start(function () { console.log("Server starter ", server.info.uri); });
//        }
//    })
//})
//.error(function(error){
//    console.log(err.message);
//    process.exit(1);
//});


server.register(plugins, function (err) 
              {if (err) { throw err; }
               server.start(function () 
                { server.log('info', 'Server running at: ' + server.info.uri); } );
              });

'use strict'
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
#---------------------------------------------------------------------------------------------------------------------------------
#Inicializacion del server
#---------------------------------------------------------------------------------------------------------------------------------           
sysData.InitCarga()
#Inicializamos la cargar de archivos csv
PathDefault = '/dist/src'
i = 0
socketServer = undefined
server.connection {
  host: '192.168.1.118'
  port: 8000
}, { cors: true }, connections: routes: files: relativeTo: Path.join(__dirname, PathDefault)
socketio = require('socket.io')(server.listener)

ioHandler = (socket) ->
  socketServer = socket
  socket.on 'sendtask', (task) ->
    sendTaskIO task, socket

  socket.on 'adduser', (username) ->
    socket.username = username
    r.connect(config.rethinkdb).then (conn) ->
      r.table('Sessions').insert(
        'username': username
        'socketid': socket.id
        'ipCliente': socket.client.conn.remoteAddress
        'TimeInitConexion': socket.handshake.time
        'reference': socket.handshake.headers.referer
        'online': true).run conn

  socket.on 'deletetask', (task) ->
    r.connect(config.rethinkdb).then (conn) ->
      _.map task.actorSend, (actor) ->
        r.table('Sessions').filter(
          'username': actor
          online: true).run(conn).then((result) ->
          result.toArray()
        ).then (result) ->
          _.map result, (s) ->
            socket.broadcast.to(s.socketid).emit 'deletetask', task

  socket.on 'disconnect', ->
    r.connect(config.rethinkdb).then (conn) ->
      r.table('Sessions').filter(socketid: socket.id).update(
        TimeOffConexion: socket.handshake.time
        online: false).run conn

socketio.on 'connection', ioHandler
#---------------------------------------------------------------------------------------------------------------------------------
#funciones para manipulacion de tareas roles y actores
#---------------------------------------------------------------------------------------------------------------------------------
#Busca el evento pasando como argunmento la entidad y la entrada

sendTask = (event) ->
  actorName = undefined
  NamesActor = {}
  if dataCommon.existsElement(sysData.Actor_Role(), 'actor', event.who) == true
    NamesActor = [ event.who ]
  else
    NamesActor = SysCommon.ActorByRole(event.who)
  emitTask = 
    'event': event.event
    'in': event['in']
    'task': event.action + '_' + event.event
    'use': event.use
    'what': event.what
    'how': event.how
    'out': event.out
    'actorSend': NamesActor
    'TimeCreate': new Date
  r.connect(config.rethinkdb).then (conn) ->
    r.table('IssuedTask').insert(emitTask).run(conn).then (result) ->
      emitTask.id = result.generated_keys[0]
      _.map NamesActor, (actorName) ->
        r.table('Sessions').filter(
          'username': actorName
          online: true).run(conn).then((result) ->
          result.toArray()
        ).then (result) ->
          _.map result, (s) ->
            socketio.sockets.connected[s.socketid].emit 'sendtask', emitTask

sendTaskIO = (task, socket) ->
  _.map SysCommon.SearchEvent(task.event, task.out), (event) ->
    NamesActor = {}
    if dataCommon.existsElement(sysData.Actor_Role(), 'actor', event.who) == true
      NamesActor = [ event.who ]
    else
      NamesActor = SysCommon.ActorByRole(event.who)
    emitTask = 
      'event': event.event
      'in': event['in']
      'task': event.action + '_' + event.event
      'use': event.use
      'what': event.what
      'how': event.how
      'out': event.out
      'actorSend': NamesActor
      'TimeCreate': new Date
    r.connect(config.rethinkdb).then (conn) ->
      r.table('IssuedTask').insert(emitTask).run(conn).then (result) ->
        emitTask.id = result.generated_keys[0]
        _.map NamesActor, (actorName) ->
          r.table('Sessions').filter(
            'username': actorName
            online: true).run(conn).then((result) ->
            result.toArray()
          ).then (result) ->
            _.map result, (s) ->
              socket.broadcast.to(s.socketid).emit 'sendtask', emitTask

#---------------------------------------------------------------------------------------------------------------------------------           
#Inicializacion del server
#--------------------------------------------------------------------------------------------------------------------------------- 
r.connect(config.rethinkdb).then((conn) ->
  r.dbList().run(conn).then (dbList) ->
    if dbList.indexOf(config.rethinkdb.db) > -1
      server._rdbConn = conn
      server.register plugins, (err) ->
        if err
          throw err
        server.start ->
          server.log 'info', 'Server running at: ' + server.info.uri
    else
      r.dbCreate(config.rethinkdb.db).run conn
      server._rdbConn = conn
      server.start ->
        console.log 'Server starter ', server.info.uri
).error (error) ->
  console.log err.message
  process.exit 1
 

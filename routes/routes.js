var dataCommon = require('../common/dataCommon.js');
var SysCommon = require('../common/SysCommon.js');
var PathDefault = '/dist/src';
var path = require("path");
var formidable = require("formidable");

function LoadFiles2(req,reply)
{
  var incoming = new formidable.IncomingForm();
  incoming.uploadDir = 'uploads';
  incoming.on('file',function(field,file)
   { if(!file.size){return; }
     reply({ status: 'ok' });
   }
  ).on('end');
  incoming.parse(req);
}

function LoadFiles(req,reply)
{
  console.log(req.payload.file);
  reply({ status: 'ok' });
}


function MulterImpl(config) {
    var defaultDest = '../uploads/';

    this.init = function () {
        var multer = require('multer');
        var uploadDir = !config.uplodaDir ? defaultDest : config.uplodaDir;

        var options = {
            dest: uploadDir,
            rename: function (fieldname, filename) {
                return filename + Date.now();
            },
            onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...');
            },
            onFileUploadComplete: function (file) {
                console.log(file.fieldname + ' uploaded to  ' + file.path);
            }
        };
        return multer(file);
    }
}


var users = {
    oscar: {
        id: 'oscar',
        password: '1232',
        name: 'oscargarcia'
    }
};

var home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome '
      + request.auth.credentials.name
      + '!</h3><br/><form method="get" action="/logout">'
      + '<input type="submit" value="Logout">'
      + '</form></body></html>');
};

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    var message = '';
    var account = null;
    if (request.method === 'post') {

        if (!request.payload.username ||
            !request.payload.password) {

            message = 'Missing username or password';
        }
        else {
            account = users[request.payload.username];
            if (!account ||
                account.password !== request.payload.password) {

                message = 'Invalid username or password';
            }
        }
    }

    if (request.method === 'get' ||
        message) {

        return reply('<html><head><title>Login page</title></head><body>'
            + (message ? '<h3>' + message + '</h3><br/>' : '')
            + '<form method="post" action="/login">'
            + 'Username: <input type="text" name="username"><br>'
            + 'Password: <input type="password" name="password"><br/>'
            + '<input type="submit" value="Login"></form></body></html>');
    }

    request.auth.session.set(account);
    return reply.redirect('/');
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
};

exports.register = function(server, options, next) {

    server.register(require('hapi-auth-cookie'), function (err)
    { server.auth.strategy('session', 'cookie', 
      {
        password: 'secret',
        cookie: 'sid-example',
        redirectTo: '/login',
        isSecure: false
      });
    });

server.route([
    {
        method: 'GET',
        path: '/',
        config: {
            handler: home,
            auth: 'session'
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/login',
        config: {
            handler: login,
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        config: {
            handler: logout,
            auth: 'session'
        }
    }
]);
server.route({ method: 'POST', path: '/loadFiles',handler: function(req,reply) {new MulterImpl({}).init(); return reply({ status: 'ok' });}    } );
  //server.route({ method: 'POST', path: '/loadFiles',handler: function(request, reply){ console.log(request); return reply({ status: 'ok' }); }  } );
   //server.route(
   // { method: 'GET', path: '/login/{actor?}', handler: function(request,reply)
   //   { 
   //    if( SysCommon.ExistsActor(request.params.actor) )
   //          {  return reply.redirect('/tasks/' + request.params.actor + '?format=App'); }
   //      else{   reply('El actor no existe');}  } 
   // }
  //);

   server.route({ method: 'GET', path: '/events/{actor?}', config: { handler: dataCommon.Events,  auth: 'session' } } ); 
   server.route({ method: 'GET', path: '/tasks/{actor?}',  config: { handler: dataCommon.Tasks ,  auth: 'session' } } );
   server.route({ method: 'GET', path: '/tasks/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'GET', path: '/events/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'GET', path: '/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'POST', path: '/CustomerOrder_TAKEN',handler: dataCommon.CustomerOrder_TAKEN }  );
   server.route({ method: 'POST', path: '/getTask',handler: dataCommon.getTask} );

   server.route({ method: 'GET', path: '/getSearch',handler: dataCommon.getSearch } );
   server.route({ method: 'GET', path: '/getCustomerSearch',handler: dataCommon.getCustomerSearch } );
   server.route({ method: 'GET', path: '/getCustomer',handler: dataCommon.getCustomer } );
   server.route({ method: 'GET', path: '/getCustomerByID',handler: dataCommon.getCustomerByID } );
   server.route({ method: 'GET', path: '/getProducts',handler: dataCommon.getProducts } );
   server.route({ method: 'GET', path: '/Take_CustomerOrder',  handler: function(request, reply) {  reply.file(__dirname + PathDefault + '/customerOrder.html');  }});

   server.route({ method: 'POST', path: '/Prospeccion_TAKEN',handler: dataCommon.Prospeccion_TAKEN }  );
   server.route({ method: 'POST', path: '/Cliente_TAKEN',handler: dataCommon.Cliente_TAKEN }  );
    // Callback, completes the registration process
    next();
}
// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'tasks-route', // Must be unique
    version: '1.0.0'
};
var Converter = require("csvtojson").core.Converter;
var CronJob = require('cron').CronJob;
var fs = require("fs"); 

var Actor_Role = [];
var Event_Role = [];
var EventTaskRole = [];
var Jobs = [];
var sysData= [];
var userData= [];
//---------------------------------------------------------------------------------------------------------------------------------
//Lectura de archivos CSV
//---------------------------------------------------------------------------------------------------------------------------------

function ReadFilesCsv(path,file,Collection)
{
  var csvFileName = path + file;
  var csvConverter = new Converter();
  csvConverter.on("end_parsed",function(jsonObj) 
    {
       if(Collection == 'EventTaskRole'){ EventTaskRole = jsonObj; }
       if(Collection == 'Actor_Role'){ Actor_Role = jsonObj; }
       if(Collection == 'Event_Role'){ Event_Role = jsonObj; }
       if(Collection == 'userData'){ userData = jsonObj; }
       if(Collection == 'sysData'){ sysData = jsonObj; }
    });
  var rw = fs.createReadStream(csvFileName,{encoding: 'utf-8'}).pipe(csvConverter);
  rw.setEncoding('utf8');
}

function ReadFilesJobsCsv(path,file,Collection)
{
  var csvFileName = path + file;
  var csvConverter = new Converter();
  csvConverter.on("end_parsed",function(jsonObj) 
  { 
      new CronJob(jsonObj[0]['time'], function() 
      { 
        searchTask(jsonObj[0]);
      }, function () {/* Funcion ejecutada cuando el job se detiene */ },
      true, /* Inicia ahora el job */
      'America/Mexico_City' /* zona. */
    );
  });
  fs.createReadStream(csvFileName).pipe(csvConverter);
}

var InitCarga = function()
{
  ReadFilesCsv('./sys/def/','EventTaskRole.csv','EventTaskRole');
  ReadFilesCsv('./sys/def/','ActorRole.csv','Actor_Role');
  ReadFilesCsv('./sys/def/etc/','Event_Role.csv','Event_Role');
  ReadFilesCsv('./sys/dat/','sys_data.csv','sysData');
  ReadFilesCsv('./sys/dat/','usr_data.csv','userData');
  //ReadFilesJobsCsv('./sys/def/','Jobs.csv','Jobs');  
}

module.exports.Actor_Role = function(){ return Actor_Role;}
module.exports.Event_Role = function(){ return  Event_Role;};
module.exports.EventTaskRole = function(){ return   EventTaskRole;}
module.exports.userData = function(){ return   userData;}
module.exports.sysData = function(){ return   sysData;}
module.exports.InitCarga = InitCarga;
module.exports.Jobs = Jobs;



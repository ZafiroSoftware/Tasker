/** UploadFiles.jsx */
var React = require('react');
var  DropzoneComponent = require('react-dropzone-component/lib/dropzone');
var myDropzone;

function initCallback (dropzone) {
    myDropzone = dropzone;
}

function removeFile () {
    if (myDropzone) {
        myDropzone.removeFile();
    }
}

var componentConfig = {
    allowedFiletypes: ['.*'],
    showFiletypeIcon: true,
    postUrl: '/loadFiles'
};

var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];
 
var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

var djsConfig = {
    addRemoveLinks: true
};

var fileData = [];

var complete = function(e)
 {
    var data =  JSON.parse(e.xhr.response);
    var file = { originalFielName: data.file[0].originalFilename,
                 pathTemp: data.file[0].path};
    fileData.push(file);
 };

var removedfile = function(e)
{
    console.log(e);
};

var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: removedfile,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: complete,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter 
    // and are only called if the uploadMultiple option 
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
}


var UploadFiles = React.createClass({

  setValue:function(value)
  {
   // this.refs.Address.setValue(value);
  },
  getValue:function()
  {
     return fileData;
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <DropzoneComponent {...other} config={componentConfig} 
                       eventHandlers={eventHandlers} 
                       djsConfig={djsConfig} />
    );
  }
});

module.exports = UploadFiles;

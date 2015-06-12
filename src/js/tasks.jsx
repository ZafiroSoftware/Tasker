var Notification = require('react-notification');
/**
 * @jsx React.DOM
 */
var socket = io.connect();
var userdefault;

var Header = React.createClass(
{  render: function ()
   { return ( <header className="bar bar-nav">
               <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
               <h1 className="title">{this.props.text}</h1>
             </header>);
    }
});

var SearchBar = React.createClass(
{  searchHandler: function() { this.props.searchHandler(this.refs.searchKey.getDOMNode().value); },
   render: function ()
  { return ( <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey}/>
            </div>);
  }
});

//var styleNew = {color:'green'};
var styleRun = {color:'red'};
var styleFinish = {color:'gray'};
var styleNew = { color: 'green'}; 
//var styleNew = { color: 'green', backgroundColor: 'red', fontSize: 50 }; 

var TaskListItem = React.createClass(
{
    ondbClickEvent:function()
    {
      if(this.props.task.TimeFinish === undefined) //Comprobamos si la tarea esta finalizada
      { taskservice.getTask(this.props.task, userdefault);      // Indicamos que estamos tomado la tarea
        socket.emit('deletetask', this.props.task);
        window.location = this.props.task.use //"/" + this.props.task.task + "?id=" + this.props.task.id;  
      }
    },
    btnOnClickEvent: function()
    {
      window.open(this.props.task.how);
    },
    render: function ()
    {
        return ( 
             <li className="table-view-cell media"
                style={this.props.task.TimeFinish !== undefined ? styleFinish:this.props.task.TimeTaken!== undefined?styleRun:styleNew}  
                onDoubleClick = {this.ondbClickEvent}>
                      {this.props.task.task}
                <p>{this.props.task.what}</p>
                <p>ID:{this.props.task.id}</p>
                <button className="btn pull-right" onClick={this.btnOnClickEvent}>how</button>

            </li>
        );
    }
});

var TaskList = React.createClass(
{  render: function () {var items = this.props.tasks.map(function (task)
   { return (<TaskListItem key={task.id} task={task} />); });
     return (
             <ul  className="table-view">
                {items}
            </ul>
            );
    }
});

var Notify = React.createClass(
{ handleShow: function() {
    console.log('Notification hidden:', false);
    this.refs.notification.show();
  },
  handleHide: function(){
    console.log('Notification hidden:', true);
    this.refs.notification.hide();
  },
  handleNotificationActionClick: function(){
    console.log('Notification action clicked:', true);
  },
 getNotificationStyles:function()
 {
  var bar = { background: '#263238'};
  var action = {color: '#FFCCBC'};
  return { bar, action };
},
 getInitialState() {
    return {
      message: 'Todo added',
      action: 'Undo'
    };
  },
render: function()
{
  return(
    <div>
     <button onClick = {this.handleShow}>Show</button>
     <button onClick = {this.handleHide}>Hide</button>
      <Notification
        ref="notification"
        message={this.state.message}
        action={this.state.action}
        styles={this.getNotificationStyles()} />
    </div>
  );
}
});

var HomePage = React.createClass(
{
  render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Tasks" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <TaskList tasks={this.props.tasks}/>
                    
                </div>
            </div>
        );
    }
});

var App = React.createClass(
{
    mixins: [PageSlider],
    getInitialState: function()
   {
       socket.on('sendtask', this.getTask);
       socket.on('deletetask', this.deletetask);
       return {searchKey: '',tasks:  [] }
   },
    getTask: function(emited_task)
    {
        this.state.tasks.push(emited_task);
        this.setState();
    },
    deletetask: function(emited_task)
    {
      var index = this.state.tasks.map(function(e) { return e.id; }).indexOf(emited_task.id);
      this.state.tasks.splice(index,1);
      this.setState();
    },
    searchHandler: function(searchKey)
    {
        taskservice.findByName(searchKey,userdefault).done(function(tasks) {
            this.setState({
                searchKey:searchKey,
                tasks: tasks,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} tasks={tasks}/>]});
            }.bind(this));
    },
    componentDidMount: function() 
    {
      var pathArray = window.location.pathname.split( '/' );
      userdefault = pathArray[pathArray.length-1];
      socket.emit('adduser', userdefault);
      taskservice.findByName('',userdefault).done(function(tasks) {
            this.setState({
                tasks: tasks,
                pages: [<HomePage searchHandler={this.searchHandler} tasks={tasks}/>]});
        }.bind(this));
    }      
});

React.render(<App/>, document.body);

/**
 * @jsx React.DOM
 */
var socket = io.connect();
var userdefault;

var Header = React.createClass(
{  RedirectTasks:function()
    {
        window.location = '/tasks/' + userdefault + '?format=App';
    },
    render: function ()
   { return ( <header className="bar bar-nav">
               <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
               <h1 className="title">{this.props.text}</h1>
               <button className="btn btn-link btn-nav pull-left" onClick={this.RedirectTasks}>
                  <span className="icon icon-compose"></span>
                 Tasks
               </button>
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

var TaskListItem = React.createClass(
{
    SendTaskEvent:function(){ socket.emit('sendtask', this.props.task);},
    render: function ()
    {return (
            <li className="table-view-cell media" onClick = {this.SendTaskEvent} >
                    {this.props.task.event} {this.props.task.out}
            </li>
            );
    }
});

var TaskList = React.createClass(
{
    render: function () {
        var items = this.props.tasks.map(function (task) {
            return (
                <TaskListItem  key={task.id} task={task} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Events" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <TaskList tasks={this.props.tasks}/>
                </div>
            </div>
        );
    }
});


var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            tasks:  []
        }
    },
    searchHandler: function(searchKey) {
        eventsService.findByName(searchKey,userdefault).done(function(tasks) {
            this.setState({
                searchKey:searchKey,
                tasks: tasks,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} tasks={tasks}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        var pathArray = window.location.pathname.split( '/' );
        userdefault = pathArray[pathArray.length-1];
        socket.emit('adduser', userdefault);
        eventsService.findByName('',userdefault).done(function(tasks) {
            this.setState({
                tasks: tasks,
                pages: [<HomePage searchHandler={this.searchHandler} tasks={tasks}/>]});
        }.bind(this));
    }
});

React.render(<App/>, document.body);

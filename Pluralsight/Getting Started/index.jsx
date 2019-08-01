// gaearon, sophiebits, sebmarkbage, bvaughn
const testData = [
];

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.bio}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async(event) => {
  	event.preventDefault();
    var resp;
    try{
     resp=await 
    axios.get(`https://api.github.com/users/${this.state.userName}`)}
    catch{
      alert("Sorry unable to fetch username")
    }
    this.state.userName=""
    console.log(resp.status)
    if(resp.status==200)
   this.props.addProf(resp.data)
      
  
 
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData,
  };
addNewProf=(profData)=>{
  this.setState(prevState=>({
    profiles:[...prevState.profiles,profData],
  }))
}
  
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form  addProf={this.addNewProf}/>
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
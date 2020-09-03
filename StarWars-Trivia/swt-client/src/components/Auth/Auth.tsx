import React from 'react'


interface AcceptedProps{
    toggle: () => void;

}
type User ={
    username: string,
    email: string,
    password: string
}
class SignUpForm extends React.Component<AcceptedProps,User> {
    constructor(props:AcceptedProps) {
    super(props);
    // handle initialization activities
        this.state ={
            username: "",
            email: "",
            password: "",
            
        }
    }
    // handleChangeEvents(event) {
    // //handle change events
    // this.setState({
    //     username: 
    // })
    // }
    handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
    // handle submit events
    event.preventDefault( );
  const url = 
  'http://localhost:3000/user/create'

  const userSend = {
      user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
      }
  }

  fetch(url, {
      method: 'POST',
      body: JSON.stringify(userSend),
      headers: {
          'Content-Type' : 'application/json'
      }
  })
  .then(res => res.json())
  .then(json => {
      console.log(json)
        if(json.message === "User successfully created!"){
           this.props.toggle()
       }
  })


    }
    // handlePasswordChange(event){
    // //handle password change events
    // }
    render() {
    return (
    <div className=" TestLoginForm ">
    <form onSubmit={this.handleSubmitevents.bind(this)}>
    <label>User Name</label>
    <input type="text" value={this.state.username}  onChange={(e)=> this.setState({...this.state,username: e.target.value})}/>
    <label>Email</label>
    <input type="email" value={this.state.email}  onChange={(e)=> this.setState({...this.state,email: e.target.value})}/>
    <label>Password</label>
    <input type="password" value={this.state.password} onChange={(e)=> this.setState({...this.state,password: e.target.value})} />
    <input type="submit" value="Log In" data-test="submit" />
    </form>
    </div>
    );
    }
    }

    export default SignUpForm;
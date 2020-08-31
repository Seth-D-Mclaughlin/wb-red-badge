import React from 'react'
import Auth from './Auth';


interface AcceptedProps{
    updateToken: (newToken: string) => void
}
type ApprovedState ={
    email: string,
    password: string,
    signup: boolean
}

class Login extends React.Component<AcceptedProps,ApprovedState>{
    constructor(props: AcceptedProps) {
        super(props);
        // handle initialization activities
            this.state ={
                email: "",
                password: "",
                signup: false
            }
        }
        

        toggleSignUp(){
            this.setState({
                ...this.state, signup: !this.state.signup
            })
        }

        handleSubmitevents(event: React.FormEvent<HTMLFormElement>) {
            // handle submit events
            event.preventDefault( );
          const url = 
          'http://localhost:3000/user/login'
        
          const userSend = {
              user:{
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
              if(json.message === "User successfully logged in!"){
                  this.props.updateToken(json.sessionToken)
              }
          })
        
        
            }

        render(){
            if(this.state.signup){
                return(
                    <Auth toggle={this.toggleSignUp} />
                )
            }
            return (
                <div className=" Login ">
            <form onSubmit={this.handleSubmitevents.bind(this)}>
            {
                //handle error condition
            }
            <label>Email</label>
            <input type="email" value={this.state.email}  onChange={(e)=> this.setState({...this.state, email: e.target.value})}/>
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={(e)=> this.setState({...this.state, password: e.target.value})} />
            <input type="submit" value="Log In" data-test="submit" />
            </form>
            <button type="submit" value="Sign up" onClick={this.toggleSignUp.bind(this)}/>
            </div>
            );
        }
}

export default Login;
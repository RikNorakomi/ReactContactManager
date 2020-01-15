import React, { Component } from 'react'

export default class AddContact extends Component {
    
    constructor(props){
        super(props);
        
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    onSubmit = (e) => {
        e.preventDefault(); // prevents submitting to file?
   

        const contact = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
        };

        console.log(contact + "hi");
    }

    static defaultProps = {
        name: 'Freddy',
        email: 'fred@yahoo.com',
        phone: '777-777-7777',
    }
    render() {

        const { name, email, phone } = this.props;

        // In this class we are making use of an uncontrolled component
        // notice that there is no 'onChange' that handles updating the state values, but we've conencted the input components
        // to refs (created in the constructor) that we get when onSubmit is called!

        // defaultValue is the initial value on the field which is here coming from props

        return (

            <div className="card mb-3">
                <div className="card-header">Add Contacts</div>
              <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                          <label htmlFor="name">Name</label>
                          
                        
                          <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          placeholder="Enter name..." 
                          defaultValue={name}
                          ref={this.nameInput}
                        />

                      </div>
                      <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="Enter email..." 
                          defaultValue={email}
                          ref={this.emailInput}
                          />
                      </div>

                      <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <input
                          type="phone"
                          name="phone"
                          className="form-control form-control-lg"
                          placeholder="Enter phone..." 
                          defaultValue={phone}
                          ref={this.phoneInput}
                       />
                      </div>
                      <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                  </form>
              </div>
            </div>
        )
    }
}

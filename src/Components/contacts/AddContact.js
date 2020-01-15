import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
// import uuid from 'uuid'; / dont need to create id anymore with json placeholder request
import axios from 'axios';

/**
 * JSON Placeholder: https://jsonplaceholder.typicode.com/
 */
export default class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value});
    
    onSubmit = async (dispatch, e) => {
        e.preventDefault(); // prevents submitting to file?
        
        const { name, email, phone, errors} = this.state;

        if (name ===''){
            this.setState({errors: {name: 'Name is required'}})
            return;
        }

        if (email ===''){
            this.setState({errors: {email: 'Email is required'}})
            return;
        }

        if (phone ===''){
            this.setState({errors: {phone: 'Phone is required'}})
            return;
        }

        // uuid() is a method on the uuid plugin that can be installed via: 'npm i uuid'
        const newContact = {
            // id: uuid(), with json placeholder we dont need to create id ourselves and we get one back
            name,
            email,
            phone,
        };

        // async version
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
        dispatch({type: 'ADD_CONTACT', payload: res.data});

        // axios.post('https://jsonplaceholder.typicode.com/users', newContact)
            // .then(res =>   dispatch({type: 'ADD_CONTACT', payload: res.data}));
        
        // dispatch({type: 'ADD_CONTACT', payload: newContact});

        // resets the state after contact has been 
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {},
        })

        console.log(newContact);
        this.props.history.push('/');
    }
 
    render() {

        const { errors, name, email, phone } = this.state;

        // Value is set on input field which makes it a controlled component so you can't type anything in the input field
        // unless you add an event handler that updates the state

        return <Consumer>
            {value => {
                const { dispatch } = value;

                return  (

                    <div className="card mb-3">
                        <div className="card-header">Add Contacts</div>
                      <div className="card-body">
                          <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                             <TextInputGroup 
                                label="Name"
                                name="name"
                                placeholder="Enter name..."
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                             />
                             <TextInputGroup 
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter email..."
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                             />
                              <TextInputGroup 
                                label="Phone"
                                name="phone"
                                type="phone"
                                placeholder="Enter phone..."
                                value={phone}
                                onChange={this.onChange}
                                error={errors.phone}
                                
                             />
                             
                              <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                          </form>
                      </div>
                    </div>
                )
            }}
        </Consumer>
    }
}

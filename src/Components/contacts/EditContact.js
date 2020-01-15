import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup'
// import uuid from 'uuid'; / dont need to create id anymore with json placeholder request
import axios from 'axios';

/**
 * JSON Placeholder: https://jsonplaceholder.typicode.com/
 */
export default class EditContact extends Component {

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

        const updateContact = {
            name,
            email,
            phone
        }

        const {id} = this.props.match.params; 
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);
        
        dispatch({
            type: 'UPDATE_CONTACT', payload: res.data
        })


        // resets the state after contact has been 
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {},
        })

        this.props.history.push('/');
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        })
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
                        <div className="card-header">Edit Contacts</div>
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
                             
                              <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>
                          </form>
                      </div>
                    </div>
                )
            }}
        </Consumer>
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './contact.css';
import { Consumer } from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class Contact extends Component {

    // prop type definition can be don either here in-class our outside like you see below
    static propTypes = {
        // name: PropTypes.string.isRequired,
        // email: PropTypes.string.isRequired,
        // phone: PropTypes.string.isRequired,
        contact: PropTypes.object.isRequired,
        // deleteClickHandler: PropTypes.func.isRequired,
    }

    state = {
        showContactInfo: false,
    }

    onShowClick = (id , e) => {
          
            this.setState({
                showContactInfo: !this.state.showContactInfo
            });

            console.log(id + this.state.showContactInfo);
    }

    onDeleteClick = async (id, dispatch) => {

        // async version
        try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        dispatch({type: 'DELETE_CONTACT', payload: id});
        } catch (e){
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }

        // axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            // .then(res =>  dispatch({type: 'DELETE_CONTACT', payload: id}))

        // console.log("clicked");
        // this.props.deleteClickHandler(); 
       
    };

    render() {

        // deconstruction of the props enables you to 
        // use 'name', ' email', 'phone' directly within JSX instead of refering to it via 'this.props.xxx'
        const { id, name, email, phone} = this.props.contact; 
        const { showContactInfo} = this.state; 

        return (

            // You need the consumer in order to access the stuff from context.js
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                        <h4>{name} 
                        <i  onClick={this.onShowClick.bind(this,name)} 
                            className="fas fa-sort-down" 
                            style={{ cursor: 'pointer'}}/>
                          <i className="fas fa-times"
                            style={{ 
                                cursor: 'pointer', 
                                  float: 'right', 
                                     color: 'red'}}
                            onClick={this.onDeleteClick.bind(this, id , dispatch)} />

                            <Link to={`contact/edit/${id}`}>
                                <i className="fas fa-pencil-alt"
                                style={{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: 'black',
                                    marginRight: '1rem'
                                }}>

                                </i>
                            </Link>
                        </h4>
                        {showContactInfo ? (
                        <ul className="list-group">
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{phone}</li>
                        </ul> ) : null}
                    </div>
                    )
                } }
            </Consumer>

           
  
        )
    }
}

// Contact.propTypes = {
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
// }

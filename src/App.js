import React from 'react';
import Header from './Components/layout/Header';
import About from './Components/pages/About';
import NotFound from './Components/pages/NotFound';
import Test from './Components/test/Test';
import AddContact from './Components/contacts/AddContact';
import EditContact from './Components/contacts/EditContact';
import Contacts from './Components/contacts/Contacts';
import { Provider } from './context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // npm i react-router-dom

import 'bootstrap/dist/css/bootstrap.min.css';

// CHECK OUT https://material-ui.com/getting-started/usage/ !!! 
 
function App() {
  return (
    <Provider>
      <Router>
      <div className="App">
      <Header branding="contact manager"/>
      <div className="container">
        <Switch>
        <Route exact path="/" component={Contacts} />
        <Route exact path="/contact/add" component={AddContact} />
        <Route exact path="/contact/edit/:id" component={EditContact} />
        {/* <Route exact path="/about/:id" component={About} /> */} // add /:id if you want to pass params to te respective page
        <Route exact path="/about/:id" component={About} />
        <Route exact path="/test" component={Test} />
        <Route component={NotFound} />
        </Switch>
{/* 
        <AddContact/>
        <Contacts /> */}

        {/* <Contact name='rik' email='something@gmail.com' phone='555-555-5555'/> */}
        {/* <Contact name='someone' email='someone@gmail.com' phone='555-444-2222'/> */}
      </div>
      
      </div> 
      </Router>
    </Provider>
  );
}

export default App;
 
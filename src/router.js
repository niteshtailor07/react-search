import React from 'react';
import { Router, Route } from 'react-router-dom';
import ShoppingList from './component/ShoppingList';





export default (
  <Router>
    <Route path="register" name="Register Page" component={ShoppingListRoute}/>   
  </Router>
);

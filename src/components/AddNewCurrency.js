import React from 'react';
import { Button } from 'reactstrap';
import './AddNewCurrency.css'

const AddNewCurrency = ({ addNewCurrency }) => (
  <Button className="add-new-currency" onClick={addNewCurrency}>
    {'+'}
  </Button>
);

export default AddNewCurrency;

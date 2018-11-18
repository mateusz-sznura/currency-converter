import React from 'react';
import { Button } from 'reactstrap';
import './AddNewDate.css'

const AddNewDate = ({ addNewDate }) => (
  <Button className="add-new-date" onClick={addNewDate}>
    {'+'}
  </Button>
);

export default AddNewDate;

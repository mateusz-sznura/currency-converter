import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './DateInput.css';

class DateInput extends Component {

  constructor(props) {
    super(props);

    this.setDate = event => {
      const { setDate } = this.props;
      setDate(event.target.value);
    }
  }

  render() {
    const { date, removeDate } = this.props;
    return (
      <div className="date-input d-flex">
        <Button className="remove-date" onClick={removeDate}>
          {'-'}
        </Button>
        <input type="date" value={date} onChange={this.setDate} />
      </div>
    );
  }

}

export default DateInput;

import React, { Component } from 'react';
import { 
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

const DEFAULT_API_KEY = '6c26db6dd08d98b1d99b2f77c7a88c90';

class AppConfig extends Component {

  render() {
    return (
      <div className="appConfig">
        <h1>App Config</h1>
        <Button color="primary">Show</Button>
        <Form>
          <FormGroup>
            <Label for="api-key-input">API Key</Label>
            <Input type="string" id="api-key-input" defaultValue={DEFAULT_API_KEY} />
            <FormText color="muted">
              This app uses fixer.io api and thus requires fixer.io API key. 
              You can use default, but if the monthly request limit is exceeded,
              you can create your own free fixer.io account and provide own API key.
            </FormText>
          </FormGroup>
        </Form>
      </div>
    );
  }

}

export default AppConfig;
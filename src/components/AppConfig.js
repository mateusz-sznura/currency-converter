import React, { Component } from 'react';
import { 
  Button,
  Collapse,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import './AppConfig.css';

const API_KEY_INPUT_ID = 'api-key-input-id';
const API_KEY_PROP_NAME = 'apiKey';

const id2prop = {
  [API_KEY_INPUT_ID]: API_KEY_PROP_NAME,
}

class AppConfig extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
    }

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.setAppConfig = this.setAppConfig.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
  }

  toggleCollapse() {
    this.setState(state => ({
      collapse: !state.collapse,
    }));
  }

  setAppConfig(event) {
    const nextAppConfig = {
      [id2prop[event.target.id]]: event.target.value,
    };
    this.props.setAppConfig({
      ...this.props.appConfig,
      ...nextAppConfig,
    });
  }

  cancelSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { appConfig } = this.props;
    return (
      <div className="app-config">
        <Button className="toggle-button" color="primary" onClick={this.toggleCollapse}>
          {this.state.collapse ? 'Hide app config' : 'Show app config'}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Form onSubmit={this.cancelSubmit}>
            <FormGroup>
              <Label for={API_KEY_INPUT_ID}>API Key</Label>
              <Input type="string" id={API_KEY_INPUT_ID} value={appConfig[API_KEY_PROP_NAME]} onChange={this.setAppConfig} />
              <FormText color="muted">
                This app uses fixer.io api and thus requires fixer.io API key.
                You can use default, but if the monthly request limit is exceeded,
                you can create your own free fixer.io account and provide your own API key.
              </FormText>
            </FormGroup>
            <Button color="primary" onClick={this.props.restoreDefaultAppConfig}>Restore default</Button>
          </Form>
        </Collapse>
      </div>
    );
  }

}

export default AppConfig;
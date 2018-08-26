import React from 'react';

class CrudComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inputJSONValidator = this.inputJSONValidator.bind(this);
    this.state = {
      inputData: [],
      resultView: false,
      outputData: [],
      textAreaStyle: {border: '1px solid red'},
      buttonStatus: 'disabled'
    }

  }


 handleClick(e) {
    this.setState({
      resultView: !this.state.resultView
    })
  }

  inputJSONValidator() {
    var input = this.state.inputData;
    try {
      JSON.parse(input)
      this.setState({
        textAreaStyle: {border: '1px solid green'},
        buttonStatus: 'enabled'
      })
    }

    catch(e) {
      this.setState({
        textAreaStyle: {border: '1px solid red'},
        buttonStatus: 'disabled'
      })
    }
  }


 handleKeyPress(e) {
    if (e.keyCode === 13 || e.which === 13) this.handleClick(e)
  }


  handleChange(e) {

    this.setState({
      inputData: e.target.value
    })

    this.inputJSONValidator()
  }


  render () {

    // child components need to override this render method
    return null;
  }
}

export default CrudComponent;









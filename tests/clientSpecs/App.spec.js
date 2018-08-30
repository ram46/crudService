var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var App = require('../../client/src/components/App.jsx');


var expect = require('chai').expect;


describe('root', function () {
  it('renders without problems', function () {
    // var root = ReactTestUtils.renderIntoDocument(<List />);
    var root = ReactTestUtils.isCompositeComponent(App, <App />)
    expect(root).to.exist;
  });
});

var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var FormCreate = require('../../client/src/components/FormCreate.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(FormCreate, <FormCreate />)
    expect(root).to.exist;
  });
});
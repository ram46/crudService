var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var FormDelete = require('../../client/src/components/FormDelete.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(FormDelete, <FormDelete />)
    expect(root).to.exist;
  });
});
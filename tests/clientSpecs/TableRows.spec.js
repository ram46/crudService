var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var TableRows = require('../../client/src/components/TableRows.jsx');


var expect = require('chai').expect;

describe('root', function () {
  it('renders without problems', function () {
    var root = ReactTestUtils.isCompositeComponent(TableRows, <TableRows />)
    expect(root).to.exist;
  });
});
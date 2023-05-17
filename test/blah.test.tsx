import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pagination from '../src/react-pagination-pro';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

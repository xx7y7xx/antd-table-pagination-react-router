import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import debugModule from 'debug';

import { dataSource } from './dataSource';
import { columns } from './columns';

const debug = debugModule('antd-table-pagination-react-router:List');

const propTypes = {
  // From <Router>
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      pageSize: PropTypes.string
    })
  }).isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

class App extends Component {
  handlePageChange = (page, pageSize) => {
    debug('handlePageChange(page=?,pageSize=?', page, pageSize);
    this.props.history.push(`/list/${page}/${pageSize}`);
  };
  render() {
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 2,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['2', '10', '100'],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: this.handlePageChange
          }}
        />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;

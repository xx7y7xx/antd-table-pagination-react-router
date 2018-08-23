import React, { Component } from 'react';
import { Table } from 'antd';

import { dataSource } from './dataSource';
import { columns } from './columns';

class App extends Component {
  handlePageChange = (page, pageSize) => {};
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

export default App;

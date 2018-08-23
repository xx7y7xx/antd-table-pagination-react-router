import React, { Component } from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike'
  },
  {
    key: '2',
    name: 'John 2'
  },
  {
    key: '3',
    name: 'John 3'
  },
  {
    key: '4',
    name: 'John 4'
  },
  {
    key: '5',
    name: 'John 5'
  },
  {
    key: '6',
    name: 'John 6'
  },
  {
    key: '7',
    name: 'John 7'
  },
  {
    key: '8',
    name: 'John 8'
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 2
          }}
        />
      </div>
    );
  }
}

export default App;

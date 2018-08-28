import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import debugModule from 'debug';

import { dataSource } from './dataSource';
import { columns } from './columns';
import { getParamFromProps, isUrlParamsBad } from './helper';

const defaultPage = 1;
const defaultPageSize = 2;
const debug = debugModule('antd-table-pagination-react-router:List');
// const consoleGroup = (...arg) => {
//   console.group(...arg);
//   console.groupEnd();
// };

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

/**
 * There are 3 places stored the page and pageSize
 * 1. HTML5 history
 * 2. App component's state
 * 3. Ant Design Table component's state
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);
    debug('constructor(props=?', props);

    let page = defaultPage;
    let pageSize = defaultPageSize;

    if (props.match.url !== '/list') {
      if (!isUrlParamsBad(props.match.params)) {
        page = getParamFromProps(props, 'page') || defaultPage;
        pageSize = getParamFromProps(props, 'pageSize') || defaultPageSize;
      }
    }
    this.state = {
      /**
       * Current page number
       * @type {number} page
       */
      page,
      /**
       * Page size number
       * @type {number} pageSize
       */
      pageSize
    };
  }

  componentDidMount() {
    debug('componentDidMount()');
    /**
     * If the page and pageSize params are invalid, need to use the default value
     * | Valid URL | Valid Number | HashUrl        | page       | pageSize   | Logic
     * |--------------------------|----------------|------------|------------|--------------------
     * | v         | v            | #/list         | undefined  | undefined  |
     * | x         |              | #/list/        | undefined  | undefined  | redirect to #/list
     * | x         |              | #/list//       | undefined  | undefined  | redirect to #/list
     * | x         |              | #/list//10     | undefined  | undefined  | redirect to #/list
     * | x         |              | #/list/1       | "1"        | undefined  | redirect to #/list
     * | v         | v            | #/list/1/10    | "1"        | "10"       |
     * | v         | x            | #/list/1a2/10  | "1a2"      | "10"       | redirect to #/list
     */
    if (this.props.match.url !== '/list') {
      if (isUrlParamsBad(this.props.match.params)) {
        debug('componentDidMount()', 'Redirect to /list');
        this.props.history.push('/list');
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    debug('componentWillReceiveProps(nextProps=?)', nextProps, 'this.props:', this.props);
    console.table({
      old: { page: this.props.match.params.page, pageSize: this.props.match.params.pageSize },
      new: { page: nextProps.match.params.page, pageSize: nextProps.match.params.pageSize }
    });

    if (nextProps.match.url !== '/list') {
      // Redirect to /list when URL params not valid
      if (isUrlParamsBad(nextProps.match.params)) {
        debug('componentWillReceiveProps()', 'Redirect to /list');
        this.props.history.push('/list');
        return;
      }
    }

    // Update page state in List component only when page URL param changed
    if (this.isParamChanged(nextProps, 'page')) {
      this.setState({ page: getParamFromProps(nextProps, 'page') });
    }
    if (this.isParamChanged(nextProps, 'pageSize')) {
      this.setState({ pageSize: getParamFromProps(nextProps, 'pageSize') });
    }
  }

  handlePageChange = (page, pageSize) => {
    debug('handlePageChange(page=?,pageSize=?', page, pageSize);
    this.updatePage(page, pageSize);
  };

  handlePageSizeChange = (page, pageSize) => {
    debug('handlePageSizeChange(page=?,pageSize=?', page, pageSize);
    this.updatePage(page, pageSize);
  };

  /**
   * @memberof App
   * @param {string} key One of "page" and "pageSize"
   */
  getParam = key => this.props.match.params[key];

  isParamChanged = (nextProps, key) => {
    const ret = this.props.match.params[key] !== nextProps.match.params[key];
    debug(`isParamChanged(nextProps=?,key=?)=>${ret}`, nextProps, key);
    return this.props.match.params[key] !== nextProps.match.params[key];
  };

  updatePage = (page, pageSize) => {
    this.setState({ page, pageSize }, this.updateUrl);
  };

  updateUrl = () => {
    const { page, pageSize } = this.state;
    this.props.history.push(`/list/${page}/${pageSize}`);
  };

  render() {
    debug('render()', this.props, this.state);
    const { page, pageSize } = this.state;
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            current: page,
            pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['2', '3', '10', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageSizeChange
          }}
        />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;

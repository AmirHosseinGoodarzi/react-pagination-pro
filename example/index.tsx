import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pagination from '../src/react-pagination-pro';

const App = () => {
  const [data, setData] = React.useState({
    page: 1,
    take: 10,
  });
  const totalItmes = 200; // get it from server-side

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>
        From the total number of{' '}
        <span style={{ color: 'red' }}>{totalItmes}</span>, take{' '}
        <span style={{ color: 'red' }}>{data.take}</span> from page{' '}
        <span style={{ color: 'red' }}>{data.page}</span>
      </h1>
      <br />
      <br />
      <Pagination totalItmes={totalItmes} state={data} setState={setData} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
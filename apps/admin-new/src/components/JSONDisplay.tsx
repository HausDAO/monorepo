import React from 'react';
import ReactJson from 'react-json-view';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JSONDisplay = ({ data }: { data: any }) => {
  return (
    <div style={{ width: '100%' }}>
      <ReactJson
        src={data}
        collapsed={true}
        theme="ashes"
        displayDataTypes={false}
        style={{ fontSize: '1.4rem', background: 'none' }}
      />
    </div>
  );
};

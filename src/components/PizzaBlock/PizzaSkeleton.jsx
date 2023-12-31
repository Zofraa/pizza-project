import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader speed={2} width={280} height={500} viewBox="0 0 280 500" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="447" rx="10" ry="10" width="95" height="30" />
    <rect x="135" y="447" rx="20" ry="20" width="145" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;

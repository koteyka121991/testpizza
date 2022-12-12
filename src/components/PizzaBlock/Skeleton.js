import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  
  >
 <circle cx="132" cy="126" r="125" /> 
    <rect x="0" y="271" rx="15" ry="15" width="280" height="30" /> 
    <rect x="0" y="315" rx="15" ry="15" width="280" height="88" /> 
    <rect x="0" y="416" rx="15" ry="15" width="92" height="30" /> 
    <rect x="124" y="416" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton;
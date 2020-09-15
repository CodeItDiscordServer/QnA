/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';

const InfiniteScrollAlert = ()=>{
  const style = css`
    margin: auto;
    width: 200px;
    height:150px;

  `;
  return (
    <div css={style}>
      <button> INFINITE SCROLLLLLLLLL!</button>
    </div>
  );
}


export default InfiniteScrollAlert;

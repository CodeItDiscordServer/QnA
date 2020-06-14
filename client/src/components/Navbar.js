
/** @jsx jsx */
import  {useState} from 'react';
import { css, jsx } from '@emotion/core';
import {Link} from "react-router-dom";


const hamburgerIcons=css`
display: none;
@media (max-width: 768px) {
  display: block;
  font-size: 32px;
  cursor: pointer;
  &:hover{
    background-color: LemonChiffon;
  }
}`

const spacercss=css`
font-family: sans-serif, "Helvetica Neue", "Lucida Grande", Arial;
  width: 100%;
  font-stretch: expanded;
`;


const gen = css`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`
function Navbar() {
  var [hamShow,toggleBurger] = useState(false);

  const navItem=css`
  margin: 20px;
  width: 40vw;
  &.li{
    text-decoration: none;
  }
  &.selected{
    background-color: LemonChiffon;
  }
  @media (max-width: 768px){
    margin: 10px 0 10px 0;
      &:hover{
        background-color: LemonChiffon;
      }
    }
  }
  `;

    const navStyles = css`
    display: flex;
    @media (max-width: 768px) {
      position: sticky;
      top: 0;
      overflow:hidden;
      transition: width 1s;
      display: block;
      z-index: 5;
      position: absolute;
      background-color: Beige;
      font-size: 32px;
      width: ${hamShow ?  '50vw' : '0px'};
      height: 100vh;
      &::before{
        content: ☰}
      }
    }`

  return (
    <div css={css`width: auto;`}>
    {!hamShow && <div css={hamburgerIcons} onClick={()=>toggleBurger(!hamShow)}>
    <i className="fa">☰
    </i></div>}

      <div className="contents" onClick={()=>toggleBurger(!hamShow)}>
        <nav className="inner" css={navStyles}>
          <div css={gen}>
            <div css={css`display:flex; justify-content: space-between`}>
               <Link  css={navItem} to="/"><div>Home </div></Link>
              <div css={hamburgerIcons}>❮</div>
            </div>

            <Link to="/about">
              <div css={navItem}>
                 About
              </div>
            </Link>
            <Link to="/news">
              <div css={navItem}>
                 News
              </div>
            </Link>
          </div>

          <div css={navItem}>
            <Link to="/login"> Login </Link>
          </div>

        </nav>
     </div>
    </div>
  );
}

export default Navbar;

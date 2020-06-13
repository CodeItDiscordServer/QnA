/** @jsx jsx */
/* @jsxFrag React.Fragment */
import * as React from "react";
import { css, jsx } from '@emotion/core';
import {Button} from "@material-ui/core"


// import {Link} from "react-router-dom";

 const tags_contaier=css`
  display: flex;
  flex-wrap: wrap;
  width: 50%;

  @media (max-width: 768px) {
    width:100%;
  }
 `;
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


const gen = css`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
`
function ResponsiveSearchBox(props) {
  var [hamShow,toggleBurger] = React.useState(false);
  const [chcks,updateChecks] = React.useState({
    searchText: "",
    i_answer: false,
    s_answer: false,
    tags: props.tags
  })

  const navItem=css`
  margin: 20px;
  width: 40vw;
  &.li{
    text-decoration: none;
  }
  &.selected{
    background-color: LemonChiffon;
  }
  @media (max-width: 768px)#{
    margin: 10px 0 10px 0;
      &:hover{
        background-color: LemonChiffon;
      }
    }
  }
  `;

    const navStyles = css`
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
      overflow: scroll;
        &::before{
          content: ☰
        }
      }
    }`

  return (
    <div css={css`width: auto;`}>
    {!hamShow && <div css={hamburgerIcons} onClick={()=>toggleBurger(!hamShow)}>
    <i className="fa">☰
    </i></div>}

      <div className="contents" onClick={()=>toggleBurger(!hamShow)}>
        <div className="inner" css={navStyles}>
          <div css={gen}>
            <div css={css`display:flex; justify-content: space-between`}>
              <></>
              <div css={hamburgerIcons}>❮</div>
            </div>
          </div>

          <div id="search-filter-box" css={check}>
            <div css={navItem} onClick={function(e){e.stopPropagation()}}>
              <label htmlFor="search-text">Optional Search string
                <input type="text"
                  value={chcks.searchText}
                  onChange={function(e){
                    updateChecks({
                      ...chcks,
                      searchText: e.target.value
                    })
                  }} />
                </label>
            </div>

            <div className="check-container" css={navItem}>
               <input type="checkbox" id="instructor-answered" value={chcks.i_answer}
               onChange={function(){
                 updateChecks({
                   ...chcks,
                   i_answer: !chcks.i_answer
                 })
                }} />
               <label htmlFor="instructor-answered"></label>
               <div className="tag">Instructor has answered</div>
             </div>
             <div className="check-container" css={navItem}>
                <input type="checkbox" id="student-answered" value={chcks.s_answer}
                onChange={function(){
                  updateChecks({
                    ...chcks,
                    s_answer: !chcks.s_answer
                  })
                 }} />
                <label htmlFor="student-answered"></label>
                <div className="tag">Student has answered</div>
              </div>

              <div id="tags-list">
                <h3>Tags </h3>
                <div css={tags_contaier}>
                    {Object.keys(props.tags).map(function(key){
                      return (<div key={`tag-check-${key}`} className="check-container" css={navItem}>
                         <input type="checkbox" id={`tag-${key}`} value={chcks.tags[key]}
                         onChange={function(){
                           let newTags = chcks.tags;
                           newTags[key] = !newTags[key];
                           updateChecks({
                             ...chcks,
                             tags: newTags,
                           })
                          }} />
                         <label htmlFor={`tag-${key}`}></label>
                         <div className="tag">{key}</div>
                       </div>)
                    })}
                </div>
              </div>
              <div>
                <Button size="large" variant="outlined"  onClick={function(){
                  props.Search(chcks)
                }}>Search</Button>
              </div>
          </div>




        </div>
     </div>
    </div>
  );
}

export default ResponsiveSearchBox;


const check = css`
.tag{
  width: auto;
}
&{
  margin: 10px;
}
label{
  width: auto;
}
span{
  width: auto;
}
@media (min-width: 768px) {
  width: 80vw;
  margin: auto;
  padding: 50px;


}


input[type="checkbox"]{
     display: none;
   }

   .check-container{
     display:flex;
     position:relative;
     width:200px;
     height:auto;
   }

   input[type="checkbox"] + label{
     z-index:15;
     position:absolute;
     left:0;
     top:-1px;
     bottom:10px;
     right:10px;
     transition:all 0.3s ease;
     cursor:pointer;
     width:20px;
     border:4px solid #444;
     height:20px;
   }

   .tag{
     margin-left:40px;
   }

   input[type="checkbox"]:checked + label{
     z-index:15;
     display:inline-block;
     transform:rotate(-50deg) translate(5px,-9px);
     transition:all 0.3s ease;
     width:20px;
     border-top-color:transparent;
      border-right-color:transparent;
      border-bottom-color:#2ecc71;
      border-left-color:transparent;
     height:20px;
   }


   input[type="checkbox"]:checked + label:before{
     content:"";
     position:absolute;
     right:0;
     bottom:-3px;
     width:100%;
     height:15px;
     border-left:4px solid #2ecc7a;
   }
`;

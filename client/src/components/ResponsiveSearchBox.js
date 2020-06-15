/** @jsx jsx */
/* @jsxFrag React.Fragment */
import  React,{useEffect} from "react";
import { css, jsx } from '@emotion/core';
import {Button} from "@material-ui/core"
import { updateSearchText } from "../Actions/searchActions";


// import {Link} from "react-router-dom";

 const tags_contaier=css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
  const chcks = props.filters
  let searchText;
  var [hamShow,toggleBurger] = React.useState(false);
  const [updateChecks] = React.useState({
    searchText: "",
    i_answer: false,
    s_answer: false,
    tags: props.tags
  })

  useEffect(()=>{
    searchText = chcks.searchText;
  })
  const searchInput = css`
    height:2vw;
    width:70%;
    border-radius:10px;
    border:2px solid black;
    &.selected{
      border-color:blue;
    }
  `
  const navItem=css`
  margin: 15px;
  font-size:1.2vw;
  display:inline-block;
  &.li{
    color:red;
    text-decoration: none;
  }
  &.selected{
    color:red;
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
      width: ${hamShow ?  '80vw' : '0px'};
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
            <div  onClick={function(e){e.stopPropagation()}}>
              <label htmlFor="search-text">
                <input type="text"
                
                css={searchInput}
                  value={searchText}
                  onChange={(event) => {props.updateSearchText(event.target.value)}} />
                </label>
            </div>
            <h3 css={css`font-weight:400;font-size:20px;`}>Tags </h3>
            <div css={tags_contaier}>
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

            </div >
              <div id="tags-list">
                
                <div css={tags_contaier}>
                    {Object.keys(props.filters.tags).map(function(key){
                      return (<div key={`tag-check-${key}`} className="check-container" css={navItem}>
                         <input type="checkbox" id={`tag-${key}`} value={chcks.tags[key]}
                         onChange={function(){
                           
                          let newTags = chcks.tags;
                           newTags[key] = !newTags[key];
                           // Called Action to change tags
                           props.updateTags(newTags)

                          }} />
                         <label htmlFor={`tag-${key}`}></label>
                         <div className="tag">{key}</div>
                       </div>)
                    })}
                </div>
              </div>
              <div>
                <Button size="large" variant="outlined" onClick={function(){
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
     border:3px solid #444;
     border-radius:50%;
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
     border-radius:0%;
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

/** @jsx jsx */
/* @jsxFrag React.Fragment */
import  React,{useEffect} from "react";
import { css, jsx } from '@emotion/core';
import {Button,CircularProgress} from "@material-ui/core"
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
    width:90%;
    font-size:1.90vw;
    font-weight:800;
    color:#2ecc7a;
    padding:15px;
    border-radius:30px;
    background-color:rgba(0,0,0,0.0);       
    border:01px solid rgba(0,0,0,0.4);
    box-shadow:2px 2px #00000025;
    &:active,
    &:focus{
      outline:none;
      background-color:rgba(0,0,0,0.05);       
    }
  `
  const navItem=css`
  margin: 5px;
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
            <div css={css`display:flex;width:100%;`}>
            <div css={css`flex:11;alignment-baseline:center;`} onClick={function(e){e.stopPropagation()}} >
              <label htmlFor="search-text">
                <input type="text"
                placeholder={"What is the formula of...?"}
                css={searchInput}
                  value={searchText}
                  onChange={(event) => {props.updateSearchText(event.target.value)}} />
                </label>
            </div>
            <div css={css`alignment-baseline:center;flex:1;padding:5px;`}>
            {props.loading?(<CircularProgress />):
                (<Button  size="large" variant="outlined" onClick={function(){
                  props.Search(chcks) }}>
                  
                  Search

                </Button>)}
                {/* <button css={css`padding:5px;outline:none;`}>Hellle</button> */}
                </div>
                </div>

            <h3 css={css`font-weight:400;font-size:20px;`}>Tags </h3>
            
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
  color:rgba(0,0,0,0.2)
  margin:10px;
}
&{
  margin: 5px;
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
     width:15px;
     border:3px solid #666;
    //  border-radius:50%;
     height:15px;
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





{/* <div css={tags_contaier}>
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

            </div > */}
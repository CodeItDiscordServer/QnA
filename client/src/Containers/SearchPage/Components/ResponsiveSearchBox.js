/** @jsx jsx */
/* @jsxFrag React.Fragment */
import  React from "react";
import { css, jsx } from '@emotion/core';
import {Button,CircularProgress} from "@material-ui/core"





 const tags_contaier=css`
  display: flex;
  flex-wrap: wrap;
  padding-top: 25px;
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
  var [hamShow,toggleBurger] = React.useState(false);


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
  @media (max-width: 768px){
    font-size:25px;

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


    const updateSearchText = (text)=>{
      props.updateFilter({
        ...props.filters,
        searchText: text
      });
      return;
    }
    const updateTags = (tags)=>{
      props.updateFilter({
        ...props.filters,
        tags
      });
      return;
    }

    const updateMisc = (key,value)=>{
      // misc items are held at the top level of the search
      let obj = {
        ...props.filters
      }
      obj[key] = value;
      props.updateFilter(obj)
      return;
    }
  return (
    <div css={css`width: auto;`}>
    {!hamShow &&
      <div css={hamburgerIcons} onClick={()=>toggleBurger(!hamShow)} >
        <i className="fa">☰</i>
      </div>}

      <div className="contents" >
        <div className="inner" css={navStyles}>
          <div css={gen}>
            <div css={css`display:flex; justify-content: space-between`}>
              <></>
              <div css={hamburgerIcons}onClick={()=>toggleBurger(!hamShow)} >❮</div>
            </div>
          </div>

          <div id="search-filter-box" css={check}>
            <div css={css`display:flex;width:100%;`}>

            {/* this is the search input for Search text. it can be broken up in to words
              seperated by " " spaces.*/}
              <div css={css`flex:11;alignment-baseline:center;`} onClick={function(e){e.stopPropagation()}} >
                <label htmlFor="search-text">
                  <input type="text"
                  placeholder={"help clarification tip"}
                  css={searchInput} value={props.filters.searchText}
                    onChange={(event) => {updateSearchText(event.target.value)}} />
                  </label>
              </div>

            <div css={css`alignment-baseline:center;flex:1;padding:5px;`}>
              {props.loading ? (<CircularProgress />) :
                (<Button  size="large" variant="outlined" onClick={function(){
                  // we use the statetoprops item filters
                  // and the dispatch to props search sequence.
                  props.SearchSequence(props.filters);
                  toggleBurger(!hamShow); }}>

                  Search

                </Button>)}
                </div>
                </div>
              <div id="misc-container" css={tags_contaier}>

                <div style={{cursor:"pointer"}} key={`Instructor has answered`} className="check-container" css={navItem}>
                   <input type="checkbox" id={`Instructor has answered`}
                    checked={props.filters["Instructor has answered"]}
                    onChange={function(){

                     updateMisc("Instructor has answered",!props.filters["Instructor has answered"])

                    }} />
                   <label htmlFor={`Instructor has answered`}></label>
                   <div onClick={function(){

                    // Called Action to change tags
                    updateMisc("Instructor has answered",!props.filters["Instructor has answered"])
                   }}className="tag">{"Instructor has answered"}</div>
                 </div>
                 {/*  end instructor                                        */}

                 <div style={{cursor:"pointer"}} key={`Student has answered`} className="check-container" css={navItem}>
                    <input type="checkbox" id={`Student has answered`}
                     checked={props.filters["Student has answered"]}
                     onChange={function(){

                      // Called Action to change tags
                      updateMisc("Student has answered",!props.filters["Student has answered"])
                     }} />
                    <label htmlFor={`Student has answered`}></label>
                    <div onClick={function(){

                     // Called Action to change tags
                     updateMisc("Student has answered",!props.filters["Student has answered"])
                    }}
                    className="tag">{"Student has answered"}</div>
                  </div>
              </div>
              {/*  end student                                        */}


            <h3 css={css`font-weight:400;font-size:20px;`}>Folders </h3>
              <div id="tags-list" css={tags_contaier}>
              {/* the list of true/false filters, the checkbox will be used, but not applied yet.
                the filter is saved in the site memory with other filters.
                */}
                    {Object.keys(props.filters.tags).map(function(key){
                      return (<div style={{cursor:"pointer"}} key={`tag-check-${key}`} className="check-container" css={navItem}>
                         <input type="checkbox" id={`tag-${key}`}
                          checked={props.filters.tags[key]}
                          onChange={function(){

                          let newTags = props.filters.tags;
                           newTags[key] = !newTags[key];
                           // Called Action to change tags
                           updateTags(newTags)

                          }} />
                         <label htmlFor={`tag-${key}`}></label>
                         <div onClick={function(){

                         let newTags = props.filters.tags;
                          newTags[key] = !newTags[key];
                          // Called Action to change tags
                          updateTags(newTags)

                         }}
                         className="tag">{key}</div>
                       </div>)
                    })}
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





/* <div css={tags_contaier}>
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

            </div > */

import searchState from '../searchState'
import {fetching, setSearchResults} from '../../Actions/searchActions'

describe("searchState" ,()=>{
    it("Testing Loading",()=>{
        let initialState = {searchResults : [],filters:{},pageState:{loading:false}}
        let finalState = Object.assign({},initialState);
        finalState.pageState.loading =true
        expect(searchState(initialState,fetching)).toStrictEqual(finalState)
    })

    it("Testing setSearch Results",()=>{
        let initialState = {searchResults : [],filters:{},pageState:{loading:true}}
        let finalState = Object.assign({},initialState);
        finalState.pageState.loading =false
        finalState.searchResults=["Ashween"]
        expect(searchState(initialState,setSearchResults(200,["Ashween"]))).toStrictEqual(finalState)
    })
})
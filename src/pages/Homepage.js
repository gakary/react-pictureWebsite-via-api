import React,{useState} from "react"
import Search from "../components/Search";
import Picture from "../components/Picture";
import { useEffect } from "react";

const Homepage = () => {
  //input is from search
  const [input,setInput] = useState("");
  //paste from Search.js
  let [data,setData] = useState(null);
  //setPage : change the page function
  let [page,setPage] = useState(1);

  let [currentSearch,setCurrentSearch] = useState("");

  const auth = "563492ad6f91700001000001e9432f4d52ed40f6b6d6cd7f48507feb";
  const initialURL ="https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;
  //fetch data from pexels api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  //Load more picture
  const morepicture = async () =>{
    let newURL;
    if(currentSearch===""){
      //page default is 1 , line 12
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    }else{
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);
    //execute the fetch process
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    //this data is refer to line 8 , data is not null ,because when into the homepage , it fetch

    //concat is count the array tgt
    setData(data.concat(parseData.photos));
  }

  //fetch data when into the page 
  useEffect(()=>{
    search(initialURL); //call search function
  },[]);//empty array


  useEffect(()=>{
    if(currentSearch===""){
      search(initialURL);
    }else{
      search(searchURL);
    }
  },[currentSearch]); //when to execute , when the currentSearch been change


  return (
    //setting the footer in below 
    <div style={{minHeight:"100vh"}}>
        <Search search={() =>{
          setCurrentSearch(input);
          }} setInput={setInput}/>
        <div className="pictures">
          {//larger {}
          data && data.map((d) => {
            return <Picture data={d} />;
          })
        }
        </div>
        <div className="morePicture">
          <button onClick={morepicture}>Load More</button>
        </div>
        </div>
  )
}

export default Homepage
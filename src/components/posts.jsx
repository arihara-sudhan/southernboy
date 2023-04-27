import React from 'react'
import '../static/posts.css'
import axios from 'axios'
import nxtprv from '../static/nxtprv.png'
import loaf from '../static/loaf.gif'

function getn(f,l,arr){
    let results = [];
    for(let i=f;i<=l;i++)
      results.push(arr[i%arr.length]);
    return results;
}
export default function Posts(){
    const TOTALTOPS = 5;
    const [post, setPost] = React.useState(null);
    const [which,setWhich] = React.useState(0);
    const [set,setSet] = React.useState([0,TOTALTOPS-1]);
    const [showposts,setShowPosts] = React.useState(0);
    React.useEffect(() => {
      axios.get('https://arisblog.onrender.com/getPosts').then((response) => {
        setPost(response.data);
      });
    }, []);
    const [ spinner, setSpinner ] = React.useState(true);
    React.useEffect(() => {
      setTimeout(() => setSpinner(false), 1000)
    }, []);

    if(post==null) return null;
    let allposts = post.map((t)=>
      <span onClick={()=>{setWhich(t.num); setShowPosts(0)}}>► {t.title}</span>
    );
    allposts = <div className='allposts'>{allposts}</div>
    let logos = post.map((l) =>
      <img src={l.logo} alt='' onClick={()=>{setWhich(l.num); setShowPosts(0)}} title={l.topic}/>
    );
    logos = getn(set[0],set[1],logos);
    const posttoshow = 
        <div className='post'>
              <h3 id='title'>{post[which].title}<span id='date'>{post[which].feeds[0]}</span></h3>
            <div className='html' dangerouslySetInnerHTML={{__html: post[which].feeds[1]}}></div>
        </div>;
 
    let toshow = null;
    if(spinner)
      toshow =  <center id='loaf'><img src={loaf} width='40%'/><span>KINDLY WAIT</span></center>;
    else if(showposts===1)
      toshow = allposts;
    else
      toshow = posttoshow;
    return (
      <div className='blog-all'>
        <div className='topics'>
          <img src={nxtprv} alt='' style={{border:0,borderRadius:0}} id='prvbut'  onClick={()=>{
            if(set[0]-TOTALTOPS>0&&set[0]-1>0)
              setSet([set[0]-TOTALTOPS,set[0]-1])
          }}/>
          {logos}
          <img id='nxtbut' src={nxtprv} alt='' style={{border:0,borderRadius:0}} onClick={()=>{
            setSet([set[1]+1,set[1]+TOTALTOPS])
          }}/>
        </div>
        <button id='allbut' onClick={()=>setShowPosts(1)}>ALL POSTS</button>
        <div className='posts'>
          {toshow}
        </div>
      </div>
    );
}

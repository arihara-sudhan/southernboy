import '../static/posts.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import nxtprv from '../static/nxtprv.png';
import loaf from '../static/loaf.gif';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function Posts() {
  const { id } = useParams();
  const TOTALTOPS = 5;
  const [posts, setPosts] = useState([]);
  const [which, setWhich] = useState(0);
  const [set, setSet] = useState([0, TOTALTOPS - 1]);
  const [showPosts, setShowPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://arisblog.onrender.com/getPosts/').then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const navigateToPost = useCallback(
    (index) => {
      setWhich(index);
      navigate(`/${index}`);
      setShowPosts(false);
    },
    [navigate]
  );

  const navigateToPrevSet = useCallback(() => {
    if (set[0] - TOTALTOPS >= 0 && set[0] - 1 >= 0) {
      setSet([set[0] - TOTALTOPS, set[0] - 1]);
    }
  }, [set]);

  const navigateToNextSet = useCallback(() => {
    if (set[1] + 1 < posts.length) {
      setSet([set[0] + 1, set[1] + 1]);
    }
  }, [set, posts.length]);
  

  const toggleShowPosts = useCallback(() => {
    setShowPosts((prevState) => !prevState);
  }, []);

  const preventDragHandler = (event) => {
    event.preventDefault();
  };

  const preventContextMenuHandler = (event) => {
    event.preventDefault();
  };

  const renderPost = () => {
    if (posts.length === 0) return null;

    const post = posts[which];
    const sanitizedHTML = DOMPurify.sanitize(post.feeds[1]);

    return (
      <div className='post'>
        <h3 id='title'>
          {post.title}
          <span id='date'>{post.feeds[0]}</span>
        </h3>
        <div
          className='html'
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          onDragStart={preventDragHandler}
          onContextMenu={preventContextMenuHandler}
        ></div>
      </div>
    );
  };

  const renderAllPosts = () => {
    return (
      <div className='allposts'>
        {posts.map((post) => (
          <span key={post.num} onClick={() => navigateToPost(post.num)}>
            ► {post.title}
          </span>
        ))}
      </div>
    );
  };

  const renderLogos = () => {
    const logos = posts.map((post) => (
      <img
        key={post.num}
        src={post.logo}
        alt=''
        onClick={() => navigateToPost(post.num)}
        title={post.topic}
        onDragStart={preventDragHandler}
        onContextMenu={preventContextMenuHandler}
      />
    ));

    return logos.slice(set[0], set[1] + 1);
  };

  return (
    <div className='blog-all'>
      <div className='topics'>
        <img
          src={nxtprv}
          alt=''
          style={{ border: 0, borderRadius: 0 }}
          id='prvbut'
          onClick={navigateToPrevSet}
        />
        {renderLogos()}
        <img
          id='nxtbut'
          src={nxtprv}
          alt=''
          style={{ border: 0, borderRadius: 0 }}
          onClick={navigateToNextSet}
        />
      </div>
      <button id='allpostsbutton' onClick={toggleShowPosts}>
        All Posts
      </button>
      <div className='content'>
        {showPosts ? renderAllPosts() : renderPost()}
        {loading && (
          <div className='loader-container'>
            <img src={loaf} alt='Loading' className='loader' />
          </div>
        )}
      </div>
    </div>
  );
}

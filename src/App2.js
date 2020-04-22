import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/*
 *
 * [方法二] 使用 flag 控制元件是否 mounted
 *
 */
const News = () => {
  const [news, setNews] = useState([]);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then((result) => {
        if (isMountedRef.current) {
          setNews(result.data.hits);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      });

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <ul>
      {news.map((topic) => (
        <li key={topic.objectID}>{topic.title}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [isShowNews, setIsShowNews] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setIsShowNews((prevIsShowNews) => !prevIsShowNews)
        }
      >
        Toggle
      </button>

      {isShowNews && <News />}
    </div>
  );
};

export default App;

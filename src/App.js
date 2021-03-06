import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/*
 *
 * [方法一] 使用 axios cancelToken 來取消請求
 *
 */
const News = () => {
  const [news, setNews] = useState([]);
  const sourceRef = useRef(axios.CancelToken.source());

  console.log('sourceRef', sourceRef);

  useEffect(() => {
    axios
      .get('https://hn.algolia.com/api/v1/search?query=react', {
        cancelToken: sourceRef.current.token,
      })
      .then((result) => {
        setNews(result.data.hits);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      });

    return () => {
      sourceRef.current.cancel(
        'Operation canceled due to new request.',
      );
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

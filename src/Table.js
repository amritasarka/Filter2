import React, { useState, useEffect } from "react";
import "./App.css";
import {debounce} from "lodash";

const postData = [
  {
    id: 1,
    PostDate: "2020-01-01",
    likes: 10,
    followers: 100,
    shareCount: 5,
    emotion: "positive",
  },
  {
    id: 2,
    PostDate: "2020-01-04",
    likes: 5,
    followers: 5000,
    shareCount: 2,
    emotion: "negative",
  },
  {
    id: 3,
    PostDate: "2020-01-05",
    likes: 20,
    followers: 200,
    shareCount: 10,
    emotion: "neutral",
  },
  {
    id: 4,
    PostDate: "2020-01-06",
    likes: 40,
    followers: 400,
    shareCount: 20,
    emotion: "negetive",
  },
  {
    id: 5,
    PostDate: "2020-01-07",
    likes: 80,
    followers: 600,
    shareCount: 50,
    emotion: "positive",
  },
  {
    id: 6,
    PostDate: "2020-01-08",
    likes: 90,
    followers: 800,
    shareCount: 60,
    emotion: "neutral",
  },
];


 const likesarr = [];
  for (let i = 0; i < postData.length; i++) {
    likesarr.push(postData[i].likes);
  }
  const maxLikes = Math.max(...likesarr);
  const minLikes = Math.min(...likesarr);


  const followersarr = [];
  for (let i = 0; i < postData.length; i++) {
    followersarr.push(postData[i].followers);
  }
  const maxFollowers = Math.max(...followersarr);
  const minFollowers = Math.min(...followersarr);


  const sharecountarr = [];
  for (let i = 0; i < postData.length; i++) {
    sharecountarr.push(postData[i].shareCount);
  }
  const maxshareCount = Math.max(...sharecountarr);
  const minshareCount = Math.min(...sharecountarr);

const Table = () => {
  const [posts, setPosts] = useState(postData);
  

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterEmotion, setFilterEmotion] = useState(null);
  const [value, setValue] = useState(maxLikes);
  const [follValue, setFollValue] = useState(maxFollowers);
  const [shareValue, setShareValue] = useState(maxshareCount);
  const [range, setRange] = useState(postData);
  const [follRange, setFollRange] = useState(postData);
  const [countRange, setCountRange] = useState(postData);

  const handleChange = (event) => {
    setValue(event.target.value);
    
  }
  const handleChangeFoll = (event) => {
     setFollValue(event.target.value);
     
  }
  const handleChangeCount = (event) => {
    setShareValue(event.target.value);
    
 }

  const handleRange = () => {
    const filteredData = postData.filter(
      (post) => post.likes >= 0 && post.likes <= value
    );
    // setPosts(filteredData);
    setRange(filteredData);
  };

  const handlefollRange = () => {
    const filteredData = range.filter(
      (post) => post.followers >= 0 && post.followers <= follValue
    );
    // setPosts(filteredData);
    setFollRange(filteredData);
  };

  const handlecountRange = () => {
    const filteredData = follRange.filter(
      (post) => post.shareCount >= 0 && post.shareCount <= shareValue
    );
    // setPosts(filteredData);
    setCountRange(filteredData);
  };


  useEffect(() => {
    handleRange();
    handlefollRange();
   handlecountRange();
  }, [value,follValue,shareValue]);
 
  console.log("range", range);
  console.log("follRange", follRange);
  console.log("countRange", countRange);
  console.table("mydata", posts);

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  const handleFilter = (emotion) => {
    setFilterEmotion(emotion);
  };

  const handleReset = () => {
    setSortColumn(null);
    setSortOrder("asc");
    setFilterEmotion(null);
  };

  const sortedPosts = sortColumn
    ? [...countRange].sort((a, b) => {
        const sortVal = sortOrder === "asc" ? 1 : -1;
        return sortVal * (a[sortColumn] - b[sortColumn]);
      })
    : countRange;

  const filteredPosts = filterEmotion
    ? sortedPosts.filter((post) => post.emotion === filterEmotion)
    : sortedPosts;

  return (
    <div className="main-div">
      <table className="design">
        <thead>
          <tr>
            <th>Postdate</th>
            <th onClick={() => handleSort("likes")}>Likes</th>
            <th onClick={() => handleSort("followers")}>Followers</th>
            <th onClick={() => handleSort("shareCount")}>Share Count</th>
            <th>Emotion</th>
          </tr>
        </thead>

        <tbody className="design1">
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.PostDate}</td>
              <td>{post.likes}</td>
              <td>{post.followers}</td>
              <td>{post.shareCount}</td>
              <td>{post.emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handleFilter(null)}>All</button>
        <button onClick={() => handleFilter("positive")}>Positive</button>
        <button onClick={() => handleFilter("negative")}>Negative</button>
        <button onClick={() => handleFilter("neutral")}>Neutral</button>
        <button onClick={handleReset}>Reset</button>
      </div>
<div className="scrool">
      <div>
        <input
          type="range"
          id="volume"
          name="volume"
          min={minLikes}
          max={maxLikes}
          value={value}
          onChange={handleChange}
        />
        <label for="volume">Likes {value}</label>

        <input
          type="range"
          id="volume"
          name="volume"
          min={minFollowers}
          max={maxFollowers}
          value={follValue}
          onChange={handleChangeFoll}
        />

        <label for="volume">Followers {follValue}</label>

        <input
          type="range"
          id="volume"
          name="volume"
          min={minshareCount}
          max={maxshareCount}
          value={shareValue}
          onChange={handleChangeCount}
        />

        <label for="volume">Share Count {shareValue}</label>
      </div>
      </div>
    </div>
  );
};

export default Table;

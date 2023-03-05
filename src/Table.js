import React, { useState } from "react";

const postData = [
  { id: 1, PostDate: "2020-01-01", likes: 10, followers: 100, shareCount: 5, emotion: "positive" },
  { id: 2, PostDate: "2020-01-04", likes: 5, followers: 5000, shareCount: 2, emotion: "negative" },
  { id: 3, PostDate: "2020-01-05", likes: 20, followers: 200, shareCount: 10, emotion: "neutral" },
  { id: 4, PostDate: "2020-01-06", likes: 40, followers: 400, shareCount: 20, emotion: "negetive" },
  { id: 5, PostDate: "2020-01-07", likes: 80, followers: 600, shareCount: 50, emotion: "positive" },
  { id: 6, PostDate: "2020-01-08", likes: 90, followers: 800, shareCount: 60, emotion: "neutral" }
];

const Table = () => {
  const [posts, setPosts] = useState(postData);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterEmotion, setFilterEmotion] = useState(null);

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
    ? [...posts].sort((a, b) => {
      const sortVal = sortOrder === "asc" ? 1 : -1;
      return sortVal * (a[sortColumn] - b[sortColumn]);
    })
    : posts;

  const filteredPosts = filterEmotion
    ? sortedPosts.filter((post) => post.emotion === filterEmotion)
    : sortedPosts;

  return (
    <div className="main-div">

      <table className="design">
        <thead>
          <tr>
          <th >Postdate</th>
            <th onClick={() => handleSort("likes")}>Likes</th>
            <th onClick={() => handleSort("followers")}>Followers</th>
            <th onClick={() => handleSort("shareCount")}>Share Count</th>
            <th>Emotion</th>
          </tr>
        </thead>

        <tbody className="design1">
          {filteredPosts.map((post) => (
           
            <tr key={post.id} >
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
    </div>
  );
};

export default Table;

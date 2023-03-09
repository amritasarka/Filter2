import React, { useState, useEffect } from "react";
import "./App.css";
import { debounce } from "lodash";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



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


const Table2 = () => {
	const [posts, setPosts] = useState(postData);

	const [sortColumn, setSortColumn] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const [filterEmotion, setFilterEmotion] = useState(null);
	const [value, setValue] = useState(maxLikes);
	const [follValue, setFollValue] = useState(maxFollowers);
	const [shareValue, setShareValue] = useState(maxshareCount);
	const [filteredPostData, setFilteredPostData] = useState(postData);
    const [list, setList] = useState(postData);
	


	const [value2, setValue2] = React.useState([23, 37]);
	const handleChange2 = (event, newValue) => {
		setValue2(newValue);

	};
	console.log(value2)

	const [value3, setValue3] = React.useState([20, 500]);
	const handleChange3 = (event, newValue) => {
		setValue3(newValue);
	};
	const [value4, setValue4] = React.useState([20, 37]);
	const handleChange4 = (event, newValue) => {
		setValue4(newValue);
	};



	const applyFilters = () => {
		let updatedList = filteredPostData;

		// Price Filter for likes
		const minL = value2[0];
		const maxL = value2[1];
		console.log("minimum lllllllllll", minL)
		console.log("maximum lllllllllll", maxL)




		updatedList = updatedList.filter(
			(item) => item.likes >= minL && item.likes <= maxL
		);

		setList(updatedList);
		console.log("setlist", list)


		// Price Filter for followers
		const minF = value3[0];
		const maxF = value3[1];
		console.log("minimum ", minF)
		console.log("maximum ", maxF)




		updatedList = updatedList.filter(
			(item) => item.followers >= minF && item.followers <= maxF
		);

		setList(updatedList);
		console.log("setlist", list)


		// Price Filter for Sharecount
		const minS = value4[0];
		const maxS = value4[1];
		console.log("minimum ss ", minS)
		console.log("maximum ss", maxS)




		updatedList = updatedList.filter(
			(item) => item.shareCount >= minS && item.shareCount <= maxS
		);

		setList(updatedList);
		console.log("setlist", list)



	};
	useEffect(() => {
		applyFilters();
	}, [value2, value3,value4]);









	// const handleRange = (value) => {
	// 	setValue(value);
	// 	const filteredData = postData.filter(
	// 		(post) => post.likes >= 0 && post.likes <= value
	// 	);
	// 	debounce(setFilteredPostData(filteredData), 5000);
	// };


	// const handlefollRange = (value) => {
	// 	setFollValue(value);
	// 	const filteredData = postData.filter(
	// 		(post) => post.followers >= 0 && post.followers <= value
	// 	);
	// 	debounce(setFilteredPostData(filteredData), 5000);
	// };

	// const handlecountRange = (value) => {
	// 	setShareValue(value);
	// 	const filteredData = postData.filter(
	// 		(post) => post.shareCount >= 0 && post.shareCount <= value
	// 	);
	// 	debounce(setFilteredPostData(filteredData), 5000);
	// };

	console.log("filteredPostData", filteredPostData);

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
		? [...list].sort((a, b) => {
			const sortVal = sortOrder === "asc" ? 1 : -1;
			return sortVal * (a[sortColumn] - b[sortColumn]);
		})
		: list;

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


			{/* <div className="scrool">
				<div>
					<input
						type="range"
						id="volume"
						name="volume"
						min={minLikes}
						max={maxLikes}
						value={value}
						onChange={(e) => {
							handleRange(e.target.value);
						}}
					/>
					<label for="volume">Likes {value}</label>

					<input
						type="range"
						id="volume"
						name="volume"
						min={minFollowers}
						max={maxFollowers}
						value={follValue}
						onChange={(e) => {
							handlefollRange(e.target.value);
						}}
					/>

					<label for="volume">Followers {follValue}</label>

					<input
						type="range"
						id="volume"
						name="volume"
						min={minshareCount}
						max={maxshareCount}
						value={shareValue}
						onChange={(e) => {
							handlecountRange(e.target.value);
						}}
					/>

					<label for="volume">Share Count {shareValue}</label>
				</div>
			</div> */}





			<Box sx={{ width: 300 }} className="slider">
				Likes
				<Slider

					value={value2}
					onChange={handleChange2}
					// onChange={(e) => {
					// 	handleRange(e.target.value);
					// }}
					valueLabelDisplay="auto"
					min={minLikes}
					max={maxLikes}

				/>
				Followers
				<Slider

					value={value3}
					onChange={handleChange3}
					// onChange={(e) => {
					// 	handleRange(e.target.value);
					// }}
					valueLabelDisplay="auto"
					min={minFollowers}
					max={maxFollowers}

				/>
				shareCount
				<Slider

					value={value4}
					onChange={handleChange4}
					// onChange={(e) => {
					// 	handleRange(e.target.value);
					// }}
					valueLabelDisplay="auto"
					min={minshareCount}
					max={maxshareCount}

				/>
			</Box>


		</div>
	);
};

export default Table2;







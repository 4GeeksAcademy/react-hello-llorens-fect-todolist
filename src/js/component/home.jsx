import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Todo_List_Fetch } from "./todolist_fetch";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<Todo_List_Fetch/>
		</div>
	);
};

export default Home;

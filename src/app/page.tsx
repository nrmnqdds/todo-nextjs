"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

export default function Home() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get("/api/todos");

			console.log("response: ", response.data);

			setTodos(response.data);
		}

		fetchData();
	}, []);

	async function postData(title: string) {
		const res = await axios.post("/api/todos", {
			title: title,
		});

		setTodo("");

		setTodos([...todos, res.data]);

		return res.data;
	}

	return (
		<main className="h-screen bg-orange-200 flex flex-col items-center justify-center">
			<div className="flex items-center justify-center gap-2">
				<input
					type="text"
					className="rounded-lg text-red-500 p-2 bg-orange-100"
					value={todo}
					onChange={(input) => setTodo(input.target.value)}
				/>
				<button
					className="bg-green-200 p-2 size-10 rounded-lg"
					onClick={() => postData(todo)}
				>
					<Plus className="text-green-700" />
				</button>
			</div>

			<ul className="mt-4 text-black space-y-2">
				{todos.length > 0
					? todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
					: [1, 2, 3, 4, 5].map((id) => (
							<li
								key={id}
								className="animate-pulse bg-zinc-700 opacity-50 rounded-xl h-5 w-32"
							/>
						))}
				{/* {if condition1 ? do this : do this} */}
				{/* 123Todo123_ */}
			</ul>
		</main>
	);
}

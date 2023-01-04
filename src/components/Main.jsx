import { Button, Center, Container, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BiRightArrow } from "react-icons/bi";
import { useRecoilState } from "recoil";
import Chatbox from "./Chatbox";
import { PropagateLoader, BounceLoader } from "react-spinners";

import { chatState } from "../atom/chatLogState";

const Main = () => {
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [chatLog, setChatLog] = useRecoilState(chatState);

	const messageRef = useRef(null);

	useEffect(() => {
		const scrollToBottom = () => {
			messageRef.current.scrollIntoView({ behavior: "smooth" });
		};

		scrollToBottom();
	}, [chatLog]);

	//Handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		let newChatLog = [...chatLog, { user: "me", message: input }];
		setInput("");

		const newPrompt = newChatLog.map((msg) => msg.message).join("\n");

		const res = await fetch("https://chatbot-y0i5.onrender.com", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: newPrompt,
			}),
		});

		if (res.ok) {
			setLoading(false);
			setChatLog(newChatLog);

			const data = await res.json();
			const parsedData = data.bot.trim();

			setChatLog([...newChatLog, { user: "ai", message: parsedData }]);
		} else {
			const err = await res.text();
			alert(err);
		}
	};

	//JSX
	return (
		<Flex direction="column" bg="#343540" w="full" color="white" py="2" px="1" h={{ base: "95vh", md: "100vh" }}>
			{chatLog.length <= 0 ? (
				<Flex direction="column" flex={1} justify="center">
					<Center>
						<BounceLoader color="green" size="200px" />
					</Center>
				</Flex>
			) : (
				<Flex direction="column" flex={1} overflowY="scroll" ref={messageRef}>
					<Container maxW="container.lg">
						{chatLog.map((chat, _i) =>
							chat.user === "ai" && loading ? (
								<Flex justify="center" h="30px" mt="5">
									<PropagateLoader color="green" />
								</Flex>
							) : (
								<Chatbox key={_i} data={chat} />
							)
						)}
					</Container>
				</Flex>
			)}
			<form onSubmit={handleSubmit}>
				<Flex align="center" px="5" gap="2">
					<Input
						type="text"
						placeholder="Type your message here...."
						_placeholder={{ color: "black" }}
						fontWeight="700"
						rounded="20px"
						bg="white"
						color="black"
						_focus={{ bg: "green", color: "white" }}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button type="submit" colorScheme="orange" _hover={{ color: "green" }}>
						<BiRightArrow size="2rem" />
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default Main;

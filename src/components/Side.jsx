import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus, AiOutlineGithub, AiOutlineLogout } from "react-icons/ai";
import { BsFillMoonFill } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";

import { useSetRecoilState } from "recoil";

import { chatState } from "../atom/chatLogState";

const Side = () => {
	const resetChat = useSetRecoilState(chatState);
	return (
		<Flex
			direction="column"
			bg="#212023"
			color="white"
			w={{ base: "full", md: "200px" }}
			h={{ base: "50px", md: "100vh" }}
			justify="space-between"
		>
			<Box p="1">
				<Button
					onClick={() => resetChat([])}
					leftIcon={<AiOutlinePlus />}
					bg="212023"
					w="full"
					_hover={{ opacity: "70%", color: "green" }}
					color="white"
				>
					New chat
				</Button>
			</Box>
			<Flex direction="column" gap="2" borderTop="1px solid white" px="3" py="3" display={{ base: "none", md: "flex" }}>
				<Flex align="center" gap="2">
					<BsFillMoonFill />
					<Text>Dark mode</Text>
				</Flex>
				<Flex align="center" gap="2">
					<AiOutlineGithub />
					<Text>OpenAi Discord</Text>
				</Flex>
				<Flex align="center" gap="2">
					<RiShareBoxFill />
					<Text>Update & FAQ</Text>
				</Flex>
				<Flex align="center" gap="2">
					<AiOutlineLogout />
					<Text>Log out</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default Side;

import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Chatbox = ({ data }) => {
	return (
		<Flex direction="column" gap="2">
			<Flex align="center" gap="5" my="2" bg={data.user !== "me" ? "gray.600" : "blue.700"} p="2" rounded="20px">
				<Flex align="center" gap="5">
					<Image
						src={data.user === "me" ? "/img/a.png" : "img/robot.jpg"}
						alt="ava"
						w="40px"
						h="40px"
						objectFit="cover"
						rounded="full"
					/>
					<Text fontSize="sm">{data.message}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Chatbox;

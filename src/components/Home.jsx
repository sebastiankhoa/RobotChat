import { Flex } from "@chakra-ui/react";
import React from "react";
import Main from "./Main";
import Side from "./Side";

const Home = () => {
	return (
		<Flex direction={{ base: "column", md: "row" }}>
			<Side />
			<Main />
		</Flex>
	);
};

export default Home;

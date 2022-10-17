import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPhone,
  faBolt,
  faGamepad,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const Type = React.useMemo(
    () => [
      {
        type: "Paket Data",
        icon: faGlobe,
        path: "/paket-data",
      },
      {
        type: "Pulsa",
        icon: faPhone,
        path: "/pulsa",
      },
      {
        type: "Token Listrik",
        icon: faBolt,
        path: "/token-listrik",
      },
      {
        type: "E-Money",
        icon: faMoneyBill,
        path: "/e-money",
      },
    //   {
    //     type: "Game Online",
    //     icon: faGamepad,
    //     path: "/game-online",
    //   },
    ],
    []
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Text fontSize={24} fontWeight={600} mt={"3vh"} mb={10}>
        My Cell
      </Text>
      {Type.map((val) => (
        <Link to={val.path}>
          <Box
            w={200}
            shadow="lg"
            rounded={"lg"}
            p={6}
            textAlign={"center"}
            borderWidth="1px"
            borderRadius="lg"
            mb={5}
          >
            <Flex alignItems={"center"}>
              <FontAwesomeIcon icon={val.icon} />
              <Text ml={5}>{val.type}</Text>
            </Flex>
          </Box>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;

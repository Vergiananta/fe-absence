import React from "react";
import { Text, Link } from "@nextui-org/react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import NextLink from "next/link";

export const Content = () => (
  <Box css={{ overflow: "hidden", height: "100%" }}>
    <Flex
      css={{
        gap: "$8",
        pt: "$5",
        height: "fit-content",
        flexWrap: "wrap",
        "@lg": {
          flexWrap: "nowrap",
        },
        "@sm": {
          pt: "$10",
        },
      }}
      justify={"center"}
    >
      <Flex
        css={{
          px: "$12",
          mt: "$8",
          "@xsMax": { px: "$10" },
          gap: "$12",
        }}
        direction={"column"}
      ></Flex>
    </Flex>

    {/* Table Latest Users */}
    <Flex
      direction={"column"}
      justify={"center"}
      css={{
        width: "100%",
        py: "$10",
        px: "$10",
        mt: "$8",
        "@sm": { px: "$20" },
      }}
    >
      <Flex justify={"between"} wrap={"wrap"}>
        <Text
          h3
          css={{
            textAlign: "center",
            "@lg": {
              textAlign: "inherit",
            },
          }}
        >
          Latest Users
        </Text>
        <NextLink href="/accounts">
          <Link
            block
            color="primary"
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "inherit",
              },
            }}
          >
            View All
          </Link>
        </NextLink>
      </Flex>
      <TableWrapper />
    </Flex>
  </Box>
);

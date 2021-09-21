import React from 'react'
import {Flex} from '@chakra-ui/react'

const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="center"
        w="100vw"
        h="100%"
        mb={8}
        p={8}
        bg={["green", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "green", "green"]}
        boxShadow={['0 4px 2px -2px gray','0 4px 2px -2px gray','0 4px 2px -2px gray','1px 4px 2px -2px gray']}
        borderRadius={['','','10px','10px']}
        {...props}
      >
        {children}
      </Flex>
    )
  }

export default NavBarContainer
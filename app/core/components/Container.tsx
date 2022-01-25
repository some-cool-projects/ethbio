import { BoxProps, Flex, useColorModeValue } from "@chakra-ui/react"
import React from "react"


export interface PageContainerProps extends BoxProps {
  centerPage?: boolean
}
/**
 * 
 * @param children React Elements to be rendered inside the container
 * @param centerPage If true, the container will be centered
 * @param props Additional props to be passed to the container
 * 
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, centerPage, ...props }) => {
  const centerProps = centerPage ? { justify: "center", align: "center" } : {}
  return (
    <Flex bg={useColorModeValue("gray.200", "gray.900")} minH="100vh" {...centerProps} {...props}>
      {children}
    </Flex>
  )
}

export default PageContainer;
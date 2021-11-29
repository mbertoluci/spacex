import React from 'react'
import {Box, Text} from "@chakra-ui/react"
import {BoxProps} from "@chakra-ui/layout/src/box"
import Lottie from 'react-lottie'
import * as animationData from './empty-state-animation.json'

interface EmptyStateProps extends BoxProps {
    isEmpty: boolean,
}
const EmptyState: React.FC<EmptyStateProps> = ({isEmpty, children}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <>
            {!isEmpty? children : (
                <Box mt="100px">
                    <Text mb="10" textAlign="center" color="gray.500">No results found</Text>
                    <Lottie options={defaultOptions} width="600px"/>
                </Box>
            )}
        </>
    )
}
export default EmptyState
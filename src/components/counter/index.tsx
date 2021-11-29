import React, {useState, useEffect, useCallback} from 'react'
import {Box, Text, useColorModeValue,} from "@chakra-ui/react"
import {BoxProps} from "@chakra-ui/layout/src/box"
interface CounterProps extends BoxProps {
    total: number
}
const Counter: React.FC<CounterProps> = ({total, ...props}: CounterProps) => {
    const [counter, setCounter] = useState(0)
    const handleCounter = useCallback(() => {
        setCounter(prevState => prevState + 1)
    }, [])
    useEffect(() => {
        if (counter < total) {
            setTimeout(handleCounter, 60)
        }
    }, [total, counter, handleCounter])
    const borderColor = useColorModeValue("Black", "White")
    return <Box d="flex"
                w={["100%","150px"]}
                h="150px"
                justifyContent="center"
                alignItems="center"
                border="3px solid"
                borderRadius={10}
                borderColor={borderColor}
                paddingY={"50px"}
                {...props}>
        <Text fontSize="5xl" fontWeight="600">{counter}</Text>
    </Box>
}
export default Counter
import React from 'react'
import {
    Box,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {BoxProps} from "@chakra-ui/layout/src/box";
import {VideoProps} from "../videoModal";

interface CardProps extends BoxProps {
    missionName: string
    launchDateLocal: string
    siteNameLong: string
    missionPathURL: string
    videoURL: string
    onClickItem(videoProps: VideoProps): void
}

const Card: React.FC<CardProps> = ({
                                       missionName,
                                       launchDateLocal,
                                       siteNameLong,
                                       missionPathURL,
                                       videoURL,
                                       onClickItem,
                                       ...props
                                   }: CardProps) => {
    const hover = useColorModeValue("gray.100", "gray.700")
    const bgColor = useColorModeValue("White", "gray.900")
    return (
        <Box
            paddingX={2} paddingY={4}
            borderRadius={10}
            cursor="pointer"
            bg={bgColor}
            _hover={{bg: hover}}
            boxShadow={'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'}
            onClick={() => onClickItem({missionName, videoURL})}
            {...props}>
            <Box d="flex" justifyContent="center" minH="150px">
                <Image src={missionPathURL ? missionPathURL : '/assets/default-patch.png'} w="146px"/>
            </Box>
            <Box marginTop={4}>
                <Text fontSize="lg" fontWeight={500}>{missionName}</Text>
            </Box>
            <Box>
                <Text fontSize="sm">{launchDateLocal}</Text>
            </Box>
            <Box marginTop={2}>
                <Text fontSize="md">{siteNameLong}</Text>
            </Box>
        </Box>
    )
}

export default Card
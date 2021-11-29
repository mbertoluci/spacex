import type {NextPage} from 'next'
import {
    Box,
    Container,
    Flex, IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Text,
    useColorMode,
    useColorModeValue, useDisclosure, useMediaQuery,
} from "@chakra-ui/react"
import {MoonIcon, SearchIcon, SunIcon} from '@chakra-ui/icons'
import Counter from "../src/components/counter"
import Card from "../src/components/card"
import EmptyState from "../src/components/empty"
import {getLaunchesPast, getMissionsResult} from "../src/service/graphql"
import {MissionsResult, LaunchPast} from "../src/types/launches"
import {useEffect, useState} from "react"
import VideoModal, {VideoProps} from "../src/components/videoModal";
import {getVideoIdFromURL} from "../src/utils/utils";

type HomeProps = {
    launches: LaunchPast[],
    missionsResult: MissionsResult
}

const Home: NextPage<HomeProps> = ({launches, missionsResult}: HomeProps) => {

    const [isMobile] = useMediaQuery("(max-width: 430px)")
    const {isOpen, onClose, onOpen} = useDisclosure()
    const {toggleColorMode} = useColorMode()
    const logo = useColorModeValue("/assets/light-logo.svg", "/assets/dark-logo.svg")
    const colorModeIconButton = useColorModeValue(<MoonIcon />, <SunIcon />)

    const [data, setData] = useState<LaunchPast[]>()
    const [search, setSearch] = useState<string>("")
    const [currentVideoProps, setCurrentVideoProps] = useState<VideoProps | undefined>()

    useEffect(() => {
        setData(launches.filter(({mission_name}) => mission_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
    }, [search])

    useEffect(() => {
        setData(launches)
    }, [launches])

    const handleClick = (videoProps: VideoProps) => {
        if(isMobile) {
            const id = getVideoIdFromURL(videoProps.videoURL)
            window.open(`vnd.youtube:${id}`)
        }else{
            setCurrentVideoProps(videoProps)
            onOpen()
        }
    }

    return (
        <Container maxW="container.xl">
            <Box position="relative">
                <IconButton onClick={toggleColorMode} position="absolute" right="0" aria-label="Switch to dark mode" icon={colorModeIconButton} />
            </Box>
            <Box mt={[5, 16]} pt={[16, 0]}>
                <Image src={logo} alt="spacex logo"/>
            </Box>
            <Flex justifyContent="space-between" flexDir={["column", "row"]} mt={[10]}>
                <Box d="flex" flex={1} justifyContent="center">
                    <Box w={["100%", "unset"]}>
                        <Text fontSize="xl" fontWeight="600" textAlign="center">Total Missions</Text>
                        <Counter total={missionsResult?.result.totalCount} mt="4px"/>
                    </Box>
                </Box>
                <Box d="flex" flex={1}  justifyContent="center">
                    <Box w={["100%", "unset"]} my={[10, 0]}>
                        <Text fontSize="xl" fontWeight="600" textAlign="center">Total past lunches</Text>
                        <Counter total={launches.length} mt="4px"/>
                    </Box>
                </Box>
            </Flex>
            <Box minW="150px">
                <Text fontSize="xl" fontWeight="600" mt={10}>
                    Launches Past
                </Text>
            </Box>
            <Box mt="8px">
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon/>
                    </InputLeftElement>
                    <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                           placeholder="Search by mission name"/>
                </InputGroup>
            </Box>
            <Box mt={10}>
                <EmptyState isEmpty={Boolean(data && data.length === 0)}>
                    <SimpleGrid columns={[1, 1, 3, 5]} spacing={3}>
                        {data && data.map(({id, mission_name, launch_date_local, launch_site, links}) => (
                            <Card key={mission_name}
                                  missionName={mission_name}
                                  launchDateLocal={new Date(launch_date_local).toLocaleDateString("en-US")}
                                  siteNameLong={launch_site.site_name_long}
                                  videoURL={links.video_link}
                                  onClickItem={handleClick}
                                  missionPathURL={links.mission_patch_small}/>
                        ))}
                    </SimpleGrid>
                </EmptyState>
            </Box>
            <VideoModal videoProps={currentVideoProps} isOpen={isOpen} onClose={onClose} />
            <Box h="300px" d="flex" alignItems="center" justifyContent="center">
                <Text>created by @mbertoluci</Text>
            </Box>
        </Container>
    )
}

export async function getStaticProps() {
    const data = await getLaunchesPast()
    const result = await getMissionsResult()
    return {
        props: {
            launches: data.launchesPast,
            missionsResult: result.missionsResult
        }
    }
}

export default Home

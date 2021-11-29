import React from 'react'
import {
    AspectRatio,
    Button,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import {UseModalProps} from "@chakra-ui/modal/src/use-modal";
import {getVideoIdFromURL} from "../../utils/utils";

export interface VideoProps{
    missionName: string
    videoURL: string
}

interface VideoModalProps extends UseModalProps {
    videoProps: VideoProps | undefined
}

const VideoModal: React.FC<VideoModalProps | undefined> = ({videoProps, ...props}: VideoModalProps) => {
    const getEmbeddedUrl = (videoURL: string | undefined) =>{
        if(videoURL){
            const id = getVideoIdFromURL(videoURL)
            return 'https://www.youtube.com/embed/'.concat(id)
        }
    }

    return (
        <Modal {...props}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{videoProps?.missionName}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <AspectRatio ratio={1}>
                        <iframe title={videoProps?.missionName}
                                src={getEmbeddedUrl(videoProps?.videoURL)}
                                allowFullScreen/>
                    </AspectRatio>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default VideoModal
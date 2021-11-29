export const getVideoIdFromURL = (videoURL : string): string =>{
    const code = videoURL.split("/")
    return code[code.length-1].replace("watch?v=", "").replace("&feature=youtu.be", "")
}
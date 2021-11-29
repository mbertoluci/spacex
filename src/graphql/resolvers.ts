import {getLaunchesPast, getMissionsResult} from "./datasource/spacex";
export const resolvers = {
    Query:{
        launchesPast: () => {
            return getLaunchesPast().then((res) => res.launchesPast)
        },
        missionsResult: () => {
            return getMissionsResult().then((res) => res.missionsResult)
        }
    }
}
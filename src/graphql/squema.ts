import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type LaunchSite {
        site_name_long: String!
    }
    type Link {
        video_link: String
        mission_patch_small: String
    }
    type LaunchesPast {
        id: ID!
        mission_name: String!
        launch_date_local: String!
        launch_site: LaunchSite!
        links: Link!
    }
    
    type MissionResult {
        totalCount: Int
    }
    
    type MissionsResult {
        result: MissionResult!
    }
    
    type Query {
        launchesPast: [LaunchesPast]!
        missionsResult: MissionsResult!
    }
`
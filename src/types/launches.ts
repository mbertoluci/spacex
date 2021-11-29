export interface LaunchSite{
    site_name_long: string
}

export interface Link{
    video_link: string
    mission_patch_small: string
}

export interface LaunchPast {
    id: string
    mission_name: string
    launch_date_local: string
    launch_site: LaunchSite
    links: Link
}

export interface LaunchesPast {
    launches: LaunchPast[]
}

export interface MissionsResult {
    result: {
        totalCount: number
    }
}


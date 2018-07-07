export interface User {
    username: string;
    discriminator: string;
    mfa_enabled: boolean;
    id: string;
    avatar: string;
    provider: "discord";
    guilds: Guild[];
}

export interface Guild {
    owner: true;
    permissions: 2146958591;
    icon?: string;
    id: string;
    name: string;
}

export interface AuthenticationInfo {
    user: User;
}

export interface SidebarInfo {
    activeItem: string;
}

export interface Channel {
    key: string;
    value: string;
    text: string;
    ships: number[];
}

export interface SettingsInfo {
    channels: Channel[];
    ships: number[];
    server: string;
    channel: string;
}

export interface GeneralInfo {
    error: string;
    success: string;
    loading: boolean;
}

export interface HomeInfo {
    eq?: EQAlert;
}

export interface State {
    auth: AuthenticationInfo;
    sidebar: SidebarInfo;
    settings: SettingsInfo;
    general: GeneralInfo;
    home: HomeInfo;
}

export interface EQ {
    name: string;
    jpName: string;
    ship: number;
}

export interface EQAlert {
    when: string;
    eq: EQ;
}

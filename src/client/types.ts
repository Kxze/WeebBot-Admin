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

export interface State {
    auth: AuthenticationInfo;
    sidebar: SidebarInfo;
}
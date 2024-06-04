export type UserDetailsResponse = {
    status: string;
    data?: {
        id: number;
        username: string;
        email: string;
    };
    message?: string;
};

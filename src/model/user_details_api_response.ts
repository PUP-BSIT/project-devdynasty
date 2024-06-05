export type UserDetailsResponse = {
    status: string;
    data?: {
        description: string;
        email: string;
        location: string;
        name: string;
        phone_number: number;
        profile_picture: string;
        skills: string;
    };
    message?: string;
};

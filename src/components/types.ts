// Types for the Teams table
export type Team = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// Types for the Users table
export type User ={
    id: number;
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
}

// Types for the Sessions table
export type Session = {
    id: number;
    userid: number;
    key: string;
    createdAt: Date;
}

// Types for the Documents table
export type Document = {
    id: number;
    owner: number;
    teamID: number;
    title: string;
    content: string;
    checkboxStates: string;
    createdAt: Date;
    updatedAt: Date;
}

// Types for the TeamMembers table
export type TeamMember ={
    teamID: number;
    userID: number;
    role: string;
    createdAt: Date;
}

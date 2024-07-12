import { User } from "./types";

async function Auth(): Promise<string> {
    const currentCookieval = getCookiesWithValue("spoura_session")
    if (currentCookieval == null) {
        const session = await NewSession();
        document.cookie = "spoura_session" + "=" + session +"; path=/";
        const user = await GetSession(session);
        return user;
    } else {
        const user = await GetSession(currentCookieval);
        if (user == null) {
            const session = await NewSession();
            document.cookie = "spoura_session" + "=" + session +"; path=/";
            const user = await GetSession(currentCookieval);
            return user;
        } else {
            return user;
        }
    }
}

export async function AuthWrapper (): Promise<User> {
    const user = await Auth();
    try {
        return JSON.parse(user);
    } catch (e) {
        document.cookie = "";
        location.reload()
        return {
            id: 0,
            email: "",
            password: "",
            verified: false,
            createdAt: new Date()
        };
    }
}

async function NewSession(): Promise<string> {
    try {
        const response = await fetch('https://spoura-go-api.vercel.app/api/createsession');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.text();
        return result;
    } catch (error: any) {
        console.error('There was a problem with the fetch operation:', error.message);
        return "";
    }
}

async function GetSession(cookieVal: string): Promise<string> {
    try {
        const response = await fetch('https://spoura-go-api.vercel.app/api/session/' + encodeURIComponent(cookieVal));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.text();
        return result;
    } catch (error: any) {
        console.error('There was a problem with the fetch operation:', error.message);
        return "";
    }
}

export function getCookiesWithValue(value: string): string {
    var cookies = document.cookie.split(';');
    // console.log(cookies)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(value + '=') == 0) {
            return cookie.split("=")[1];
        }
    }
    return "";
}
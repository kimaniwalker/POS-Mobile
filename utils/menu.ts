import Constants from 'expo-constants';
import { Alert } from 'react-native';

const ENV = process.env.APP_ENV
const BASEURL: string = ENV === 'production' ? Constants.expoConfig?.extra?.PRODUCTION_API_URL : Constants.expoConfig?.extra?.STAGING_API_URL
const SECRET: string = Constants.expoConfig?.extra?.SECRET


export async function getFullMenu() {
    console.log(BASEURL)
    console.log(SECRET)
    try {
        const res = await fetch('http://localhost:3000/api/menu/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: SECRET,
            },
        });
        // waits until the request completes...
        if (res.status === 200) {
            const menu = await res.json();
            return menu.menu
        } else {
            const menu = await res.json();
            return menu

        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}

export async function getMenuItem(id: number) {
    console.log(BASEURL)
    console.log(SECRET)
    try {
        const res = await fetch(`http://localhost:3000/api/menu/getOne?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: SECRET,
            },
        });
        // waits until the request completes...
        if (res.status === 200) {
            const menu = await res.json();
            return menu
        } else {
            const menu = await res.json();
            return menu

        }

    } catch (error: any) {
        Alert.alert(error.message)
    }
}



export default function useMenuHook() {
    return {
        getFullMenu, getMenuItem
    }
}
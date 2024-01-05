import  {clsx,  type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export const setCookie = (key: string, value: string, expiresAt: number, session= false) =>{

    if(!session){
        const date = new Date();
        date.setTime(date.getTime() + expiresAt * 1000);
        document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure;`
    } else{
        document.cookie = `${key}=${value}; path=/; SameSite=Lax; Secure;`
    }
}

export const getCookies = (key: string) => {
    const cookies = document.cookie.split(';')

    for(let cookie of cookies){
        cookie = cookie.trim()
        if(cookie.startsWith(`${key}=`)){
            return cookie.substring(key.length + 1, cookie.length)
        }
    }
    return null;
}

export const cn = ( ...inputs: ClassValue[] ) => {
    return twMerge(clsx(inputs))
}

export const getDate=(date: Date) =>{
    const currentDate = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // const hour = date.getHours();
    // const minute = date.getMinutes().toString().padStart(2, '0');

    const yearMonth = `${day}/${month}/${year}`;
    const hourMinute = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    if(currentDate.toDateString() === date.toDateString()){
        return `Today ${hourMinute}`;
    } 

    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString();

    if (yesterday === date.toDateString()) {
        return `Yesterday ${hourMinute}`;
      }
    
      return `${yearMonth} ${hourMinute}`;
}
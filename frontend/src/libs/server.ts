'use server'

export async function getServerUrl() {
    return process.env.NEXT_PUBLIC_API_URL as string;
}
async function getData(): Promise<MyString> {
    const res: Response = await fetch('http://localhost:8080/test')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Test() {
    const data: MyString = await getData();

    return <>{data.message}</>
}
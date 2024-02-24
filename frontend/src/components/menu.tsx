import Link from "next/link";

export default function Menu() {
    return (
        <>
            <Link href="/">Главная</Link>
            <Link href="/login">Вход</Link>
            <Link href="/registration">Регистрация</Link>
        </>
    );
}

import Link from "next/link";
import "./menu.css";

export default function Menu() {
  return (
    <div className="menu">
      <Link href="/">Главная</Link>
      <Link href="/login">Вход</Link>
      <Link href="/registration">Регистрация</Link>
    </div>
  );
}

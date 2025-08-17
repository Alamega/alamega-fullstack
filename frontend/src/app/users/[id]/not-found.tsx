import {Metadata} from "next";
import Image from "next/image";
import "../../errors.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Пользователь не найден"
};

export default async function NotFound() {
    return <>
        <div className="error-wrapper">
            <div className="image-wrapper">
                <Image
                    src="/images/errors/chika-surprised.gif"
                    alt="Ошибка 404"
                    width={1000}
                    height={400}
                    unoptimized={true}
                />
            </div>
            <p>Ошибка 404, с ума сойти... Похоже такого пользователя не существует. </p>
            <p>Предлагаю <Link href={"/"}>вернуться на главную</Link></p>
        </div>
    </>
}

import {Metadata} from "next";
import Image from "next/image";
import "./errors.css";

export const metadata: Metadata = {
    title: "Страница не найдена"
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
            <p>Ошибка 404, с ума сойти... Похоже такой странички не существует. </p>
            <p>Предлагаю <a href={"/"}>вернуться на главную</a></p>
        </div>
    </>;
}

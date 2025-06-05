"use client";

import Image from "next/image";
import "./errors.css";

export default function Error({error, reset}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <>
        <div className="error-wrapper">
            <div className="image-wrapper">
                <Image
                    src="/images/errors/angry-cat.gif"
                    alt="Ошибка"
                    width={1000}
                    height={400}
                    unoptimized={true}
                />
            </div>
            <p>Ошибка... Какая-то чудовищная ошибка. Наши источники сообщают что ошибка называет себя {error.name} и
                говорит странные вещи по типу этой: &quot;{error.message}&quot;.</p>
            <p>Настоятельно рекомендуем <a href={"/"}>вернуться на главную</a>.</p>
            <p>А мы тут всё уберем и никто ничего не узнает.</p>
        </div>
    </>;
}

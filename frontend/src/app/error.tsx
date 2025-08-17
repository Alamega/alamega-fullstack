"use client";

import Image from "next/image";
import "./errors.css";
import Link from "next/link";

export default function Error({error}: {
    error: Error & { digest?: string },
    reset: () => void;
}) {
    console.log(error.message)
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
            <p>Ошибка... Какая-то чудовищная ошибка.</p>
            {error.message}
            <p>Настоятельно рекомендуем <Link href={"/"}>вернуться на главную</Link>.</p>
            <p>А мы тут всё уберем и никто ничего не узнает.</p>
        </div>
    </>;
}

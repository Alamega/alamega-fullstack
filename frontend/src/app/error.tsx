"use client"

import Image from "next/image";
import "./errors.css"
import Link from "next/link";
import {useEffect} from "react";

export default function Error({error}: { error: Error & { digest?: string }; reset: () => void; }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return <>
        <div className="error-wrapper">
            <div className="image-wrapper">
                <Image
                    src="/images/errors/angry-cat.gif"
                    alt="Ошибка"
                    width={1000}
                    height={400}
                />
            </div>
            <p>Ошибка... Какая-то чудовищная ошибка. Наши источники сообщают что ошибка называет себя {error.name} и
                говорит странные вещи по типу этой: &quot;{error.message}&quot;.</p>
            <p>Настоятельно рекомендуем <Link href={"/"}>вернуться на главную</Link>.</p>
            <p>А мы тут всё уберем и никто ничего не узнает.</p>
        </div>
    </>
}

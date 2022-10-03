import Link from "next/link"
import Trophy from "../icons/trophy"
import Plus from "../icons/plus"

export default function Header() {
    return (
        <>
            <nav className="h-fit w-11/12 sm:w-5/6 max-w-[800px] 
                            flex mx-auto justify-center content-between items-center
                            mt-6 p-2
                            rounded-full
                            bg-gradient-to-r from-sky-500 via-fuchsia-500 to-pink-500">
                <div className="w-1/3 
                                flex justify-start
                                px-3 py-2">
                    <Link href="/rankings">
                        <a className="p-4 
                                    bg-slate-200/20
                                    hover:bg-slate-200/30
                                    text-white
                                    rounded-full">
                            <span className="block sm:hidden"><Trophy></Trophy></span>
                            <span className="hidden sm:block">Rankings</span>
                        </a>
                    </Link>
                </div>
                <Link href="/">
                    <a className="w-1/3 
                            flex justify-center 
                            text-white	text-2xl font-medium">
                        <span className="sm:hidden text-center leading-none">Founder Smash</span>
                        <span className="sm:block hidden">FounderSmash</span>
                    </a>
                </Link>
                <div className="w-1/3 
                                flex justify-end
                                px-3 py-2">
                    <Link href="https://forms.gle/afsWsRqW5NoY2HSq9" passHref>
                        <a className="p-4 
                                    bg-slate-200/20
                                    hover:bg-slate-200/30
                                    text-white
                                    rounded-full"
                            target="_blank">
                            <span className="block sm:hidden"><Plus></Plus></span>
                            <span className="hidden sm:block">Submissions</span>
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}

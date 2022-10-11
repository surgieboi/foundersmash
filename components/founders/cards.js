import { useEffect, useState } from "react"
import Cookie from "js-cookie"
import Link from "next/link"
import { supabase } from "../../utils/supabaseClient"

export default function VotingCards() {

    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [fid, setFid] = useState()
    const [flength, setFlength] = useState()
    const [index, setIndex] = useState(0)
    const [clicks, setClicks] = useState(0)

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer', apiKey
        }
    }

    const shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };

    const fetchFounder = async () => {
        try {
            const { data, error } = await supabase
                .from('founders')
                .select()
            shuffle(data);
            setData(data);
            setIndex(0);
            setFid(data[index].founder_id);
            setFlength(data.length);
            console.log(`Welcome to FounderSmash, you are about to pass or smash on ${data.length} founders!`);
            if (error) throw error;
            console.log("Founder data has been loaded from Supabase.");
        } catch (error) {
            console.log("An error occurred while fetching founder data from Supabase.");
        }
    };

    useEffect(() => {
        setLoading(true);
        const founderSmashData = localStorage.getItem('lastfounderarray');
        if (founderSmashData) {
            console.log("We here!");
            const cachedFounderSmashArray = localStorage.getItem('lastfounderarray');
            const cachedFounderSmashIndexValue = localStorage.getItem('indexvalue');
            const cachedFounderSmashClicks = localStorage.getItem('currentclicks');
            const parsedCachedFounderArray = JSON.parse(cachedFounderSmashArray);
            const parsedCachedIndex = JSON.parse(cachedFounderSmashIndexValue);
            const parsedCachedClicks = JSON.parse(cachedFounderSmashClicks);
            setFid(parsedCachedFounderArray[parsedCachedIndex].founder_id);
            setData(parsedCachedFounderArray);
            setIndex(parsedCachedIndex);
            setClicks(parsedCachedClicks);
            setFlength(parsedCachedFounderArray.length);
            console.log("FounderSmash data has been reloaded!");
        } else {
            console.log("We gone hoe!")
            fetchFounder();
        };
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const votePass = async () => {
        try {
            const { error } = await supabase
                .from("votes")
                .insert([
                    {
                        founder: fid,
                        vote: `pass`
                    }
                ])
                .single();
                setIndex(index + 1);
                setFid(data[index + 1].founder_id);
                if(clicks >= flength){
                    localStorage.clear();
                };
            if (error) throw error;
            console.log("A vote of pass has been created in Supabase.");
        } catch (error) {
            console.log("An error occurred while inserting a new pass vote into Supabase.");
        }
    };

    const voteSmash = async () => {
        try {
            const { error } = await supabase
                .from("votes")
                .insert([
                    {
                        founder: fid,
                        vote: `smash`
                    },
                ])
                .single();
                setIndex(index + 1);
                setFid(data[index + 1].founder_id);
                if(clicks >= flength){
                    localStorage.clear();
                };
            if (error) throw error;
            console.log("A vote of smash has been created in Supabase.");
        } catch (error) {
            console.log("An error occurred while inserting a new smash vote into Supabase.");
        }
    };

    const updateVotingStatus = async () => {
        Cookie.set("votingStatus", true);
        localStorage.setItem('lastfounderarray', JSON.stringify(data));
        localStorage.setItem('indexvalue', (index));
        localStorage.setItem('currentclicks', (clicks));
    }

    const updateClicks = async () => {
        setClicks(clicks + 1)
    }

    const clearStorage = async () => {
        localStorage.clear();
    }

    if (isLoading) return <p className="h-fit w-11/12 sm:w-5/6 max-w-[800px] mx-auto py-20 px-10 text-2xl text-center">Loading Founders...</p>;

    if (!data) return <p className="h-fit w-11/12 sm:w-5/6 max-w-[800px] mx-auto py-20 px-10 text-2xl text-center">Whoops! There was an issue loading data from Supabase.</p>;

    if (clicks >= flength) return <p className="h-fit w-11/12 sm:w-5/6 max-w-[800px] mx-auto py-20 px-10 text-2xl text-center">Interesting choices 😜 let&#39;s see how your passes and smashes rank up!<br></br><Link href="/rankings" passHref><button className="mt-3 sm:mt-6 sm:mb-3 py-4 w-full sm:w-[300px] rounded-full bg-pink-500 text-white text-base hover:bg-sky-500 active:bg-sky-500 focus:outline-none focus:ring focus:ring-slate-300 disabled:bg-slate-200 disabled:text-slate-500"  onClick={() => { clearStorage() }} >View Rankings</button></Link></p>;

    return (
        <>
            <div className="h-fit w-11/12 sm:w-5/6 max-w-[800px]  
                  mx-auto py-5
                  flex flex-col justify-center content-between items-center">
                     {/* data.filter(x => x.founder_id === fid) */}
                <div className="w-full sm:max-w-[400px] h-[450px] sm:h-[455px]">
                    {data.filter(x => x.founder_id === fid).map(founder =>
                        <div className="relative w-full sm:max-w-[400px]" key={founder.founder_id}>
                            <div className="absolute w-full sm:max-w-[400px] h-[400px] sm:h-[375px]"> 
                                <div className="relative bg-white rounded-3xl">
                                    <div className="h-[350px] sm:h-[375px] rounded-t-3xl"
                                        style={
                                            {
                                                backgroundImage: `url(/${founder.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center center',
                                                backgroundColor: `#f4f4f4`
                                            }
                                        }>
                                        <img className="invisible" src={`/${founder.image}`}></img>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{founder.name}</h3>
                                        <p>{founder.company}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )}

                </div>
                <div className="flex w-full sm:max-w-[400px] sm:mt-3">
                    <button onClick={() => { votePass(); updateClicks(); updateVotingStatus(); }}
                        className="m-1 py-4 px-10 
                                w-1/2
                                rounded-full 
                                bg-red-500 text-white 
                                hover:bg-red-600 active:bg-red-600 
                                focus:outline-none focus:ring focus:ring-slate-300 
                                disabled:bg-slate-200 disabled:text-slate-500">
                        Pass
                    </button>
                    <button onClick={() => { voteSmash(); updateClicks(); updateVotingStatus(); }}
                        className="m-1 py-4 px-10 
                                w-1/2
                                rounded-full 
                                bg-emerald-500 text-white 
                                hover:bg-emerald-600 active:bg-emerald-600 
                                focus:outline-none focus:ring focus:ring-slate-300 
                                disabled:bg-slate-200 disabled:text-slate-500">
                        Smash
                    </button>
                </div>
            </div>
        </>
    )
}

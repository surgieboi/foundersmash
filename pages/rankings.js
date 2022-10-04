import { useState, useEffect } from 'react';
import Layout from '../components/layout/layout'
import { supabase } from '../utils/supabaseClient';
import { parseCookies } from "../lib/parseCookies";

export default function Rankings({ initialRememberValue }) {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [rememberVoter, setRememberVoter] = useState(initialRememberValue)

    const fetchVotes = async () => {
        try {
            setLoading(true)
            const { data, error} = await supabase
                .from("rankings")
                .select()
            setData(data)
            setLoading(false)
            if (error) throw error;
            //console.log(data)
            console.log("Ranking data has been loaded from Supabase.");
        } catch (error) {
            console.log("An error occurred while fetching ranking data from Supabase.");
        }
    };

    useEffect(() => {
        fetchVotes();
    }, [])

    if (isLoading) return <p className="h-fit w-11/12 sm:w-5/6 max-w-[800px]  mx-auto py-20 px-10 text-2xl text-center">Loading Rankings...</p>;

    if (!data) return <p className="h-fit w-11/12 sm:w-5/6 max-w-[800px]  mx-auto py-20 px-10 text-2xl text-center">Whoops! There was an issue loading data from Supabase.</p>;

    return (
        <>
            <div className="h-fit w-11/12 sm:w-5/6 max-w-[800px]  
                  mx-auto py-10
                  flex flex-col justify-center content-between items-center">
                <table className="table-fixed sm:table-auto w-full bg-white rounded-3xl">
                    <thead>
                        <tr>
                            <th className="w-[180px] sm:w-[250px] py-4 pl-4 sm:pl-6 rounded-tl-3xl bg-slate-100 border-b text-left">Founder</th>
                            <th className="p-4 bg-slate-100 border-b text-fuchsia-500">Smashes</th>
                            <th className="p-4 rounded-tr-3xl bg-slate-100 border-b">Passes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ranking =>
                            <tr key={ranking.name} className="border-b">
                                <td className="w-[180px] sm:w-[250px] text-left leading-tight">
                                    <div className="table-cell sm:flex pl-3 sm:pl-4">
                                        <div className="h-[40px] w-[40px] rounded-full"
                                            style={
                                                {
                                                    backgroundImage: `url(/${ranking.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center center'
                                                }
                                            }>
                                            <img className="invisible" src={`/mark-zuckerberg.jpg`}></img>
                                        </div>
                                        <div className="flex mt-2 sm:mt-0 sm:ml-4 flex-col items-baseline justify-center">
                                            <span className="font-semibold">
                                                {ranking.name}
                                            </span>
                                            <span className="text-xs">
                                                {ranking.company}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-fuchsia-500">{ranking.smashes}</td>
                                <td>{ranking.passes}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

Rankings.getInitialProps = ({ req }) => {
    const cookies = parseCookies(req);
  
    return {
      initialRememberValue: cookies.rememberVoter
    };
  };
  

Rankings.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

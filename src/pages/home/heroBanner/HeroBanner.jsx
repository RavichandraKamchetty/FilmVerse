import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoaderImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";

function HeroBanner() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    const { data, loading } = useFetch("/movie/upcoming");
    const { url } = useSelector((state) => state.home);

    const navigate = useNavigate();

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
        setBackground(bg);
    }, [data, url.backdrop]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />

                        <button onClick={() => {navigate(`/search/${query}`)}}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default HeroBanner;

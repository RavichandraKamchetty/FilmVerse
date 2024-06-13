import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

function Similar({ mediaType, id }) {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            endpoint={mediaType}
            loading={loading}
        />
    );
}

export default Similar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { deleteFavourite, setFavourite } from "../services/favourite";
import { useState } from "react";
import { setVote } from "../services/vote";

type CatCardProps = {
    url: string;
    filename: string;
    width: number;
    height: number;
    isFavourite: boolean;
    votes: number;
    id: string;
    favouriteId: number
};

export const CatCard = ({
    url,
    width,
    height,
    filename,
    isFavourite,
    favouriteId,
    votes = 0,
    id
}: CatCardProps) => {

    const [heart, setHeart] = useState<boolean>(isFavourite);
    const [favId, setFavId] = useState<number | undefined>(favouriteId);
    const [voteCount, setVoteCount] = useState<number>(votes);

    const toggleFavourite = async () => {
        if (heart && favId !== undefined) {
            await deleteFavourite(favId);
            setFavId(undefined);
            setHeart(false);
        } else {
            const response = await setFavourite(id);
            setFavId(response.data?.id);
            setHeart(true);
        }

        setHeart(!heart);
    }

    const handleVote = async (value: number) => {
        const response = await setVote(id, value);
        if(response.status === 'success'){
            setVoteCount(voteCount + value);
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col p-4">

            {/* Image container respecting real ratio */}
            <div
                className="relative w-full bg-gray-100 rounded-xl flex items-center justify-center"
                style={{ aspectRatio: `${width} / ${height}` }}
            >
                <img
                    src={url}
                    alt={filename}
                    className="max-w-full max-h-full object-contain"
                />

                {/* Filename overlay */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {filename}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 text-sm">

                <button
                    onClick={toggleFavourite}
                    className={`transition ${heart
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                >
                    <FontAwesomeIcon
                        icon={heart ? faHeartSolid : faHeartRegular}
                    />
                </button>

                <div className="flex items-center gap-4 text-gray-500">

                    {/* Upvote */}
                    <button
                        onClick={() => handleVote(1)}
                        className="transition hover:text-green-500 active:scale-95"
                    >
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>

                    <span className="font-medium text-gray-700 min-w-[24px] text-center">
                        {voteCount}
                    </span>

                    {/* Downvote */}
                    <button
                        onClick={() => handleVote(-1)}
                        className="transition hover:text-red-500 active:scale-95"
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>

                </div>

            </div>
        </div>
    )
}
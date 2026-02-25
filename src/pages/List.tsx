import { useEffect, useState } from "react";
import { readCats } from "../services/read";
import type { Cat } from "../types/Cat";
import { CatCard } from "../components/CatCard";

/**
 * 
 * @returns 
 * 
 * Loads the cats that have been uploaded by the user.
 * A maximum of 4 per row are displayed and it is resposive to support smaller screens
 * 
 */
export default function List() {

  const [cats, setCats] = useState<Cat[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCats = async () => {
      try {
        const { data: cats } = await readCats();
        setCats(cats);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    };

    loadCats();
  }, []);

  // loading spinner while the API fetches the data
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </main>
    );
  }

  // main component jsx
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Your Uploaded Cats</h1>

        <div
          className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
        >
          {/* if there is no cats uploaded by the user */}
          {cats === undefined || cats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-xl font-medium text-gray-700">
                No cats uploaded yet
              </p>
              <p className="text-gray-500 mt-2">
                Head over to the upload page and add your first one.
              </p>
            </div>

          ) : (
            // if cats are defined and there is at least 1 - map and display the cats
            cats?.map((cat) => (
              <CatCard
                key={cat.id}
                url={cat.url}
                width={cat.width}
                height={cat.height}
                filename={cat.original_filename}
                isFavourite={cat.favourite?.isFavourite}
                favouriteId={cat.favourite?.id}
                votes={cat.votes}
                id={cat.id}
              />
            ))
          )
          }
        </div>
      </div>
    </main>
  );
}
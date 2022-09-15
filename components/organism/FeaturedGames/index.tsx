import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getFeaturedGame } from "../../../services/player";
import GameItem from "../../molekuls/GameItem";

const FeaturedGames = () => {
  const [gameList, setGameList] = useState<any[]>([]);
  const getFeaturedGameList = useCallback(async () => {
    const data = await getFeaturedGame();
    setGameList(data);
  }, []);

  useEffect(() => {
    getFeaturedGameList();
  }, []);

  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          {gameList.map((game) => (
            <GameItem
              key={game?._id}
              id={game?._id}
              category={game?.category?.name}
              title={game?.name}
              thumbnail={game?.thumbnail}
              status={game?.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGames;

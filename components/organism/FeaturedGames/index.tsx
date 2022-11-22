import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getFeaturedGame } from "../../../services/player";
import GameItem from "../../molekuls/GameItem";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FeaturedGames = () => {
  const [gameList, setGameList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const getFeaturedGameList = useCallback(async () => {
    const data = await getFeaturedGame();
    setGameList(data);
  }, []);

  useEffect(() => {
    getFeaturedGameList();
    setLoading(false);
  }, []);

  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br /> Games This Year
        </h2>
        {loading ? (
           <div className="d-flex flex-row flex-wrap overflow-setting justify-content-lg-between justify-content-center gap-lg-3 gap-4" data-aos="fade-up">
            <Skeleton count={1} height={270} width={205} />
            <Skeleton count={1} height={270} width={205} />
            <Skeleton count={1} height={270} width={205} />
            <Skeleton count={1} height={270} width={205} />
          </div>
        )
          : (
          <div
            className="d-flex flex-row flex-wrap overflow-setting justify-content-lg-between justify-content-center gap-lg-3 gap-4"
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
          </div>)
        }
      </div>
    </section>
  );
};

export default FeaturedGames;

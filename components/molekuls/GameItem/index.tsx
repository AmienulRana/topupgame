import Image from "next/image";
import Link from "next/link";
import CONFIG from "../../../config";
interface Props {
  title: string;
  category: string;
  thumbnail: string;
  id: string;
  status: string;
}
const GameItem = (props: Props) => {
  const { category, title, thumbnail, id, status } = props;

  return (
    <div
      className={[
        "featured-game-card position-relative",
        status === "Y" ? "voucher-active" : "voucher-empty",
      ].join(" ")}
    >
      {status === "N" ? (
        <div>
          <Image
            src={`${CONFIG.ROOT_API_IMAGE}/${thumbnail}`}
            width={205}
            height={270}
            alt="game item image"
          />
        </div>
      ) : (
        <Link href={`/detail/${id}`}>
          <a>
            <div className="blur-sharp">
              <Image
                src={`${CONFIG.ROOT_API_IMAGE}/${thumbnail}`}
                width={205}
                height={270}
                alt="game item image"
                className="thumbnail"
              />
            </div>
            <div className="cover position-absolute bottom-0 m-32">
              <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                <div className="game-icon mx-auto">
                  <Image
                    src="/icons/console.svg"
                    width={54}
                    height={36}
                    alt="console"
                  />
                </div>
                <div>
                  <p className="fw-semibold text-white text-xl m-0">{title} </p>
                  <p className="fw-light text-white m-0">{category}</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};

export default GameItem;

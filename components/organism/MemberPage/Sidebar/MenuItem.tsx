import Image from "next/image";
import Link from "next/link";
import cx from "classnames";

interface Props {
  active?: boolean;
  title: string;
  href: string;
  onClick?: () => void;
}
const MenuItem = (props: Props) => {
  const { active, title, href, onClick } = props;
  const classMenuItem = cx("item", "mb-30", { active });
  return (
    <div className={classMenuItem}>
      <Image src={`/icons/${title.toLowerCase()}.svg`} width={25} height={25} />
      <div className="item-title m-0">
        {onClick ? (
          <p
            onClick={onClick}
            className="ms-12 mb-0 text-lg text-decoration-none"
          >
            {title}
          </p>
        ) : (
          <Link href={href}>
            <a className="ms-12 text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuItem;

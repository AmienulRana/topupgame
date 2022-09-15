import Link from "next/link";
import Image from "next/image";

interface Props {
  width: number;
  height: number;
}
const LogoStore = (props: Props) => {
  const { width, height } = props;
  return (
    <Link href="/">
      <a>
        <Image
          src="/icons/logo.svg"
          width={width}
          height={height}
          alt="logo store gg"
        />
      </a>
    </Link>
  );
};

export default LogoStore;

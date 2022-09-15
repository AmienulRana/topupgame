import cx from "classnames";
interface Props {
  text: string;
  active: boolean;
  onClick: () => void;
}
const ButtonFilter = (props: Props) => {
  const { text, active, onClick } = props;
  const btnClass = cx({
    "btn btn-status rounded-pill text-sm me-3": true,
    "btn-active": active,
  });
  return (
    <button className={btnClass} onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default ButtonFilter;

type HackRPIButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  ariaLabel?: string;
};

export default function HackRPIButton(props: HackRPIButtonProps) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.ariaLabel}
      aria-pressed={props.active}
      className={`${props.className} ${
        props.active
          ? "bg-hackrpi-pink text-hackrpi-orange border-hackrpi-pink"
          : "border-hackrpi-pink text-white"
      } group hover:bg-hackrpi-pink hover:text-hackrpi-orange font-pix ring-hackrpi-pink relative flex border-2 pr-4 font-medium transition-colors duration-200`}
    >
      <div className="w-full p-2">{props.children}</div>
      <svg
        className={`group-hover:fill-hackrpi-orange absolute top-1 right-1 ${
          props.active ? "fill-hackrpi-orange" : "fill-hackrpi-pink"
        } transition-colors duration-200`}
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 11 11"
      >
        <path d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z" />
      </svg>
    </button>
  );
}

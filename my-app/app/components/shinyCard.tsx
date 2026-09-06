import "./shinyCard.css";

interface ShinyCardProps {
  image?: string;
}

export default function ShinyCard({ image }: ShinyCardProps) {
  return (
    <div className="shinyCard">
      Hello
      {image && <img src={image} alt="placeholder" />}
    </div>
  );
}

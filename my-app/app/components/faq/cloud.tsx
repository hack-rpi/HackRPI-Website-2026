
type CloudProps = {
  id: string;
  text: string[];
};

export default function Cloud({ id, text }: CloudProps) {
  return (
    <div id={id} className="m-5 relative h-90 w-[150vh]">
      <div className="absolute bottom-[30%] left-15 h-[65%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-22 left-70 h-[65%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-7 left-90 h-[85%] w-80 rounded-full bg-white" />
      <div className="absolute bottom-7 left-140 h-[80%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[40%] left-190 h-[60%] w-65 rounded-full bg-white" />
      <div className="absolute bottom-[20%] left-240 h-[60%] w-75 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-5 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-50 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[12%] left-190 h-[65%] w-70 rounded-full bg-white" />

      <div className="absolute inset-0 flex flex-col left-15 justify-center px-8 text-[110%] hover:text-[120%]">
        {text.map((line, index) => (
          <p key={index} className="p-1 max-w-[150vh] text-purple-700 text-nowrap hover:text-blue-800 hover:font-semibold">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

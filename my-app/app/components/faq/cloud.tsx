
type CloudProps = {
  id: string;
  text: string[];
};

export default function Cloud({ id, text }: CloudProps) {
  return (
    <div id={id} className="m-5 p-10 relative h-100 w-[135vh]">
      <div className="absolute bottom-[30%] left-10 h-[50%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-[30%] left-20 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-22 left-70 h-[60%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-14 left-90 h-[70%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-1/6 left-140 h-[70%] w-50 rounded-full bg-white" />
      <div className="absolute bottom-[40%] left-180 h-[55%] w-65 rounded-full bg-white" />
      <div className="absolute bottom-[20%] left-200 h-[55%] w-65 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-5 h-[55%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-1/12 left-50 h-[55%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-1/6 left-75 h-[55%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-[15%] left-170 h-[60%] w-52 rounded-full bg-white" />

      <div className="absolute inset-0 z-10 flex flex-col left-10 justify-center px-8">
        {text.map((line) => (
          <p key={line} className="p-1 max-w-[150vh] text-purple-700 text-nowrap hover:text-blue-800 hover:font-semibold">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

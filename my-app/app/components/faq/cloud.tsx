
type CloudProps = {
  id: string;
  text: string[];
};

export default function Cloud({ id, text }: CloudProps) {
  return (
    <div id={id} className="m-5 p-10 relative h-100 w-[120vh]">
      <div className="absolute bottom-1/3 left-6 h-[50%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-[30%] left-20 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-22 left-70 h-[60%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-14 left-90 h-[70%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-1/6 left-130 h-[70%] w-43 rounded-full bg-white" />
      <div className="absolute bottom-1/4 left-160 h-[55%] w-65 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-10 h-[55%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-1/12 left-50 h-[55%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-1/6 left-75 h-[55%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-[15%] left-150 h-[55%] w-52 rounded-full bg-white" />

      <div className="absolute inset-0 z-10 flex flex-col left-10 justify-center px-8">
        {text.map((line) => (
          <p key={line} className="max-w-[100vh] text-purple-700">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

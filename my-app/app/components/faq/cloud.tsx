type CloudProps = {
  id: string;
  content: React.ReactNode[];
};

export default function Cloud({ id, content }: CloudProps) {
  return (
    // NOTE: This is a nightmare for responsive design
    <div id={id} className="relative my-10 h-100 w-[150vh]">
      <div className="absolute bottom-[30%] left-15 h-[65%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-22 left-70 h-[65%] w-40 rounded-full bg-white" />
      <div className="absolute bottom-7 left-90 h-[85%] w-80 rounded-full bg-white" />
      <div className="absolute bottom-7 left-140 h-[80%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[40%] left-190 h-[60%] w-65 rounded-full bg-white" />
      <div className="absolute bottom-[20%] left-240 h-[60%] w-75 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-5 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[10%] left-50 h-[60%] w-70 rounded-full bg-white" />
      <div className="absolute bottom-[12%] left-190 h-[65%] w-70 rounded-full bg-white" />

      <div className="absolute inset-0 left-15 flex flex-col justify-center px-8 text-[110%] transition duration-300 hover:scale-105">
        {content.map((line, index) => (
          <p
            key={index}
            className="max-w-[150vh] p-1 text-center text-nowrap text-purple-700 transition hover:font-semibold hover:text-blue-800"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const WordSplitter = ({ text }: { text: string }) => {
  const words = text.split("");

  return (
    <div>
      {words.map((word, index) => (
        <span key={index}>
          {word}
          {index < words.length - 1 ? "" : " "}
        </span>
      ))}
    </div>
  );
};

export default WordSplitter;

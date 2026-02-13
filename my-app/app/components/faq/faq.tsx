
import QnA from "@/app/components/faq/qna";
import faqs from "@/public/faqData";


export default function FAQPage() {
  return (
    <div className="w-[full] h-auto bg-gray-500 p-5 flex flex-col bg-sky-500">
      <h1 className="w-[20vh] mx-5 p-2 text-2xl text-center bg-gradient-to-b from-white to-sky-200 text-sky-500">FAQ</h1>

      <section className="w-[125vh] p-5" aria-label="Frequently asked questions">
        {faqs.map((f) => (
					<QnA key={f.title} title={f.title} content={f.content} />
        ))}
      </section>
    </div>
  );
}
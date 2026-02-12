
import QnA from "@/app/components/faq/qna";
import faqs from "@/public/faqData";


export default function FAQPage() {
  return (
    <div className="w-full h-auto bg-gray-500 p-5 flex flex-col bg-sky-500">
      <h1 className="p-5 text-2xl">FAQ</h1>

      <section aria-label="Frequently asked questions">
        {faqs.map((f) => (
					<QnA key={f.title} title={f.title} content={f.content} />
        ))}
      </section>
    </div>
  );
}
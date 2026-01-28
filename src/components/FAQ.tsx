import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const faqsMobile = [
    { question: t.faq.questions.price, answer: t.faq.questions.priceAnswerMobile },
    { question: t.faq.questions.car, answer: t.faq.questions.carAnswerMobile },
    { question: t.faq.questions.private, answer: t.faq.questions.privateAnswerMobile },
    { question: t.faq.questions.children, answer: t.faq.questions.childrenAnswerMobile },
  ];

  const faqsDesktop = [
    { question: t.faq.questions.price, answer: t.faq.questions.priceAnswer },
    { question: t.faq.questions.car, answer: t.faq.questions.carAnswer },
    { question: t.faq.questions.location, answer: t.faq.questions.locationAnswer },
    { question: t.faq.questions.together, answer: t.faq.questions.togetherAnswer },
    { question: t.faq.questions.private, answer: t.faq.questions.privateAnswer },
    { question: t.faq.questions.children, answer: t.faq.questions.childrenAnswer },
    { question: t.faq.questions.pets, answer: t.faq.questions.petsAnswer },
    { question: t.faq.questions.events, answer: t.faq.questions.eventsAnswer },
  ];

  return (
    <section className="container-custom mt-16 md:mt-24 mb-0" id="faq">
      <div className="w-full h-px bg-line mb-10 md:mb-16" />
      
      {/* Mobile header */}
      <div className="text-center mb-8 md:hidden">
        <h2 className="heading-section mb-2">{t.faq.titleMobile}</h2>
        <p className="text-ink/50 text-sm">{t.faq.subtitleMobile}</p>
      </div>
      
      {/* Desktop header */}
      <div className="hidden md:block text-center mb-14">
        <div className="kicker">{t.faq.kicker}</div>
        <h2 className="heading-section mb-3">{t.faq.title}</h2>
        <p className="text-body max-w-md mx-auto">{t.faq.subtitle}</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Mobile FAQ */}
        <Accordion type="single" collapsible className="w-full md:hidden">
          {faqsMobile.map((faq, index) => (
            <AccordionItem key={index} value={`mobile-item-${index}`} className="border-b border-line/50">
              <AccordionTrigger className="text-left font-text text-ink/80 hover:text-ink hover:no-underline py-4 text-[15px] leading-relaxed">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-ink/50 text-[14px] leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Desktop FAQ */}
        <Accordion type="single" collapsible className="w-full hidden md:block">
          {faqsDesktop.map((faq, index) => (
            <AccordionItem key={index} value={`desktop-item-${index}`} className="border-b border-line/50">
              <AccordionTrigger className="text-left font-text text-ink/90 hover:text-ink hover:no-underline py-5 text-base leading-relaxed">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-ink/60 text-[15px] leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Mobile CTA */}
        <div className="md:hidden text-center mt-10 mb-2">
          <p className="text-ink/70 text-[15px] mb-1">{t.faq.ctaQuestion}</p>
          <p className="text-ink/50 text-sm">{t.faq.ctaAnswer}</p>
        </div>
      </div>
      
      <div className="w-full h-px bg-line mt-10 md:mt-16" />
    </section>
  );
};

export default FAQ;

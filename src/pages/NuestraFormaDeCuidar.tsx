import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NuestraFormaDeCuidar = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t.ourWayOfCaring.pageTitle}</title>
        <meta name="description" content={t.ourWayOfCaring.metaDescription} />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Back link */}
        <div className="pt-10 md:pt-12 pb-6 px-8 md:px-12">
          <div className="max-w-lg mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.ourWayOfCaring.backToHome}
            </Link>
          </div>
        </div>

        {/* Content */}
        <article className="px-8 md:px-12 pb-24 md:pb-32">
          <div className="max-w-lg mx-auto">
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-12 md:mb-16">
              {t.ourWayOfCaring.title}
            </h1>

            <div className="space-y-8 text-body leading-relaxed">
              <p>{t.ourWayOfCaring.p1}</p>
              <p>{t.ourWayOfCaring.p2}</p>
              <p>{t.ourWayOfCaring.p3}</p>
              <p>{t.ourWayOfCaring.p4}</p>
              <p>{t.ourWayOfCaring.p5}</p>
              <p>{t.ourWayOfCaring.p6}</p>
              <p>{t.ourWayOfCaring.p7}</p>
            </div>

            {/* Limpiaventura Section */}
            <div className="mt-16 md:mt-20 p-8 md:p-10 bg-muted/50 rounded-2xl">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
                {t.ourWayOfCaring.limpiaventuraTitle} <span className="font-bold">{t.ourWayOfCaring.limpiaventuraBrand}</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t.ourWayOfCaring.limpiaventuraTagline}
              </p>

              <div className="space-y-4 text-body leading-relaxed mb-8">
                <p>
                  {t.ourWayOfCaring.limpiaventuraInvite}
                </p>
                <p>
                  {t.ourWayOfCaring.limpiaventuraDesc}
                </p>
              </div>

              <a
                href="https://www.instagram.com/limpiaventura/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 text-center border border-foreground/20 rounded-full text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                {t.ourWayOfCaring.limpiaventuraCta}
              </a>

              <div className="mt-8 space-y-4 text-body leading-relaxed text-muted-foreground">
                <p>{t.ourWayOfCaring.limpiaventuraProud}</p>
                <p>{t.ourWayOfCaring.limpiaventuraDonation}</p>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default NuestraFormaDeCuidar;
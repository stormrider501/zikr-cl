import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import duahs from "@/data/duahs.json";
import { useT } from "@/lib/i18n";

export default function DuahDetail() {
  const { id } = useParams();
  const { t, lang } = useT();
  const d = duahs.find((x) => x.id === id);
  if (!d) return <div className="p-6">Not found</div>;
  return (
    <div className="px-4 pt-4 pb-8">
      <Link to="/library" className="inline-flex items-center text-sm text-muted mb-3">
        <ChevronLeft className="size-4" /> {t("library")}
      </Link>
      <h1 className={`font-display text-2xl mb-4 ${lang === "bn" ? "font-bangla" : ""}`}>
        {lang === "bn" ? d.title_bn : d.title_en}
      </h1>
      <p className="font-arabic text-3xl leading-loose text-right mb-4">{d.arabic}</p>
      <p className="text-sm italic text-muted mb-4">{d.translit}</p>
      <p className={`text-base mb-4 ${lang === "bn" ? "font-bangla" : ""}`}>
        {lang === "bn" ? d.bn : d.en}
      </p>
      <p className="text-xs text-muted">— {d.reference}</p>
    </div>
  );
}

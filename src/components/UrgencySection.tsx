import { useEffect, useState } from "react";
import { Users, TrendingUp } from "lucide-react";

const recentBuyers = [
  "Carlos de São Paulo",
  "Fernanda do Rio de Janeiro",
  "João de Belo Horizonte",
  "Ana de Curitiba",
  "Ricardo de Porto Alegre",
  "Juliana de Salvador",
  "Pedro de Brasília",
  "Mariana de Fortaleza",
  "Lucas de Recife",
  "Camila de Goiânia",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const UrgencySection = () => {
  const [salesToday, setSalesToday] = useState(47);
  const [recentBuyer, setRecentBuyer] = useState(recentBuyers[0]);
  const [showBuyer, setShowBuyer] = useState(false);

  // Simulate live purchases
  useEffect(() => {
    const showNext = () => {
      setRecentBuyer(getRandomItem(recentBuyers));
      setShowBuyer(true);
      setTimeout(() => setShowBuyer(false), 3500);

      if (Math.random() > 0.4) {
        setSalesToday((prev) => prev + 1);
      }
    };

    const timeout = setTimeout(showNext, 3000);
    const interval = setInterval(showNext, 9000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  return (
    <section className="py-6 bg-background border-y border-border/50">
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-success/5 border border-success/20 rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-success">Vendas hoje</span>
            <span className="font-display font-bold text-2xl text-foreground ml-1">{salesToday}</span>
            <span className="text-xs text-muted-foreground">pedidos confirmados</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-border" />

          {/* Live buyer notification */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
            <div
              className={`transition-all duration-500 ${showBuyer ? "opacity-100 translate-y-0" : "opacity-0"}`}
            >
              <p className="text-xs text-muted-foreground truncate">
                <span className="text-foreground font-semibold">{recentBuyer}</span> acaba de comprar
              </p>
            </div>
            {!showBuyer && (
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">+5.000 clientes satisfeitos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;

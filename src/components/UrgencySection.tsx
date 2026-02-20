import { useEffect, useState } from "react";
import { Flame, Users, Clock, TrendingUp } from "lucide-react";

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
  const [stock, setStock] = useState(23);
  const [salesToday, setSalesToday] = useState(47);
  const [recentBuyer, setRecentBuyer] = useState(recentBuyers[0]);
  const [showBuyer, setShowBuyer] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 38, seconds: 12 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live purchases
  useEffect(() => {
    const showNext = () => {
      setRecentBuyer(getRandomItem(recentBuyers));
      setShowBuyer(true);
      setTimeout(() => setShowBuyer(false), 3500);

      // Occasionally increase sales count
      if (Math.random() > 0.4) {
        setSalesToday((prev) => prev + 1);
      }
    };

    const timeout = setTimeout(showNext, 3000);
    const interval = setInterval(showNext, 9000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const stockPct = Math.min(100, Math.round((stock / 50) * 100));

  return (
    <section className="py-6 bg-background border-y border-border/50">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Countdown */}
          <div className="flex flex-col items-center justify-center bg-destructive/5 border border-destructive/20 rounded-2xl p-4 text-center">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-destructive" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">Oferta expira em</span>
            </div>
            <div className="flex items-center gap-1 font-display font-bold text-2xl tabular-nums text-foreground">
              <span className="bg-foreground text-background rounded-lg px-2 py-1">{pad(timeLeft.hours)}</span>
              <span className="text-muted-foreground">:</span>
              <span className="bg-foreground text-background rounded-lg px-2 py-1">{pad(timeLeft.minutes)}</span>
              <span className="text-muted-foreground">:</span>
              <span className="bg-foreground text-background rounded-lg px-2 py-1">{pad(timeLeft.seconds)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">Horas · Minutos · Segundos</p>
          </div>

          {/* Stock bar */}
          <div className="flex flex-col justify-center bg-warning/5 border border-warning/20 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="w-3.5 h-3.5 text-warning" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-warning">Estoque crítico</span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="font-display font-bold text-3xl text-foreground">{stock}</span>
              <span className="text-xs text-muted-foreground mb-1">unidades restantes</span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-warning rounded-full transition-all duration-1000"
                style={{ width: `${stockPct}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">{100 - stockPct}% do lote já vendido</p>
          </div>

          {/* Sales today */}
          <div className="flex flex-col justify-center bg-success/5 border border-success/20 rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-success" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-success">Vendas hoje</span>
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-display font-bold text-3xl text-foreground">{salesToday}</span>
              <span className="text-xs text-muted-foreground mb-1">pedidos confirmados</span>
            </div>

            {/* Live buyer notification */}
            <div
              className={`flex items-center gap-2 transition-all duration-500 ${showBuyer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shrink-0" />
              <p className="text-[10px] text-muted-foreground truncate">
                <span className="text-foreground font-semibold">{recentBuyer}</span> acaba de comprar
              </p>
            </div>
            {!showBuyer && (
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-muted-foreground shrink-0" />
                <p className="text-[10px] text-muted-foreground">+5.000 clientes satisfeitos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;

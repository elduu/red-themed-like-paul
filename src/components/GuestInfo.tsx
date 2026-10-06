import { useState } from "react";
import { Landmark, Smartphone, Gift, Copy, Check, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Account = {
  id: string;
  name: string;
  kind: "bank" | "mobile";
  accountName: string;
  accountNumber: string;
  note?: string;
};

// Replace these placeholders with your real details
const accounts: Account[] = [
  {
    id: "cbe",
    name: "Commercial Bank of Ethiopia",
    kind: "bank",
    accountName: "Groom Name & Bride Name",
    accountNumber: "1000123456789",
  },
  {
    id: "awash",
    name: "Awash Bank",
    kind: "bank",
    accountName: "Groom Name & Bride Name",
    accountNumber: "01320123456700",
  },
  {
    id: "abyssinia",
    name: "Bank of Abyssinia",
    kind: "bank",
    accountName: "Groom Name & Bride Name",
    accountNumber: "12345678",
  },
  {
    id: "telebirr",
    name: "telebirr",
    kind: "mobile",
    accountName: "Groom Name",
    accountNumber: "0911 23 45 67",
    note: "Send using the phone number above.",
  },
];

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
    } catch {
      const el = document.createElement("textarea");
      el.value = value.replace(/\s/g, "");
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-4 py-2 text-xs font-body text-foreground transition-colors hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      {copied ? <Check size={14} className="text-secondary" /> : <Copy size={14} className="text-secondary" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy number"}</span>
    </button>
  );
};

const AccountRow = ({
  account,
  index,
  open,
  onToggle,
}: {
  account: Account;
  index: number;
  open: boolean;
  onToggle: () => void;
}) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const Icon = account.kind === "mobile" ? Smartphone : Landmark;
  const panelId = `gift-panel-${account.id}`;

  return (
    <div
      ref={ref}
      className={`card-wedding overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/40">
          <Icon size={20} className="text-secondary" />
        </span>
        <span className="flex-1">
          <span className="block font-heading text-lg text-foreground">{account.name}</span>
          <span className="block font-body text-xs text-muted-foreground">
            {account.kind === "mobile" ? "Mobile money" : "Bank transfer"}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={panelId}
        role="region"
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-5 mb-5 rounded-lg border border-secondary/30 bg-background/60 p-5 text-center">
            <p className="font-body text-xs text-muted-foreground">
              {account.kind === "mobile" ? "Phone number" : "Account number"}
            </p>
            <p className="mt-1 mb-4 select-all font-heading text-2xl tracking-wider text-foreground break-all">
              {account.accountNumber}
            </p>
            <div className="mx-auto mb-4 h-px w-12 bg-secondary/60" />
            <p className="font-body text-xs text-muted-foreground">Account name</p>
            <p className="mb-5 font-body text-sm text-foreground">{account.accountName}</p>
            <CopyButton value={account.accountNumber} />
            {account.note && (
              <p className="mt-4 font-body text-xs text-muted-foreground">{account.note}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Gifts = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-script text-3xl text-secondary">With Love</span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">Send a Gift</h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-4" />
          <div className="mt-6 flex justify-center">
            <Gift size={22} className="text-secondary" />
          </div>
          <p className="mt-4 font-body text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Your presence is the greatest gift. If you would like to give something more, choose an
            account below.
          </p>
        </div>

        <div className="space-y-4">
          {accounts.map((account, i) => (
            <AccountRow
              key={account.id}
              account={account}
              index={i}
              open={openId === account.id}
              onToggle={() => setOpenId(openId === account.id ? null : account.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gifts;
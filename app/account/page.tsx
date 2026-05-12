import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { AccountView } from "./_AccountView";

export const metadata = {
  title: "Account · Epics",
  description: "Sign in to see your specimen ledger.",
};

export default function AccountPage() {
  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />
      <AccountView />
      <Footer />
    </main>
  );
}

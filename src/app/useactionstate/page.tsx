import StatefulForm from "../../components/stateactionexample";
import Link from "next/link";

export default function UseActionStatePage() {
  return (
    <div className="container mx-auto">
      <Link href="/" className="text-hyperlink">🔙 Back to home</Link>
      <h1 className="text-3xl font-bold">useActionState hook example</h1>
      <StatefulForm />
    </div>
  );
}

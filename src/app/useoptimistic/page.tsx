import Thread from "../../components/thread";
import Link from "next/link";

export default function UseOptomisticPage() {
  return (
    <div className="container mx-auto">
      <Link href="/" className="text-hyperlink">🔙 Back to home</Link>
      <h1 className="text-3xl font-bold">useOptimistic Hook Example</h1>
      <Thread />
    </div>
  );
}

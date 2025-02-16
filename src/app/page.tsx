import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto">
      <p>This application is to demonstrate some of the new features available in React 19.</p>
      <p><Link href="rscs" className="text-hyperlink">React Server Components</Link></p>
      <p><Link href="classic" className="text-hyperlink">Classic Counter</Link></p>
      <p><Link href="action" className="text-hyperlink">Action and useTransition</Link></p>
      <p><Link href="useoptimistic" className="text-hyperlink">useOptimistic</Link></p>
      <p><Link href="useactionstate" className="text-hyperlink">useActionState</Link></p>
      <p><Link href="useformstatus" className="text-hyperlink">useFormStatus</Link></p>
      <p><Link href="metadata" className="text-hyperlink">Metadata example</Link></p>
      <p><Link href="weatherform" className="text-hyperlink">Weather Form</Link></p>
    </div>
  );
}

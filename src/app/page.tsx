import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">JaxNode React 19 examples</h1>
      <p>This application is to demonstrate some of the new features available in React 19.</p>
      <p><Link href="rscs" className="text-hyperlink">React Server Components</Link></p>
      <p><Link href="action" className="text-hyperlink">Actions</Link></p>
      <p><Link href="useoptomistic" className="text-hyperlink">useOptomistic</Link></p>
      <p><Link href="useactionstate" className="text-hyperlink">useActionState</Link></p>
      <p><Link href="useformstatus" className="text-hyperlink">useFormStatus</Link></p>
    </div>
  );
}

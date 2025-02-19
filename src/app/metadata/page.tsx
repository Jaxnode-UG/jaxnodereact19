import Link from 'next/link';

export default function MetadataPage() {
  return (
    <div className="container mx-auto">
      <Link href="/" className="text-hyperlink">🔙 Back to home</Link>
      <h1 className="text-3xl font-bold">Metadata example</h1>
      <title>Metadata example</title>
      <link rel="icon" type="image/png" href="./JaxNodeIcon.png"></link>
    </div>
  );
}
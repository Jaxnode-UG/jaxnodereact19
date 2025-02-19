import ActionFormExample from '../../components/actionformexample';
import Link from 'next/link';

export default function Action() {
  return (
    <div className="container mx-auto">
      <Link href="/" className="text-hyperlink">🔙 Back to home</Link>
      <h1 className="text-3xl font-bold">Actions example</h1>
      
      <ActionFormExample />
    </div>
  );
}
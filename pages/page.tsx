import Link from 'next/link';
import SidebarButton from '../components/SidebarButton';
import { File } from 'lucide-react';

const Page = () => {
  return (
    <nav>
      <Div className="flex items-start gap-4 p-4 hover:bg-[#F7931A] accent/50 cursor-pointer transition-colors opacity-50"
      >
        <SidebarButton icon={File} label="Documents" badge="Read Now" />
      </div>
    </nav>
  );
};

export default Page;
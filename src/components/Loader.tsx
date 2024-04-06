import { Html } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <Html>
      <div className="item-center absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white">
        <div className='flex flex-col items-center'>
          <Loader2 size={32} color="#fff" className="animate-spin" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    </Html>
  );
};

export default Loader;

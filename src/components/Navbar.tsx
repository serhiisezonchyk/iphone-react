import { FC } from 'react';
import { navLists } from '../constants';
import { appleImg, bagImg, searchImg } from '../utils';

const Navbar: FC = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-5 sm:px-10">
      <nav className="screen-max-width flex w-full">
        <img src={appleImg} alt="Apple" height={18} width={14} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="cursor-pointer px-5 text-sm text-gray transition-all hover:text-white">
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
          <img src={searchImg} alt="Search" width={18} height={18} />
          <img src={bagImg} alt="Search" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

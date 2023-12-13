import { Slash, BadgeInfo, Settings } from 'lucide-react'
import LateralModal from '../LateralModal';

function Header() {
  return <header>
    <h1>휴먼스 오브 서울 <Slash />Humans of seoul </h1>

    <nav>
      <button >
        <BadgeInfo />
      </button>
      <button >
        <Settings />
      </button>
    </nav>
    <LateralModal />
  </header>;
}

export default Header;

'use client';

import CurrentSelections from './CurrentSelctions';
import ClearSelectionsButton from './ClearSelctionsButton';

export default function SelectionsBar() {
  return (
    <div className="sticky top-[56px] z-20 bg-gray-50">
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <CurrentSelections />
        <ClearSelectionsButton />
      </div>
    </div>
  );
}

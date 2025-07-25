'use client';

import { useParams } from 'next/navigation';

export default function CreatePrescriptionPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>CreatePrescriptionPage</h1>
      <p>{id}</p>
    </div>
  );
}

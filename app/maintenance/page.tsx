import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="relative w-full max-w-2xl mx-auto">
          <Image
            src="/maintenance.jpg"
            alt="Site en maintenance"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Site en maintenance
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Nous effectuons actuellement des améliorations sur notre plateforme.
          </p>
          <p className="text-md text-gray-500">
            Merci de votre patience, nous serons bientôt de retour !
          </p>
        </div>
      </div>
    </div>
  );
}

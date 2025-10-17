export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Refund Policy</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Registration fees, once paid, are non-refundable except in cases of event cancellation
          by the organizers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If the event is postponed, your registration will remain valid for the rescheduled date.
        </p>
      </div>
    </div>
  );
}

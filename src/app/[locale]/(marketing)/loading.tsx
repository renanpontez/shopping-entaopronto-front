export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

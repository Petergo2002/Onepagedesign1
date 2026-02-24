import { getAppMode } from '@/lib/template/profile'

export default function MockupModeBanner() {
  if (getAppMode() !== 'mockup') return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-100 backdrop-blur">
      Mockup Preview Mode
    </div>
  )
}

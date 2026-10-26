import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  MessageCircle, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Pill,
  Sparkles
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title = 'MediSafe AI – Drug Interaction Checker',
  text = 'Check potential drug-drug interactions and medication safety on MediSafe AI (B.Pharm Academic Project):',
  url
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://medisafe-ai.edu');
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(`${title}\n${text}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        });
        onClose();
      } catch (err) {
        // User cancelled or not supported
      }
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      link: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'X (Twitter)',
      icon: (props: any) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: 'bg-black hover:bg-slate-800 text-white',
      link: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-sky-700 hover:bg-sky-800 text-white',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-rose-500 hover:bg-rose-600 text-white',
      link: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  // Simple clean SVG QR Code generator (fallback visual QR preview)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      {/* Modal card */}
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient accent */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-2xs">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Share MediSafe AI
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Help pharmacy students & patients explore safe medicine usage
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Copy Link Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Website URL
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-transparent px-3 text-xs font-mono text-slate-700 focus:outline-none truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Channels */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Share to Messaging & Social
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {shareChannels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={idx}
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl ${channel.color} transition-all transform hover:scale-105 active:scale-95 shadow-xs`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-[11px] font-bold">{channel.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* QR Code Toggle for Presentations & College Demos */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <QrCode className="w-4 h-4 text-teal-600" />
              <span>{showQr ? 'Hide Presentation QR Code' : 'Show Presentation QR Code (Scan to Open)'}</span>
            </button>

            {showQr && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-2 animate-fadeIn">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                  <img
                    src={qrUrl}
                    alt="MediSafe AI QR Code"
                    className="w-36 h-36 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Scan with your mobile camera to open MediSafe AI instantly.
                </p>
              </div>
            )}
          </div>

          {/* Native device share if supported */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via Device Menu</span>
            </button>
          )}

          {/* B.Pharm academic note */}
          <div className="text-[11px] text-center text-slate-400 font-mono">
            MediSafe AI • B.Pharm Academic Capstone Project
          </div>
        </div>
      </div>
    </div>
  );
};

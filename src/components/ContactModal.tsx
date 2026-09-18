import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'skin-consultation',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        id="contact-backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-[#160F0AE6]/60 backdrop-blur-xs transition-opacity"
      />

      <div
        id="contact-modal-container"
        className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#E9DFD3] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#3D2C1E] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE1D5] text-[#705642] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>Botanical Skin Concierge</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2A1E16] mb-2">
            Connect with Our Herbologists
          </h3>
          <p className="text-xs sm:text-sm text-[#6C5C50] mb-6 font-light">
            Need guidance matching your unique skin barrier to our botanical formulas? Our certified holistic skincare advisors are here to assist.
          </p>

          {submitted ? (
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#E5DAD0] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EFF5EF] text-[#5A735A] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif-luxury text-xl font-bold text-[#2A1E16]">
                Message Received with Care
              </h4>
              <p className="text-xs text-[#6F6054]">
                A dedicated skincare specialist will reply within 24 hours with personalized botanical recommendations.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3D2C1E] mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5DAD0] text-xs sm:text-sm text-[#2A1E16] focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3D2C1E] mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5DAD0] text-xs sm:text-sm text-[#2A1E16] focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2C1E] mb-1">
                  Nature of Consultation
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5DAD0] text-xs sm:text-sm text-[#2A1E16] focus:outline-none focus:border-[#8C6239]"
                >
                  <option value="skin-consultation">Personal Skin Consultation & Routine Builder</option>
                  <option value="order-inquiry">Order & Shipping Status</option>
                  <option value="ingredients">Botanical Sourcing & Amber Glass Packaging</option>
                  <option value="press">Press, Wholesale & Partnerships</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3D2C1E] mb-1">
                  Your Question or Skin Concerns
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your current routine, skin type (dry, oily, sensitive), and what you hope to achieve..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5DAD0] text-xs sm:text-sm text-[#2A1E16] focus:outline-none focus:border-[#8C6239]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#8C6239] hover:bg-[#724D2A] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send to Botanical Concierge</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#EAE0D3] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#706053]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>care@glowandgrow.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>+1 (800) 456-GLOW</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Provence & California</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { X, Check, Clock, Wrench, CalendarCheck } from "lucide-react";

const BOOKING_STEPS = ["Pending", "Confirmed", "In Progress", "Completed"];

export default function BookingDetailModal({ booking, onClose, onCancel }) {
  const currentStep = BOOKING_STEPS.indexOf(booking.status);

  const stepIcons = [Clock, Check, Wrench, CalendarCheck];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: "8px" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 bg-[#0F2436]"
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          <div>
            <h3 className="font-display font-bold text-white">
              Booking #{booking.id}
            </h3>

            <p className="text-xs text-white/50 mt-0.5">{booking.date}</p>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="mb-7">
            <p className="text-xs font-display tracking-widest text-[#5E7386] uppercase mb-4">
              Service Status
            </p>

            <div className="relative">
              <div className="absolute top-4 left-4 right-4 h-px bg-[#F0F5FA]" />

              <div
                className="absolute top-4 left-4 h-px bg-[#0F2436] transition-all"
                style={{
                  width:
                    currentStep > 0
                      ? `${(currentStep / (BOOKING_STEPS.length - 1)) * 88}%`
                      : "0%",
                }}
              />

              <div className="relative flex justify-between">
                {BOOKING_STEPS.map((s, i) => {
                  const done = i <= currentStep;
                  const StepIcon = stepIcons[i] || Check;

                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center z-10 transition-colors ${
                          done
                            ? "bg-[#0F2436] text-white"
                            : "bg-[#F0F5FA] text-[#5E7386]"
                        }`}
                        style={{ borderRadius: "50%" }}
                      >
                        <StepIcon size={14} />
                      </div>

                      <p
                        className={`text-[10px] font-display tracking-wide text-center max-w-[60px] ${
                          done ? "text-[#0F2436]" : "text-[#5E7386]"
                        }`}
                      >
                        {s}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-5">
            {[
              { label: "Service", value: booking.service },
              { label: "Date Booked", value: booking.date },
              {
                label: "Price",
                value: booking.price ?? "To be determined after assessment",
              },
              { label: "Notes", value: booking.notes },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-start py-2.5 border-b border-[#F0F5FA] last:border-0"
              >
                <span className="text-xs font-display tracking-widest text-[#5E7386] uppercase flex-shrink-0">
                  {row.label}
                </span>

                <span
                  className={`text-sm font-sans max-w-[60%] text-right ${
                    row.label === "Price" && !booking.price
                      ? "text-[#5E7386] italic"
                      : "text-[#0F2436]"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {booking.status === "Pending" && (
            <button
              onClick={onCancel}
              className="w-full py-3 border-2 border-[#E63946] text-[#E63946] font-display tracking-widest text-sm uppercase hover:bg-[#E63946] hover:text-white transition-all"
              style={{ borderRadius: "4px" }}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

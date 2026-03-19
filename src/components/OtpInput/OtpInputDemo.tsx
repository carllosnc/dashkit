import { useState } from 'react';
import { OtpInput } from './OtpInput';
import { Button } from '../Button/Button';
import { FiCheckCircle } from 'react-icons/fi';

export function OtpInputDemo() {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsComplete(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg p-8 rounded-2xl border border-base-200 dark:border-base-800 bg-white dark:bg-base-900 shadow-xl overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-base-900 dark:text-white mb-2">Two-Step Verification</h3>
        <p className="text-sm text-base-500 dark:text-base-400">
          Enter the 6-digit code sent to your device.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <OtpInput 
          length={6} 
          value={otp} 
          onChange={setOtp} 
          disabled={isVerifying || isComplete}
        />

        {isComplete ? (
          <div className="flex items-center gap-2 text-emerald-500 font-semibold animate-in fade-in zoom-in duration-300">
            <FiCheckCircle className="size-5" />
            Verification successful
          </div>
        ) : (
          <Button 
            variant="filled" 
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            loading={isVerifying}
          >
            Verify Code
          </Button>
        )}

        {!isComplete && (
          <button className="text-sm font-medium text-base-400 hover:text-base-900 dark:hover:text-white transition-colors">
            Didn't receive the code? <span className="underline decoration-dotted">Resend</span>
          </button>
        )}
      </div>
    </div>
  );
}


import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="text-center py-12 px-4 relative font-sora">
      <div className="w-full">
        <div className="mb-6 inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full">
          <Sparkles className="h-8 w-8 text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

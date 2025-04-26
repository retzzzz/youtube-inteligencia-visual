
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface YoutubeAnalyzerFormProps {
  onAnalyzeVideo: (url: string) => void;
  isLoading: boolean;
}

const YoutubeAnalyzerForm = ({ onAnalyzeVideo, isLoading }: YoutubeAnalyzerFormProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const { youtubeApiKey } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      onAnalyzeVideo(videoUrl.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Cole o link do vídeo do YouTube aqui (ex: https://youtu.be/aBcDeFgH123)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="flex-grow"
        disabled={isLoading || !youtubeApiKey}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !videoUrl.trim() || !youtubeApiKey}
        className="min-w-[120px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analisando...
          </>
        ) : (
          "Analisar"
        )}
      </Button>
    </form>
  );
};

export default YoutubeAnalyzerForm;

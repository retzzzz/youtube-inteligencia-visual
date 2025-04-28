
import React from "react";
import Header from "@/components/Header";
import ScriptInput from "@/components/ScriptInput";
import ScriptConfig from "@/components/ScriptConfig";
import ScriptOutput from "@/components/ScriptOutput";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useScriptGenerator } from "@/hooks/useScriptGenerator";
import ScriptGeneratorIntro from "@/components/script-generator/ScriptGeneratorIntro";
import ScriptGeneratorTabs from "@/components/script-generator/ScriptGeneratorTabs";
import Footer from "@/components/Footer";

const ScriptGenerator = () => {
  const {
    scriptText,
    scriptStats,
    scriptConfig,
    processedScript,
    currentStep,
    setCurrentStep,
    handleScriptInput,
    handleConfigSubmit
  } = useScriptGenerator();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <ScriptGeneratorIntro />
        
        <Card className="p-6 w-full">
          <Tabs 
            value={currentStep} 
            onValueChange={(value) => setCurrentStep(value as "input" | "config" | "output")}
            className="w-full"
          >
            <ScriptGeneratorTabs 
              currentStep={currentStep}
              hasScriptText={!!scriptText}
              hasProcessedScript={!!processedScript}
            />
            
            <TabsContent value="input">
              <ScriptInput onScriptSubmit={handleScriptInput} />
            </TabsContent>
            
            <TabsContent value="config">
              {scriptStats && (
                <ScriptConfig 
                  scriptStats={scriptStats} 
                  onSubmit={handleConfigSubmit}
                  initialConfig={scriptConfig}
                />
              )}
            </TabsContent>
            
            <TabsContent value="output">
              {processedScript && (
                <ScriptOutput script={processedScript} />
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScriptGenerator;

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  Target, 
  Rocket, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Youtube,
  Users,
  TrendingUp,
  FileText,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TrendingTopicsSection from '@/components/TrendingTopicsSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0E122D] to-[#1A1F40] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(29,58,180,0.3),rgba(0,0,0,0))]" />
        
        <div className="container mx-auto px-4 py-10 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/30 mb-6">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                <span className="text-sm text-indigo-300">A revolução para criadores de conteúdo</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                Descubra, Analise e Cresça no YouTube
              </h1>
              
              <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                Maximize seu potencial no YouTube com análises avançadas de nichos, criação de roteiros otimizados e geração de títulos de alto desempenho.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8">
                  <Link to="/login" className="flex items-center gap-2">
                    Começar Agora <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Link to="/tutorial" className="flex items-center gap-2">
                    Como Funciona
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <TrendingTopicsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Ferramentas Poderosas para Seu Sucesso
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              O YTAnalyzerPro reúne um conjunto completo de ferramentas projetadas para impulsionar sua presença no YouTube e descobrir nichos lucrativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Youtube className="h-10 w-10 text-white" />}
              color="from-red-500/90 to-rose-600"
              title="Analisador de Vídeos"
              description="Extraia insights valiosos de vídeos populares, entenda padrões de engajamento e identifique oportunidades de conteúdo."
              link="/video-analyzer"
            />
            
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-white" />}
              color="from-blue-500 to-indigo-600"
              title="Gerador de Títulos"
              description="Crie títulos otimizados com alta taxa de cliques usando nossa tecnologia baseada em análise de milhares de vídeos de sucesso."
              link="/title-generator"
            />
            
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-white" />}
              color="from-purple-500 to-violet-600"
              title="Gerador de Roteiros"
              description="Desenvolva roteiros estruturados e persuasivos que mantêm sua audiência engajada do início ao fim."
              link="/script-generator"
            />
            
            <FeatureCard
              icon={<Target className="h-10 w-10 text-white" />}
              color="from-emerald-500 to-green-600"
              title="Validador de Subnichos"
              description="Encontre e valide subnichos lucrativos no YouTube com análises precisas de tendências, concorrência e potencial de monetização."
              link="/subnicho-validator"
            />
            
            <FeatureCard
              icon={<Compass className="h-10 w-10 text-white" />}
              color="from-amber-500 to-orange-600"
              title="Analisador de Micro-Subnichos"
              description="Identifique micro-nichos inexplorados com alto potencial e baixa concorrência para dominar segmentos específicos."
              link="/micro-subnicho-analyzer"
            />
            
            <FeatureCard
              icon={<Search className="h-10 w-10 text-white" />}
              color="from-cyan-500 to-blue-600"
              title="Pesquisa Avançada"
              description="Realize pesquisas detalhadas com métricas avançadas para encontrar as melhores oportunidades de conteúdo."
              link="/search"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-[#1A1F40] to-[#0E122D] relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Como o YTAnalyzerPro Transforma Seu Canal
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              Economize tempo, tome decisões baseadas em dados e impulsione seus resultados com nossas ferramentas especializadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Clock />}
              title="Economize Tempo"
              description="Reduza drasticamente o tempo gasto em pesquisa, análise e planejamento de conteúdo com nossas ferramentas automatizadas."
            />
            
            <BenefitCard 
              icon={<Target />}
              title="Precisão nas Decisões"
              description="Base suas decisões em dados concretos e análises precisas, não em palpites, aumentando suas chances de sucesso."
            />
            
            <BenefitCard 
              icon={<Rocket />}
              title="Crescimento Acelerado"
              description="Identifique oportunidades que outros criadores ignoram e posicione-se à frente da concorrência."
            />
            
            <BenefitCard 
              icon={<TrendingUp />}
              title="Conteúdo Otimizado"
              description="Crie conteúdo que atende exatamente o que seu público está buscando, aumentando engajamento e retenção."
            />
            
            <BenefitCard 
              icon={<Users />}
              title="Entenda Sua Audiência"
              description="Obtenha insights profundos sobre sua audiência potencial para criar conteúdo que realmente ressoa com eles."
            />
            
            <BenefitCard 
              icon={<Award />}
              title="Resultados Mensuráveis"
              description="Acompanhe seu progresso com métricas claras e veja o impacto real das suas estratégias de conteúdo."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Como Funciona
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              Uma metodologia comprovada para descobrir nichos lucrativos e criar conteúdo de alto desempenho.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Pesquise e Analise"
              description="Encontre nichos promissores com alta demanda e baixa concorrência usando nossas ferramentas de análise."
            />
            
            <StepCard
              number="2"
              title="Valide e Otimize"
              description="Valide o potencial do nicho escolhido e desenvolva uma estratégia de conteúdo otimizada para máximos resultados."
            />
            
            <StepCard
              number="3"
              title="Crie e Cresça"
              description="Produza conteúdo de alto desempenho com nossos geradores de roteiros e títulos, e observe seu canal crescer."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/80 to-blue-900/80 rounded-2xl p-8 md:p-12 backdrop-blur-lg border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Comece Sua Jornada para o Sucesso no YouTube
                </h2>
                <p className="text-blue-100/80 mb-6">
                  Entre para milhares de criadores que estão transformando seus canais com o YTAnalyzerPro. Descubra nichos inexplorados, crie conteúdo otimizado e acelere seu crescimento.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8">
                    <Link to="/login" className="flex items-center gap-2">
                      Começar Agora <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full p-1 shadow-lg animate-pulse">
                  <div className="w-full h-full rounded-full bg-[#0E122D] flex items-center justify-center">
                    <Youtube className="h-16 w-16 md:h-20 md:w-20 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Simulated */}
      <section className="py-20 bg-gradient-to-b from-[#0E122D] to-[#1A1F40] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-blue-100/70 max-w-3xl mx-auto">
              Depoimentos de criadores que transformaram seus canais com o YTAnalyzerPro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              name="Carlos Silva"
              role="Tech YouTuber"
              image="https://i.pravatar.cc/150?img=1"
              quote="Consegui encontrar um micro-nicho que ninguém estava explorando. Em 3 meses, meu canal saiu de 500 para 15.000 inscritos!"
            />
            
            <TestimonialCard
              name="Marina Costa"
              role="Criadora de Lifestyle"
              image="https://i.pravatar.cc/150?img=5"
              quote="O gerador de títulos revolucionou meu canal. Minha taxa de cliques subiu mais de 200% em poucas semanas."
            />
            
            <TestimonialCard
              name="Pedro Mendes"
              role="Especialista em Marketing"
              image="https://i.pravatar.cc/150?img=3"
              quote="Como consultor, recomendo o YTAnalyzerPro para todos os meus clientes. É simplesmente o melhor pacote de ferramentas para Youtube."
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-b from-[#1A1F40] to-[#0E122D] relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Pronto para revolucionar seu canal?
          </h2>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8">
            <Link to="/login" className="flex items-center gap-2">
              Comece Hoje Mesmo <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-blue-100/50 mt-6">
            Junte-se a milhares de criadores de conteúdo que já estão transformando seus resultados.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-[#0A0D1E] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold tracking-tight flex items-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg mr-2">
                <Youtube className="h-5 w-5 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                YTAnalyzerPro
              </span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/tutorial" className="text-blue-100/70 hover:text-white transition-colors">
                Tutorial
              </Link>
              <Link to="/faq" className="text-blue-100/70 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link to="/important-links" className="text-blue-100/70 hover:text-white transition-colors">
                Links Importantes
              </Link>
            </div>
            
            <div className="text-blue-100/50 text-sm">
              © {new Date().getFullYear()} YTAnalyzerPro. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  link: string;
}

const FeatureCard = ({ icon, color, title, description, link }: FeatureCardProps) => {
  return (
    <Link to={link} className="group">
      <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className={`bg-gradient-to-br ${color} rounded-xl p-4 w-fit mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-blue-100/70 mb-4">{description}</p>
          <div className="flex justify-end">
            <span className="text-sm font-medium text-blue-300/80 flex items-center gap-1 group-hover:text-blue-200 transition-colors">
              Explorar <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Benefit Card Component
interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 hover:bg-white/10">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full mb-4 shadow-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-blue-100/70">{description}</p>
      </CardContent>
    </Card>
  );
};

// Step Card Component
interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="relative">
      <div className="hidden md:block absolute top-1/2 left-full h-0.5 w-16 bg-gradient-to-r from-blue-500 to-transparent -translate-y-1/2 z-0 last:hidden"></div>
      
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 hover:bg-white/10 relative z-10">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 h-12 w-12 flex items-center justify-center rounded-full text-xl font-bold mb-4">
              {number}
            </div>
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <p className="text-blue-100/70">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ quote, name, role, image }: TestimonialCardProps) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="text-blue-100/80 italic mb-4">"{quote}"</div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-500">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-blue-100/60">{role}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPage;

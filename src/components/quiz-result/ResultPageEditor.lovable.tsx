
import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Pencil, Check, ChevronDown, ChevronUp, Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { StyleResult } from '@/types/quiz';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

interface ResultPageEditorProps {
  primaryStyle?: StyleResult;
  secondaryStyles?: StyleResult[];
}

const ResultPageEditor: React.FC<ResultPageEditorProps> = ({ primaryStyle: propsPrimaryStyle, secondaryStyles: propsSecondaryStyles }) => {
  const { primaryStyle: quizPrimaryStyle, secondaryStyles: quizSecondaryStyles } = useQuiz();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { globalStyles } = useGlobalStyles();
  const navigate = useNavigate();

  const primaryStyle = propsPrimaryStyle || quizPrimaryStyle;
  const secondaryStyles = propsSecondaryStyles || quizSecondaryStyles;

  const { resultPageConfig, updateSection, saveConfig, loading } = useResultPageConfig(primaryStyle?.category || 'Elegante');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return <ErrorState />;
  }

  const {
    category
  } = primaryStyle;
  
  const {
    image,
    guideImage,
    description
  } = styleConfig[category] || {};

  const handleSave = async () => {
    toast({
      title: "Salvando alterações",
      description: "Aguarde enquanto salvamos suas alterações...",
    });
    
    const success = await saveConfig();
    
    if (success) {
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas com sucesso!",
      });
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas alterações. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setActiveSectionId(null);
  };

  const handleEditSection = (sectionId: string) => {
    if (!isEditing) return;
    setActiveSectionId(activeSectionId === sectionId ? null : sectionId);
  };

  const updateContent = (path: string, value: any) => {
    updateSection(path, value);
  };

  const EditableText = ({ 
    value, 
    onChange, 
    isTitle = false, 
    multiline = false,
    className = ""
  }: { 
    value: string, 
    onChange: (value: string) => void, 
    isTitle?: boolean, 
    multiline?: boolean,
    className?: string
  }) => {
    if (!isEditing) return <div className={className}>{value}</div>;
    
    return multiline ? (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("min-h-[80px] resize-y", className)}
      />
    ) : (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(isTitle && "text-2xl font-semibold", className)}
      />
    );
  };

  const EditableImage = ({ 
    src, 
    alt, 
    onChange, 
    className = "",
  }: { 
    src: string, 
    alt: string, 
    onChange: (url: string) => void,
    className?: string 
  }) => {
    if (!isEditing) {
      return <img src={src} alt={alt} className={className} />;
    }
    
    return (
      <div className="relative group">
        <img src={src} alt={alt} className={cn("opacity-80", className)} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Input
            type="text"
            value={src}
            onChange={(e) => onChange(e.target.value)}
            className="max-w-md bg-white/90 border-2 border-primary"
            placeholder="URL da imagem"
          />
        </div>
      </div>
    );
  };

  const SectionContainer = ({ 
    id, 
    title, 
    children, 
    className = "" 
  }: { 
    id: string, 
    title: string, 
    children: React.ReactNode,
    className?: string 
  }) => {
    const isActive = activeSectionId === id;
    
    return (
      <Card 
        className={cn(
          "p-6 mb-10 transition-all",
          isEditing && "hover:border-primary cursor-pointer",
          isActive && isEditing && "ring-2 ring-primary",
          className
        )}
        onClick={() => handleEditSection(id)}
      >
        {isEditing && (
          <div className="flex items-center justify-between mb-4 bg-muted p-2 rounded-md">
            <h3 className="text-sm font-medium">{title}</h3>
            <Button size="sm" variant={isActive ? "default" : "ghost"}>
              {isActive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {(!isEditing || isActive) && children}
      </Card>
    );
  };

  const headerContent = resultPageConfig?.header?.content || {};
  const mainContent = resultPageConfig?.mainContent?.content || {};
  const offerContent = resultPageConfig?.offer?.hero?.content || {};

  return (
    <div className="min-h-screen bg-[#fffaf7]" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Editor Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/editor/unified?tab=result')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h2 className="text-xl font-medium text-[#432818]">
            Editor da Página de Resultados
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditing}
          >
            {isEditing ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Visualizar
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </>
            )}
          </Button>
          
          {isEditing && (
            <Button
              size="sm"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>
      </div>

      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Estilo Principal */}
        <SectionContainer id="main-style" title="Estilo Principal" className="bg-white shadow-md border border-[#B89B7A]/20">
          <AnimatedWrapper show={true}>
            <div className="text-center mb-8">
              <EditableText
                value={headerContent.title || `Olá, seu Estilo Predominante é:`}
                onChange={(value) => updateContent('header.content.title', value)}
                isTitle={true}
                className="text-2xl md:text-3xl font-playfair text-[#432818] mb-3"
              />
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]"></span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-[#B89B7A]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <EditableText
                  value={mainContent.introText || description}
                  onChange={(value) => updateContent('mainContent.content.introText', value)}
                  multiline={true}
                  className="text-[#432818] leading-relaxed"
                />

                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Seus Estilos Complementares
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              </div>
              <div>
                <EditableImage
                  src={mainContent.styleImage || image}
                  alt={`Estilo ${category}`}
                  onChange={(url) => updateContent('mainContent.content.styleImage', url)}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-8">
              <EditableImage
                src={mainContent.guideImage || guideImage}
                alt={`Guia de Estilo ${category}`}
                onChange={(url) => updateContent('mainContent.content.guideImage', url)}
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </AnimatedWrapper>
        </SectionContainer>

        <SectionContainer id="motivation" title="Seção de Motivação">
          <MotivationSection isEditable={isEditing} onUpdate={(content) => updateContent('mainContent.content.motivation', content)} />
        </SectionContainer>

        {/* Oferta + Bônus */}
        <SectionContainer id="offer" title="Oferta e Bônus" className="bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <EditableText
              value={offerContent.title || "O Guia de Estilo e Imagem + Bônus Exclusivos"}
              onChange={(value) => updateContent('offer.hero.content.title', value)}
              isTitle={true}
              className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3"
            />
            <EditableText
              value={offerContent.subtitle || "Criado para mulheres que querem muito mais do que \"saber seu estilo\"."}
              onChange={(value) => updateContent('offer.hero.content.subtitle', value)}
              multiline={true}
              className="text-[#432818]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h3 className="text-xl font-medium text-[#432818] mb-4">
                {isEditing ? (
                  <Input 
                    value={offerContent.benefitsTitle || "Você vai aprender:"}
                    onChange={(e) => updateContent('offer.hero.content.benefitsTitle', e.target.value)}
                    className="mb-2"
                  />
                ) : (
                  offerContent.benefitsTitle || "Você vai aprender:"
                )}
              </h3>
              <ul className="space-y-3">
                {(offerContent.benefitItems || [
                  'Como montar looks com intenção (e não no improviso)',
                  'Como usar suas cores, modelagens e tecidos a seu favor',
                  'Como alinhar sua imagem com seus valores e objetivos',
                  'Como parar de comprar por impulso e montar um guarda-roupa funcional'
                ]).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" />
                    {isEditing ? (
                      <Input 
                        value={item}
                        onChange={(e) => {
                          const newItems = [...(offerContent.benefitItems || [
                            'Como montar looks com intenção (e não no improviso)',
                            'Como usar suas cores, modelagens e tecidos a seu favor',
                            'Como alinhar sua imagem com seus valores e objetivos',
                            'Como parar de comprar por impulso e montar um guarda-roupa funcional'
                          ])];
                          newItems[index] = e.target.value;
                          updateContent('offer.hero.content.benefitItems', newItems);
                        }}
                      />
                    ) : (
                      <span>{item}</span>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const currentItems = offerContent.benefitItems || [
                        'Como montar looks com intenção (e não no improviso)',
                        'Como usar suas cores, modelagens e tecidos a seu favor',
                        'Como alinhar sua imagem com seus valores e objetivos',
                        'Como parar de comprar por impulso e montar um guarda-roupa funcional'
                      ];
                      updateContent('offer.hero.content.benefitItems', [...currentItems, 'Novo benefício']);
                    }}
                  >
                    Adicionar benefício
                  </Button>
                )}
              </ul>
            </div>
            <div>
              <EditableImage
                src={offerContent.heroImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"}
                alt="Guia de Estilo - 3 Revistas"
                onChange={(url) => updateContent('offer.hero.content.heroImage', url)}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
              {isEditing ? (
                <Input 
                  value={offerContent.bonusTitle || "E ainda recebe 2 bônus poderosos:"}
                  onChange={(e) => updateContent('offer.hero.content.bonusTitle', e.target.value)}
                  className="text-center"
                />
              ) : (
                offerContent.bonusTitle || "E ainda recebe 2 bônus poderosos:"
              )}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  {isEditing ? (
                    <Input 
                      value={offerContent.bonus1Title || "Peças-chave do Guarda-Roupa de Sucesso"}
                      onChange={(e) => updateContent('offer.hero.content.bonus1Title', e.target.value)}
                    />
                  ) : (
                    offerContent.bonus1Title || "Peças-chave do Guarda-Roupa de Sucesso"
                  )}
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  {isEditing ? (
                    <Textarea 
                      value={offerContent.bonus1Description || "Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal."}
                      onChange={(e) => updateContent('offer.hero.content.bonus1Description', e.target.value)}
                      rows={2}
                    />
                  ) : (
                    offerContent.bonus1Description || "Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal."
                  )}
                </p>
                <EditableImage
                  src={offerContent.bonus1Image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"}
                  alt="Peças-chave do Guarda-Roupa"
                  onChange={(url) => updateContent('offer.hero.content.bonus1Image', url)}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  {isEditing ? (
                    <Input 
                      value={offerContent.bonus2Title || "Mini Guia de Visagismo Facial"}
                      onChange={(e) => updateContent('offer.hero.content.bonus2Title', e.target.value)}
                    />
                  ) : (
                    offerContent.bonus2Title || "Mini Guia de Visagismo Facial"
                  )}
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  {isEditing ? (
                    <Textarea 
                      value={offerContent.bonus2Description || "Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual."}
                      onChange={(e) => updateContent('offer.hero.content.bonus2Description', e.target.value)}
                      rows={2}
                    />
                  ) : (
                    offerContent.bonus2Description || "Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual."
                  )}
                </p>
                <EditableImage
                  src={offerContent.bonus2Image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"}
                  alt="Mini Guia de Visagismo Facial"
                  onChange={(url) => updateContent('offer.hero.content.bonus2Image', url)}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <EditableImage
              src={offerContent.allProductsImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"}
              alt="Todos os produtos e bônus"
              onChange={(url) => updateContent('offer.hero.content.allProductsImage', url)}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
              <div className="text-center md:text-right">
                <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
                <p className="text-xl line-through text-[#432818]/60">
                  {isEditing ? (
                    <Input 
                      value={offerContent.regularPrice || "R$ 175,00"}
                      onChange={(e) => updateContent('offer.hero.content.regularPrice', e.target.value)}
                      className="text-center"
                    />
                  ) : (
                    offerContent.regularPrice || "R$ 175,00"
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
                <p className="text-3xl font-bold text-[#aa6b5d]">
                  {isEditing ? (
                    <Input 
                      value={offerContent.price || "R$ 39,00"}
                      onChange={(e) => updateContent('offer.hero.content.price', e.target.value)}
                      className="text-center font-bold text-[#aa6b5d]"
                    />
                  ) : (
                    offerContent.price || "R$ 39,00"
                  )}
                </p>
              </div>
            </div>

            <div className="mb-4">
              {isEditing ? (
                <div className="space-y-2 mb-4">
                  <Label>Texto do botão:</Label>
                  <Input 
                    value={offerContent.ctaText || "Quero meu Guia + Bônus por R$39,00"}
                    onChange={(e) => updateContent('offer.hero.content.ctaText', e.target.value)}
                    className="text-center" 
                  />
                  <Label>URL do botão:</Label>
                  <Input 
                    value={offerContent.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"}
                    onChange={(e) => updateContent('offer.hero.content.ctaUrl', e.target.value)}
                    className="text-center"
                  />
                </div>
              ) : null}
              
              <Button 
                onClick={() => window.location.href = offerContent.ctaUrl || 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'}
                className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold hover:bg-[#A38A69] transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {offerContent.ctaText || "Quero meu Guia + Bônus por R$39,00"}
              </Button>
            </div>
            <p className="text-sm text-[#aa6b5d] mt-4">
              {isEditing ? (
                <Input 
                  value={offerContent.urgencyText || "⏳ Oferta válida apenas nesta página"}
                  onChange={(e) => updateContent('offer.hero.content.urgencyText', e.target.value)}
                  className="text-center"
                />
              ) : (
                offerContent.urgencyText || "⏳ Oferta válida apenas nesta página"
              )}
            </p>
          </div>
        </SectionContainer>

        <SectionContainer id="testimonials" title="Depoimentos">
          <Testimonials isEditable={isEditing} onUpdate={(testimonials) => updateContent('offer.testimonials.content.items', testimonials)} />
        </SectionContainer>
        
        <SectionContainer id="mentor" title="Mentora">
          <MentorSection isEditable={isEditing} onUpdate={(content) => updateContent('mentor.content', content)} />
        </SectionContainer>
        
        <SectionContainer id="guarantee" title="Garantia">
          <GuaranteeSection isEditable={isEditing} onUpdate={(content) => updateContent('offer.guarantee.content', content)} />
        </SectionContainer>
      </div>
    </div>
  );
};

export default ResultPageEditor;

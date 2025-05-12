'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Construction, 
  Github, 
  AlertCircle, 
  Lightbulb, 
  Send, 
  ArrowLeft, 
  Code,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface UnderConstructionProps {
  title: string;        // Sayfa başlığı
  description?: string; // İsteğe bağlı açıklama
  returnPath?: string;  // Geri dönüş yolu (varsayılan olarak kategori sayfası)
  category?: string;    // Algoritma kategorisi
}

export function UnderConstruction({ 
  title,
  description,
  returnPath,
  category 
}: UnderConstructionProps) {
  // Form durumunu yönetmek için state'ler
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Geri dönüş yolunu belirle, belirtilmemişse kategori sayfasına yönlendir
  const backPath = returnPath || (category ? `/algorithms/${category}` : '/algorithms');
  
  // Form gönderme işlemi
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gerçek formu göndermek yerine simüle ediyoruz
    setIsSubmitting(true);
    
    // API çağrısını 1.5 saniye sonra tamamlanmış gibi göster
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Form alanlarını temizle
      setEmail('');
      setSuggestion('');
    }, 1500);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-sm flex items-center gap-2 bg-amber-500/10"
          >
            <Construction className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-amber-500 font-medium">Yapım Aşamasında</span>
          </Badge>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        
        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
        
        <div className="pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={backPath} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Geri Dön</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Explanation */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Bu İçerik Henüz Hazır Değil
              </CardTitle>
              <CardDescription>
                Bu algoritma sayfası üzerinde çalışıyoruz ve en kısa sürede hazır olacaktır.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>{title}</strong> algoritmasına özel içerik, görselleştirmeler ve 
                interaktif demolar için çalışmalarımız devam ediyor. Bu süreçte aşağıdaki 
                kaynaklardan yararlanabilirsiniz:
              </p>

              <div className="pl-4 border-l-2 border-muted space-y-2">
                <p className="text-sm">
                  <span className="font-medium">📚 Benzer Algoritmalar: </span> 
                  İlgili kategori sayfasından diğer algoritmalara göz atabilirsiniz.
                </p>
                <p className="text-sm">
                  <span className="font-medium">💡 Katkıda Bulunun: </span> 
                  Bu algoritma hakkında bilgi sahibiyseniz, katkıda bulunmaktan çekinmeyin.
                </p>
                <p className="text-sm">
                  <span className="font-medium">🔍 Öneri Gönderin: </span> 
                  Bu algoritma için hangi özelliklerin eklenmesini isterdiniz? Bize bildirin!
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link 
                    href="https://github.com/zzafergok/algorithms-playground" 
                    target="_blank" 
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Repo</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <Link 
                    href="/resources/contributing" 
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    <span>Katkıda Bulunma Rehberi</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Section: Suggestion Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Öneri Gönderin
              </CardTitle>
              <CardDescription>
                Bu algoritma için görüş ve önerilerinizi bizimle paylaşın
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="space-y-4 text-center py-6">
                  <div className="flex justify-center">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Teşekkürler!</h3>
                  <p className="text-muted-foreground">
                    Öneriniz başarıyla gönderildi. Katkınız için teşekkür ederiz.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-2" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Yeni Öneri Gönder
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-posta (isteğe bağlı)
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="suggestion" className="text-sm font-medium">
                      Öneri veya Katkınız
                    </label>
                    <Textarea
                      id="suggestion"
                      placeholder="Bu algoritma için ne tür bir içerik veya interaktif demo görmek istersiniz?"
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Gönder
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <motion.div
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Geliştirme Süreci</h2>
          <p className="text-muted-foreground">
            Algoritma sayfalarımızı geliştirirken izlediğimiz adımlar
          </p>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-border transform md:-translate-x-1/2" />
          
          {timelineSteps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline bullet */}
              <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 border-background bg-muted transform -translate-x-1/2 z-10" />
              
              {/* Content */}
              <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} md:w-1/2`}>
                <h3 className="text-lg font-semibold flex items-center gap-2 md:gap-3">
                  {index % 2 === 0 ? (
                    <>
                      <span>{step.title}</span>
                      <step.icon className="h-5 w-5 md:order-first" />
                    </>
                  ) : (
                    <>
                      <step.icon className="h-5 w-5" />
                      <span>{step.title}</span>
                    </>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                
                {/* Status badge */}
                <div className={`mt-2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <Badge 
                    variant={step.status === 'Tamamlandı' ? 'success' : step.status === 'Devam Ediyor' ? 'warning' : 'secondary'}
                    className="text-xs"
                  >
                    {step.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Geliştirme süreci timeline adımları
const timelineSteps = [
  {
    title: 'Araştırma',
    description: 'Algoritma hakkında kapsamlı araştırma ve kaynak toplama',
    status: 'Tamamlandı',
    icon: Search
  },
  {
    title: 'İçerik Planlama',
    description: 'Teori, örnekler ve görselleştirmelerin planlanması',
    status: 'Devam Ediyor',
    icon: FileText
  },
  {
    title: 'Geliştirme',
    description: 'İnteraktif demo ve görselleştirmelerin kodlanması',
    status: 'Planlandı',
    icon: Code
  },
  {
    title: 'Test ve İyileştirme',
    description: 'Kullanıcı deneyimi testleri ve iyileştirmeler',
    status: 'Planlandı',
    icon: Microscope
  },
  {
    title: 'Yayınlama',
    description: 'İçeriğin gözden geçirilmesi ve canlıya alınması',
    status: 'Planlandı',
    icon: Rocket
  }
];

// İkon importları
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function Microscope(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function Rocket(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

// Export the component
export default UnderConstruction;
